from __future__ import annotations

import hashlib
import html
import json
import os
import re
import sqlite3
import threading
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
from email.utils import parsedate_to_datetime
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parent


def configured_db_path() -> Path:
    configured = Path(os.environ.get("SCOUTLINE_DB_PATH", "data/scoutline.db")).expanduser()
    return configured if configured.is_absolute() else ROOT / configured


DB_PATH = configured_db_path()
USER_AGENT = "WePlay-Scout/1.0 (+local research dashboard)"
RESET_ERA_FEED = "https://www.resetera.com/forums/gaming-headlines.54/index.rss"
YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3"
YOUTUBE_TRENDING_LOCATOR = "youtube:gaming-trending"
DEFAULT_YOUTUBE_REGIONS = ("US", "GB", "FR", "DE", "IT")
CONTENT_SYNC_LOCK = threading.Lock()
NEW_GAME_TERMS = re.compile(
    r"\b(announce[ds]?|announcement|reveal(?:ed)?|debut|new game|first look|"
    r"trailer|demo|playtest|early access|launch(?:es|ed)?|release(?:s|d)?|"
    r"coming soon|pre[- ]?orders?|steam)\b",
    re.IGNORECASE,
)


def now_local() -> datetime:
    return datetime.now().astimezone()


def iso_now() -> str:
    return now_local().isoformat(timespec="seconds")


def connect() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DB_PATH, timeout=30)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA journal_mode=WAL")
    return connection


def ensure_content_columns(db: sqlite3.Connection) -> None:
    existing = {row["name"] for row in db.execute("PRAGMA table_info(content_items)")}
    additions = {
        "view_count": "INTEGER NOT NULL DEFAULT 0",
        "like_count": "INTEGER NOT NULL DEFAULT 0",
        "comment_count": "INTEGER NOT NULL DEFAULT 0",
        "region_codes": "TEXT NOT NULL DEFAULT ''",
        "discovery_type": "TEXT NOT NULL DEFAULT 'feed'",
    }
    for column, definition in additions.items():
        if column not in existing:
            db.execute(f"ALTER TABLE content_items ADD COLUMN {column} {definition}")


def init_content_db() -> None:
    with connect() as db:
        db.executescript(
            """
            CREATE TABLE IF NOT EXISTS content_sources (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                platform TEXT NOT NULL,
                name TEXT NOT NULL,
                locator TEXT NOT NULL,
                enabled INTEGER NOT NULL DEFAULT 1,
                status TEXT NOT NULL DEFAULT 'pending',
                last_synced_at TEXT,
                last_error TEXT,
                created_at TEXT NOT NULL,
                UNIQUE(platform, locator)
            );

            CREATE TABLE IF NOT EXISTS content_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                source_id INTEGER NOT NULL,
                platform TEXT NOT NULL,
                external_id TEXT NOT NULL,
                author TEXT NOT NULL DEFAULT '',
                title TEXT NOT NULL,
                summary TEXT NOT NULL DEFAULT '',
                url TEXT NOT NULL,
                thumbnail TEXT NOT NULL DEFAULT '',
                published_at TEXT NOT NULL,
                fetched_at TEXT NOT NULL,
                is_new_game INTEGER NOT NULL DEFAULT 0,
                matched_appid INTEGER,
                matched_game TEXT,
                UNIQUE(platform, external_id),
                FOREIGN KEY(source_id) REFERENCES content_sources(id)
            );
            CREATE INDEX IF NOT EXISTS idx_content_published
                ON content_items(published_at DESC);

            CREATE TABLE IF NOT EXISTS content_sync_runs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                started_at TEXT NOT NULL,
                completed_at TEXT,
                status TEXT NOT NULL,
                items_seen INTEGER NOT NULL DEFAULT 0,
                items_added INTEGER NOT NULL DEFAULT 0,
                error TEXT
            );
            """
        )
        ensure_content_columns(db)
        db.execute(
            """
            INSERT INTO content_sources(platform, name, locator, status, created_at)
            VALUES ('forum', 'ResetEra 游戏头条', ?, 'pending', ?)
            ON CONFLICT(platform, locator) DO UPDATE SET name = excluded.name
            """,
            (RESET_ERA_FEED, iso_now()),
        )
        db.execute(
            """
            INSERT INTO content_sources(platform, name, locator, status, created_at)
            VALUES ('youtube', 'YouTube 游戏热门', ?, ?, ?)
            ON CONFLICT(platform, locator) DO UPDATE SET name = excluded.name
            """,
            (
                YOUTUBE_TRENDING_LOCATOR,
                "pending" if os.environ.get("YOUTUBE_API_KEY", "").strip() else "needs_key",
                iso_now(),
            ),
        )
    import_youtube_sources_from_env()


