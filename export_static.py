from __future__ import annotations

import argparse
import json
import shutil
import sqlite3
from datetime import datetime, timedelta
from pathlib import Path

from content_collector import get_content, get_content_status, sync_all_content
from steam_collector import DB_PATH, get_games, get_status, sync_all


ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"
STATIC_FILES = ("index.html", "app.js", "styles.css")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build the static WePlay Scout site.")
    parser.add_argument(
        "--skip-sync",
        action="store_true",
        help="Export the existing database without contacting remote data sources.",
    )
    return parser.parse_args()


def write_json(path: Path, payload: object) -> None:
    path.write_text(
        json.dumps(payload, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )


def next_daily_run(now: datetime) -> datetime:
    target = now.replace(hour=3, minute=0, second=0, microsecond=0)
    if target <= now:
        target += timedelta(days=1)
    return target


def public_run_status(payload: dict[str, object]) -> dict[str, object]:
    allowed = {
        "status",
        "started_at",
        "completed_at",
        "last_success_at",
        "games_seen",
        "games_updated",
        "items_seen",
        "items_added",
    }
    return {key: value for key, value in payload.items() if key in allowed}


def checkpoint_database() -> None:
    if not DB_PATH.exists():
        return
    with sqlite3.connect(DB_PATH, timeout=30) as database:
        database.execute("PRAGMA wal_checkpoint(TRUNCATE)")


def build(skip_sync: bool = False) -> None:
    if not skip_sync:
        sync_all()
        sync_all_content()

    checkpoint_database()
    games_payload = get_games()
    content_payload = get_content()
    steam_status = public_run_status(get_status())
    content_status = public_run_status(get_content_status())
    now = datetime.now().astimezone()

    if DIST.exists():
        shutil.rmtree(DIST)
    (DIST / "data").mkdir(parents=True)

    for filename in STATIC_FILES:
        shutil.copy2(ROOT / filename, DIST / filename)
    shutil.copytree(ROOT / "assets", DIST / "assets")

    write_json(DIST / "data" / "games.json", games_payload)
    write_json(DIST / "data" / "content.json", content_payload)
    write_json(
        DIST / "data" / "status.json",
        {
            **steam_status,
            "running": False,
            "sync_due": False,
            "schedule": "daily",
            "schedule_hour": 3,
            "timezone": "Asia/Singapore",
            "next_sync_at": next_daily_run(now).isoformat(timespec="seconds"),
            "generated_at": now.isoformat(timespec="seconds"),
            "content": content_status,
        },
    )
    (DIST / ".nojekyll").touch()
    print(
        f"Static site built in {DIST} with "
        f"{len(games_payload.get('games', []))} games and "
        f"{len(content_payload.get('items', []))} content items."
    )


if __name__ == "__main__":
    build(skip_sync=parse_args().skip_sync)
