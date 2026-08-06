from __future__ import annotations

import json
import os
import threading
import time
from datetime import datetime, timedelta
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

from content_collector import (
    add_content_source,
    get_content,
    get_content_status,
    init_content_db,
    sync_all_content,
)
from steam_collector import get_games, get_status, init_db, sync_all


ROOT = Path(__file__).resolve().parent
HOST = os.environ.get("SCOUTLINE_HOST", "127.0.0.1")
PORT = int(os.environ.get("SCOUTLINE_PORT", "4173"))
SYNC_HOUR = int(os.environ.get("SCOUTLINE_SYNC_HOUR", "3"))
SYNC_STATE_LOCK = threading.Lock()
SYNC_THREAD: threading.Thread | None = None
CONTENT_SYNC_STATE_LOCK = threading.Lock()
CONTENT_SYNC_THREAD: threading.Thread | None = None


def next_sync_time(now: datetime | None = None) -> datetime:
    now = now or datetime.now().astimezone()
    target = now.replace(hour=SYNC_HOUR, minute=0, second=0, microsecond=0)
    if target <= now:
        target += timedelta(days=1)
    return target


def missed_scheduled_sync(last_success_at: str | None, now: datetime | None = None) -> bool:
    now = now or datetime.now().astimezone()
    scheduled_today = now.replace(hour=SYNC_HOUR, minute=0, second=0, microsecond=0)
    if now < scheduled_today:
        return False
    if not last_success_at:
        return True
    try:
        last_success = datetime.fromisoformat(last_success_at).astimezone(now.tzinfo)
    except (TypeError, ValueError):
        return True
    return last_success < scheduled_today


def run_sync_background() -> bool:
    global SYNC_THREAD
    with SYNC_STATE_LOCK:
        if SYNC_THREAD and SYNC_THREAD.is_alive():
            return False

        def worker() -> None:
            try:
                sync_all()
            except Exception as error:
                print(f"Steam sync failed: {error}", flush=True)
            finally:
                # Refresh content after Steam so title-to-App-ID matching uses today's catalog.
                run_content_sync_background()

        SYNC_THREAD = threading.Thread(target=worker, name="steam-sync", daemon=True)
        SYNC_THREAD.start()
        return True


def run_content_sync_background() -> bool:
    global CONTENT_SYNC_THREAD
    with CONTENT_SYNC_STATE_LOCK:
        if CONTENT_SYNC_THREAD and CONTENT_SYNC_THREAD.is_alive():
            return False

        def worker() -> None:
            try:
                sync_all_content()
            except Exception as error:
                print(f"Content sync failed: {error}", flush=True)

        CONTENT_SYNC_THREAD = threading.Thread(target=worker, name="content-sync", daemon=True)
        CONTENT_SYNC_THREAD.start()
        return True


def scheduler_loop() -> None:
    while True:
        target = next_sync_time()
        time.sleep(max(1, (target - datetime.now().astimezone()).total_seconds()))
        run_sync_background()


class ScoutHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_json(self, payload, status: HTTPStatus = HTTPStatus.OK) -> None:
        encoded = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(encoded)

    def do_GET(self) -> None:
        path = urlparse(self.path).path
        if path == "/api/games":
            self.send_json(get_games())
            return
        if path == "/api/status":
            status = get_status()
            status["running"] = bool(SYNC_THREAD and SYNC_THREAD.is_alive())
            status["sync_due"] = missed_scheduled_sync(status.get("last_success_at"))
            status["next_sync_at"] = next_sync_time().isoformat(timespec="seconds")
            status["schedule"] = "daily"
            self.send_json(status)
            return
        if path == "/api/content":
            payload = get_content()
            payload["running"] = bool(CONTENT_SYNC_THREAD and CONTENT_SYNC_THREAD.is_alive())
            self.send_json(payload)
            return
        if path == "/api/content/status":
            status = get_content_status()
            status["running"] = bool(CONTENT_SYNC_THREAD and CONTENT_SYNC_THREAD.is_alive())
            status["sync_due"] = missed_scheduled_sync(status.get("last_success_at"))
            status["next_sync_at"] = next_sync_time().isoformat(timespec="seconds")
            self.send_json(status)
            return
        super().do_GET()

    def do_POST(self) -> None:
        path = urlparse(self.path).path
        if path == "/api/sync":
            steam_started = run_sync_background()
            self.send_json(
                {
                    "status": "started" if steam_started else "already_running",
                    "steam_started": steam_started,
                    "content_queued": steam_started or bool(SYNC_THREAD and SYNC_THREAD.is_alive()),
                },
                HTTPStatus.ACCEPTED,
            )
            return
        if path == "/api/content/sync":
            started = run_content_sync_background()
            self.send_json(
                {"status": "started" if started else "already_running"},
                HTTPStatus.ACCEPTED,
            )
            return
        if path == "/api/content/sources":
            try:
                length = int(self.headers.get("Content-Length", "0"))
                payload = json.loads(self.rfile.read(length).decode("utf-8"))
                source = add_content_source(
                    str(payload.get("platform", "")),
                    str(payload.get("name", "")),
                    str(payload.get("locator", "")),
                )
                self.send_json({"status": "created", "source": source}, HTTPStatus.CREATED)
            except (ValueError, json.JSONDecodeError) as error:
                self.send_json({"status": "invalid", "error": str(error)}, HTTPStatus.BAD_REQUEST)
            return
        self.send_error(HTTPStatus.NOT_FOUND)

    def log_message(self, format: str, *args) -> None:
        print(f"[{self.log_date_time_string()}] {format % args}", flush=True)


def main() -> None:
    init_db()
    init_content_db()
    threading.Thread(target=scheduler_loop, name="daily-scheduler", daemon=True).start()
    steam_status = get_status()
    content_status = get_content_status()
    steam_due = steam_status.get("status") == "never_run" or missed_scheduled_sync(steam_status.get("last_success_at"))
    content_due = content_status.get("status") == "never_run" or missed_scheduled_sync(content_status.get("last_success_at"))
    if steam_due:
        run_sync_background()
    elif content_due:
        run_content_sync_background()
    server = ThreadingHTTPServer((HOST, PORT), ScoutHandler)
    print(f"WePlay Scout running at http://{HOST}:{PORT}", flush=True)
    print(f"Steam sync schedule: daily at {SYNC_HOUR:02d}:00 local time", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