def import_youtube_sources_from_env() -> None:
    raw = os.environ.get("SCOUTLINE_YOUTUBE_CHANNELS", "").strip()
    if not raw:
        return
    for item in raw.split(","):
        item = item.strip()
        if not item:
            continue
        if "|" in item:
            name, locator = (part.strip() for part in item.split("|", 1))
        else:
            name, locator = item, item
        try:
            add_content_source("youtube", name, locator)
        except ValueError:
            continue


def normalize_creator_locator(platform: str, locator: str) -> str:
    locator = locator.strip()
    if not locator:
        raise ValueError("请输入创作者主页或频道 ID")
    if platform == "youtube":
        parsed = urllib.parse.urlparse(locator if "://" in locator else f"https://youtube.com/{locator}")
        parts = [part for part in parsed.path.split("/") if part]
        if "channel" in parts:
            index = parts.index("channel")
            if index + 1 < len(parts):
                return parts[index + 1]
        handle = next((part for part in parts if part.startswith("@")), None)
        if handle:
            return handle
        if locator.startswith(("UC", "@")):
            return locator
        raise ValueError("请使用 YouTube @频道主页或 UC 开头的频道 ID")
    if platform == "tiktok":
        parsed = urllib.parse.urlparse(locator if "://" in locator else f"https://tiktok.com/{locator}")
        handle = next((part for part in parsed.path.split("/") if part.startswith("@")), None)
        if handle:
            return handle
        if locator.startswith("@"):
            return locator
        raise ValueError("请使用 TikTok @用户名或创作者主页链接")
    raise ValueError("暂不支持这个来源类型")


def add_content_source(platform: str, name: str, locator: str) -> dict[str, Any]:
    platform = platform.lower().strip()
    if platform not in {"youtube", "tiktok"}:
        raise ValueError("仅支持添加 YouTube 或 TikTok 创作者")
    normalized = normalize_creator_locator(platform, locator)
    display_name = name.strip() or normalized
    status = "requires_auth" if platform == "tiktok" else "pending"
    with connect() as db:
        db.execute(
            """
            INSERT INTO content_sources(platform, name, locator, status, created_at)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(platform, locator) DO UPDATE SET
                name = excluded.name,
                enabled = 1,
                status = CASE
                    WHEN content_sources.status = 'active' THEN 'active'
                    ELSE excluded.status
                END
            """,
            (platform, display_name, normalized, status, iso_now()),
        )
        row = db.execute(
            "SELECT * FROM content_sources WHERE platform = ? AND locator = ?",
            (platform, normalized),
        ).fetchone()
    return dict(row)


def http_bytes(url: str, retries: int = 2, headers: dict[str, str] | None = None) -> bytes:
    request_headers = {
        "User-Agent": USER_AGENT,
        "Accept": "application/rss+xml,application/xml,application/json,text/xml,*/*",
        "Accept-Language": "en-US,en;q=0.9",
    }
    request_headers.update(headers or {})
    request = urllib.request.Request(
        url,
        headers=request_headers,
    )
    last_error: Exception | None = None
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(request, timeout=25) as response:
                return response.read()
        except Exception as error:
            last_error = error
            if attempt < retries:
                threading.Event().wait(0.7 * (attempt + 1))
    raise RuntimeError(f"资讯源请求失败: {last_error}")


def http_json(url: str, params: dict[str, Any]) -> dict[str, Any]:
    separator = "&" if "?" in url else "?"
    payload = http_bytes(f"{url}{separator}{urllib.parse.urlencode(params)}")
    return json.loads(payload.decode("utf-8"))


def youtube_json(resource: str, params: dict[str, Any]) -> dict[str, Any]:
    api_key = os.environ.get("YOUTUBE_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError("等待配置 YouTube API Key")
    url = f"{YOUTUBE_API_BASE}/{resource}?{urllib.parse.urlencode(params)}"
    payload = http_bytes(
        url,
        headers={
            "Accept": "application/json",
            "X-Goog-Api-Key": api_key,
        },
    )
    return json.loads(payload.decode("utf-8"))


def youtube_regions() -> tuple[str, ...]:
    raw = os.environ.get("SCOUTLINE_YOUTUBE_REGIONS", "").strip()
    values = raw.split(",") if raw else DEFAULT_YOUTUBE_REGIONS
    regions: list[str] = []
    for value in values:
        code = value.strip().upper()
        if re.fullmatch(r"[A-Z]{2}", code) and code not in regions:
            regions.append(code)
    return tuple(regions[:10]) or DEFAULT_YOUTUBE_REGIONS


def youtube_max_results() -> int:
    try:
        configured = int(os.environ.get("SCOUTLINE_YOUTUBE_MAX_RESULTS", "20"))
    except ValueError:
        configured = 20
    return max(5, min(50, configured))


def clean_text(value: str | None, limit: int = 480) -> str:
    value = html.unescape(value or "")
    value = re.sub(r"<[^>]+>", " ", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value[:limit]


def normalize_date(value: str | None) -> str:
    if not value:
        return iso_now()
    try:
        return parsedate_to_datetime(value).astimezone().isoformat(timespec="seconds")
    except (TypeError, ValueError):
        try:
            parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
            return parsed.astimezone().isoformat(timespec="seconds")
        except ValueError:
            return iso_now()


def parse_rss(url: str) -> list[dict[str, Any]]:
    root = ET.fromstring(http_bytes(url))
    items: list[dict[str, Any]] = []
    for node in root.findall(".//item")[:50]:
        title = clean_text(node.findtext("title"), 220)
        link = clean_text(node.findtext("link"), 800)
        if not title or not link:
            continue
        guid = clean_text(node.findtext("guid"), 300)
        external_id = guid or hashlib.sha256(link.encode("utf-8")).hexdigest()
        creator = node.findtext("{http://purl.org/dc/elements/1.1/}creator") or node.findtext("author")
        summary = clean_text(node.findtext("description"))
        items.append(
            {
                "external_id": external_id,
                "author": clean_text(creator, 120),
                "title": title,
                "summary": summary,
                "url": link,
                "thumbnail": "",
                "published_at": normalize_date(node.findtext("pubDate")),
            }
        )
    return items


def as_int(value: Any) -> int:
    try:
        return max(0, int(value or 0))
    except (TypeError, ValueError):
        return 0


def youtube_video_item(
    video: dict[str, Any],
    source_name: str,
    regions: list[str] | tuple[str, ...] = (),
    discovery_type: str = "creator",
) -> dict[str, Any] | None:
    video_id = str(video.get("id") or "").strip()
    snippet = video.get("snippet") or {}
    title = clean_text(snippet.get("title"), 220)
    if not video_id or not title:
        return None
    thumbnails = snippet.get("thumbnails") or {}
    thumbnail = (
        thumbnails.get("maxres")
        or thumbnails.get("standard")
        or thumbnails.get("high")
        or thumbnails.get("medium")
        or thumbnails.get("default")
        or {}
    ).get("url", "")
    statistics = video.get("statistics") or {}
    return {
        "external_id": video_id,
        "author": clean_text(snippet.get("channelTitle") or source_name, 120),
        "title": title,
        "summary": clean_text(snippet.get("description")),
        "url": f"https://www.youtube.com/watch?v={video_id}",
        "thumbnail": thumbnail,
        "published_at": normalize_date(snippet.get("publishedAt")),
        "view_count": as_int(statistics.get("viewCount")),
        "like_count": as_int(statistics.get("likeCount")),
        "comment_count": as_int(statistics.get("commentCount")),
        "region_codes": ",".join(regions),
        "discovery_type": discovery_type,
    }


def fetch_youtube_channel(source: sqlite3.Row) -> list[dict[str, Any]]:
    locator = source["locator"]
    channel_filter = {"forHandle": locator} if locator.startswith("@") else {"id": locator}
    channel_payload = youtube_json(
        "channels",
        {"part": "snippet,contentDetails", **channel_filter},
    )
    channels = channel_payload.get("items") or []
    if not channels:
        raise RuntimeError("没有找到这个 YouTube 频道")
    channel = channels[0]
    playlist_id = channel["contentDetails"]["relatedPlaylists"]["uploads"]
    playlist_payload = youtube_json(
        "playlistItems",
        {
            "part": "contentDetails",
            "playlistId": playlist_id,
            "maxResults": youtube_max_results(),
        },
    )
    video_ids = [
        str((entry.get("contentDetails") or {}).get("videoId") or "")
        for entry in playlist_payload.get("items") or []
    ]
    video_ids = [video_id for video_id in video_ids if video_id]
    if not video_ids:
        return []
    videos_payload = youtube_json(
        "videos",
        {"part": "snippet,statistics", "id": ",".join(video_ids)},
    )
    items = [
        youtube_video_item(video, source["name"], discovery_type="creator")
        for video in videos_payload.get("items") or []
    ]
    return sorted(
        (item for item in items if item),
        key=lambda item: item["published_at"],
        reverse=True,
    )


def fetch_youtube_trending(source: sqlite3.Row) -> list[dict[str, Any]]:
    region_order = youtube_regions()
    collected: dict[str, dict[str, Any]] = {}
    for region in region_order:
        payload = youtube_json(
            "videos",
            {
                "part": "snippet,statistics",
                "chart": "mostPopular",
                "regionCode": region,
                "videoCategoryId": "20",
                "maxResults": youtube_max_results(),
            },
        )
        for video in payload.get("items") or []:
            video_id = str(video.get("id") or "")
            if not video_id:
                continue
            if video_id not in collected:
                collected[video_id] = {"video": video, "regions": []}
            if region not in collected[video_id]["regions"]:
                collected[video_id]["regions"].append(region)

    items: list[dict[str, Any]] = []
    for entry in collected.values():
        item = youtube_video_item(
            entry["video"],
            source["name"],
            regions=entry["regions"],
            discovery_type="trending",
        )
        if item:
            items.append(item)
    items.sort(
        key=lambda item: (
            len(item["region_codes"].split(",")) if item["region_codes"] else 0,
            item["view_count"],
            item["published_at"],
        ),
        reverse=True,
    )
    return items[: min(100, max(30, youtube_max_results() * 3))]


def fetch_youtube(source: sqlite3.Row) -> list[dict[str, Any]]:
    if source["locator"] == YOUTUBE_TRENDING_LOCATOR:
        return fetch_youtube_trending(source)
    return fetch_youtube_channel(source)


def known_games(db: sqlite3.Connection) -> list[tuple[int, str, str]]:
    rows = db.execute("SELECT appid, name FROM games WHERE length(name) >= 4").fetchall()
    return sorted(
        ((int(row["appid"]), row["name"], row["name"].casefold()) for row in rows),
        key=lambda item: len(item[2]),
        reverse=True,
    )


def match_game(title: str, games: list[tuple[int, str, str]]) -> tuple[int | None, str | None]:
    folded = title.casefold()
    for appid, name, candidate in games:
        if re.search(rf"(?<!\w){re.escape(candidate)}(?!\w)", folded):
            return appid, name
    return None, None


def store_items(source: sqlite3.Row, items: list[dict[str, Any]]) -> int:
    added = 0
    fetched_at = iso_now()
    with connect() as db:
        games = known_games(db)
        for item in items:
            appid, game_name = match_game(item["title"], games)
            signal_text = f"{item['title']} {item['summary']}"
            existed = db.execute(
                "SELECT region_codes, discovery_type FROM content_items WHERE platform = ? AND external_id = ?",
                (source["platform"], item["external_id"]),
            ).fetchone()
            region_codes = str(item.get("region_codes") or "")
            if not region_codes and existed:
                region_codes = str(existed["region_codes"] or "")
            discovery_types = {
                value
                for value in str(item.get("discovery_type") or "feed").split(",")
                if value
            }
            if existed:
                discovery_types.update(
                    value
                    for value in str(existed["discovery_type"] or "").split(",")
                    if value
                )
            db.execute(
                """
                INSERT INTO content_items(
                    source_id, platform, external_id, author, title, summary, url,
                    thumbnail, published_at, fetched_at, is_new_game, matched_appid, matched_game,
                    view_count, like_count, comment_count, region_codes, discovery_type
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(platform, external_id) DO UPDATE SET
                    source_id = excluded.source_id,
                    author = excluded.author,
                    title = excluded.title,
                    summary = excluded.summary,
                    url = excluded.url,
                    thumbnail = excluded.thumbnail,
                    published_at = excluded.published_at,
                    fetched_at = excluded.fetched_at,
                    is_new_game = excluded.is_new_game,
                    matched_appid = excluded.matched_appid,
                    matched_game = excluded.matched_game,
                    view_count = excluded.view_count,
                    like_count = excluded.like_count,
                    comment_count = excluded.comment_count,
                    region_codes = excluded.region_codes,
                    discovery_type = excluded.discovery_type
                """,
                (
                    source["id"],
                    source["platform"],
                    item["external_id"],
                    item["author"],
                    item["title"],
                    item["summary"],
                    item["url"],
                    item["thumbnail"],
                    item["published_at"],
                    fetched_at,
                    int(bool(appid) or bool(NEW_GAME_TERMS.search(signal_text))),
                    appid,
                    game_name,
                    as_int(item.get("view_count")),
                    as_int(item.get("like_count")),
                    as_int(item.get("comment_count")),
                    region_codes,
                    ",".join(sorted(discovery_types)),
                ),
            )
            if not existed:
                added += 1
        db.execute(
            "UPDATE content_sources SET status = 'active', last_synced_at = ?, last_error = NULL WHERE id = ?",
            (fetched_at, source["id"]),
        )
    return added


def sync_all_content() -> dict[str, Any]:
    if not CONTENT_SYNC_LOCK.acquire(blocking=False):
        return {"status": "already_running"}
    init_content_db()
    started_at = iso_now()
    run_id: int | None = None
    seen = 0
    added = 0
    errors: list[str] = []
    try:
        with connect() as db:
            cursor = db.execute(
                "INSERT INTO content_sync_runs(started_at, status) VALUES (?, 'running')",
                (started_at,),
            )
            run_id = int(cursor.lastrowid)
            sources = db.execute("SELECT * FROM content_sources WHERE enabled = 1 ORDER BY id").fetchall()

        for source in sources:
            if source["platform"] == "tiktok":
                continue
            try:
                items = fetch_youtube(source) if source["platform"] == "youtube" else parse_rss(source["locator"])
                seen += len(items)
                added += store_items(source, items)
            except Exception as error:
                message = str(error)[:300]
                if source["platform"] == "youtube" and not os.environ.get("YOUTUBE_API_KEY"):
                    status = "needs_key"
                else:
                    status = "error"
                    errors.append(f"{source['name']}: {message}")
                with connect() as db:
                    db.execute(
                        "UPDATE content_sources SET status = ?, last_error = ? WHERE id = ?",
                        (status, message, source["id"]),
                    )

        with connect() as db:
            cutoff = (now_local() - timedelta(days=90)).isoformat(timespec="seconds")
            db.execute("DELETE FROM content_items WHERE published_at < ?", (cutoff,))
            db.execute(
                """
                UPDATE content_sync_runs
                SET completed_at = ?, status = ?, items_seen = ?, items_added = ?, error = ?
                WHERE id = ?
                """,
                (iso_now(), "partial" if errors else "completed", seen, added, "; ".join(errors)[:500] or None, run_id),
            )
        return {"status": "partial" if errors else "completed", "items_seen": seen, "items_added": added}
    except Exception as error:
        if run_id is not None:
            with connect() as db:
                db.execute(
                    "UPDATE content_sync_runs SET completed_at = ?, status = 'failed', error = ? WHERE id = ?",
                    (iso_now(), str(error)[:500], run_id),
                )
        raise
    finally:
        CONTENT_SYNC_LOCK.release()


def get_content_status() -> dict[str, Any]:
    init_content_db()
    with connect() as db:
        latest = db.execute("SELECT * FROM content_sync_runs ORDER BY id DESC LIMIT 1").fetchone()
        success = db.execute(
            "SELECT completed_at FROM content_sync_runs WHERE status IN ('completed', 'partial') ORDER BY id DESC LIMIT 1"
        ).fetchone()
    payload = dict(latest) if latest else {"status": "never_run"}
    payload["last_success_at"] = success["completed_at"] if success else None
    return payload


def get_content(limit: int = 160) -> dict[str, Any]:
    init_content_db()
    limit = max(1, min(200, int(limit)))
    with connect() as db:
        sources = [dict(row) for row in db.execute("SELECT * FROM content_sources ORDER BY platform, name")]
        rows = db.execute(
            """
            SELECT i.*, s.name AS source_name
            FROM content_items i
            JOIN content_sources s ON s.id = i.source_id
            ORDER BY i.published_at DESC
            LIMIT ?
            """,
            (limit,),
        ).fetchall()
        items = [dict(row) for row in rows]
    status = get_content_status()
    return {
        "items": items,
        "sources": sources,
        "updated_at": status.get("last_success_at"),
        "youtube_configured": bool(os.environ.get("YOUTUBE_API_KEY", "").strip()),
        "youtube_regions": list(youtube_regions()),
        "youtube_trending_locator": YOUTUBE_TRENDING_LOCATOR,
        "tiktok_mode": "creator_authorization_required",
    }
