from __future__ import annotations

import json
import os
import sqlite3
import threading
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta
from html.parser import HTMLParser
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parent


def configured_db_path() -> Path:
    configured = Path(os.environ.get("SCOUTLINE_DB_PATH", "data/scoutline.db")).expanduser()
    return configured if configured.is_absolute() else ROOT / configured


DB_PATH = configured_db_path()
USER_AGENT = "WePlay-Scout/1.0 (+local research dashboard)"
SERVER_GROUPS = (
    {
        "id": "us",
        "name": "美服",
        "primary": "US",
        "countries": (
            ("US", "美国"),
            ("AU", "澳大利亚"),
            ("NZ", "新西兰"),
            ("CA", "加拿大"),
            ("GB", "英国"),
            ("NL", "荷兰"),
        ),
    },
    {
        "id": "fr",
        "name": "法语服",
        "primary": "FR",
        "countries": (
            ("FR", "法国"),
            ("BE", "比利时"),
            ("LU", "卢森堡"),
            ("MC", "摩纳哥"),
        ),
    },
    {
        "id": "de",
        "name": "德语服",
        "primary": "DE",
        "countries": (
            ("DE", "德国"),
            ("AT", "奥地利"),
            ("CH", "瑞士"),
        ),
    },
    {
        "id": "it",
        "name": "意大利服",
        "primary": "IT",
        "countries": (("IT", "意大利"),),
    },
)
COUNTRY_META = {
    code: {
        "code": code,
        "name": country_name,
        "serverId": server["id"],
        "serverName": server["name"],
        "isPrimary": code == server["primary"],
    }
    for server in SERVER_GROUPS
    for code, country_name in server["countries"]
}
REGIONS = tuple(COUNTRY_META)
TAG_BOARDS = (
    (492, "独立"),
    (19, "动作"),
    (122, "RPG"),
    (9, "策略"),
    (599, "模拟"),
    (1685, "合作"),
    (1662, "生存"),
    (1667, "恐怖"),
)
TAG_NAMES = dict(TAG_BOARDS)
TAG_BOARD_SIZE = 50
TAG_FETCH_SIZE = 60
MAX_GAMES = int(os.environ.get("STEAM_MAX_GAMES", "900"))
DETAIL_CACHE_DAYS = 7
REQUEST_WORKERS = int(os.environ.get("STEAM_REQUEST_WORKERS", "6"))

SEARCH_URL = "https://store.steampowered.com/search/results/"
FEATURED_URL = "https://store.steampowered.com/api/featuredcategories"
DETAIL_URL = "https://store.steampowered.com/api/appdetails"
PLAYER_URL = "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/"
REVIEWS_URL = "https://store.steampowered.com/appreviews/{appid}"

SYNC_LOCK = threading.Lock()


class SearchResultParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.appids: list[int] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "a":
            return
        values = dict(attrs)
        appid = values.get("data-ds-appid")
        if appid and appid.isdigit():
            value = int(appid)
            if value not in self.appids:
                self.appids.append(value)


def utc_now() -> datetime:
    return datetime.now().astimezone()


def iso_now() -> str:
    return utc_now().isoformat(timespec="seconds")


def connect() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DB_PATH, timeout=30)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA journal_mode=WAL")
    connection.execute("PRAGMA foreign_keys=ON")
    return connection


def init_db() -> None:
    with connect() as db:
        db.executescript(
            """
            CREATE TABLE IF NOT EXISTS games (
                appid INTEGER PRIMARY KEY,
                steam_type TEXT NOT NULL DEFAULT 'game',
                name TEXT NOT NULL,
                developer TEXT NOT NULL DEFAULT '',
                publisher TEXT NOT NULL DEFAULT '',
                header_image TEXT NOT NULL DEFAULT '',
                capsule_image TEXT NOT NULL DEFAULT '',
                release_date TEXT NOT NULL DEFAULT '',
                coming_soon INTEGER NOT NULL DEFAULT 0,
                genres_json TEXT NOT NULL DEFAULT '[]',
                price_text TEXT NOT NULL DEFAULT '',
                discount_percent INTEGER NOT NULL DEFAULT 0,
                total_reviews INTEGER NOT NULL DEFAULT 0,
                positive_reviews INTEGER NOT NULL DEFAULT 0,
                review_percent REAL,
                review_label TEXT NOT NULL DEFAULT '',
                current_players INTEGER NOT NULL DEFAULT 0,
                details_updated_at TEXT,
                updated_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS ranking_snapshots (
                board TEXT NOT NULL,
                region TEXT NOT NULL,
                appid INTEGER NOT NULL,
                rank INTEGER NOT NULL,
                captured_at TEXT NOT NULL,
                PRIMARY KEY (board, region, appid, captured_at)
            );
            CREATE INDEX IF NOT EXISTS idx_rank_latest
                ON ranking_snapshots(captured_at, board, region, rank);

            CREATE TABLE IF NOT EXISTS daily_stats (
                appid INTEGER NOT NULL,
                sample_date TEXT NOT NULL,
                current_players INTEGER NOT NULL DEFAULT 0,
                total_reviews INTEGER NOT NULL DEFAULT 0,
                positive_reviews INTEGER NOT NULL DEFAULT 0,
                sampled_at TEXT NOT NULL,
                PRIMARY KEY (appid, sample_date)
            );

            CREATE TABLE IF NOT EXISTS sync_runs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                started_at TEXT NOT NULL,
                completed_at TEXT,
                status TEXT NOT NULL,
                games_seen INTEGER NOT NULL DEFAULT 0,
                games_updated INTEGER NOT NULL DEFAULT 0,
                error TEXT
            );
            """
        )
        game_columns = {row["name"] for row in db.execute("PRAGMA table_info(games)")}
        if "steam_type" not in game_columns:
            db.execute("ALTER TABLE games ADD COLUMN steam_type TEXT NOT NULL DEFAULT 'game'")


def http_json(url: str, params: dict[str, Any] | None = None, retries: int = 2) -> Any:
    if params:
        separator = "&" if "?" in url else "?"
        url = f"{url}{separator}{urllib.parse.urlencode(params)}"
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "application/json,text/plain,*/*",
            "Accept-Language": "en-US,en;q=0.9",
        },
    )
    last_error: Exception | None = None
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(request, timeout=20) as response:
                return json.loads(response.read().decode("utf-8"))
        except Exception as error:  # Network failures are retried and surfaced in sync status.
            last_error = error
            if attempt < retries:
                time.sleep(0.7 * (attempt + 1))
    raise RuntimeError(f"Steam request failed: {url}: {last_error}")


def fetch_search_board(
    filter_name: str,
    region: str,
    count: int = 50,
    tag_id: int | None = None,
) -> list[int]:
    params: dict[str, Any] = {
        "query": "",
        "start": 0,
        "count": count,
        "dynamic_data": "",
        "sort_by": "_ASC",
        "filter": filter_name,
        "cc": region,
        "l": "english",
        "infinite": 1,
        "ignore_preferences": 1,
    }
    if tag_id is not None:
        params["tags"] = tag_id
    payload = http_json(SEARCH_URL, params)
    if not payload.get("success"):
        return []
    parser = SearchResultParser()
    parser.feed(payload.get("results_html", ""))
    return parser.appids[:count]


def featured_ids(payload: dict[str, Any], key: str) -> list[int]:
    category = payload.get(key) or {}
    items = category.get("items") or []
    result: list[int] = []
    for item in items:
        appid = item.get("id")
        if isinstance(appid, int) and appid not in result:
            result.append(appid)
    return result


def collect_rankings() -> list[dict[str, Any]]:
    rankings: list[dict[str, Any]] = []

    try:
        featured = http_json(FEATURED_URL, {"cc": "US", "l": "english"})
        new_releases = featured_ids(featured, "new_releases")
        coming_soon = featured_ids(featured, "coming_soon")
        if new_releases:
            rankings.append({"board": "new_releases", "region": "GLOBAL", "appids": new_releases[:30]})
        if coming_soon:
            rankings.append({"board": "coming_soon", "region": "GLOBAL", "appids": coming_soon[:20]})
    except Exception as error:
        print(f"Steam featured categories unavailable: {error}", flush=True)

    for region in REGIONS:
        try:
            ids = fetch_search_board("topsellers", region, 30)
        except Exception as error:
            print(f"Steam top sellers unavailable for {region}: {error}", flush=True)
            continue
        if ids:
            rankings.append({"board": "top_sellers", "region": region, "appids": ids})

    for tag_id, tag_name in TAG_BOARDS:
        try:
            ids = fetch_search_board("topsellers", "US", TAG_FETCH_SIZE, tag_id=tag_id)
        except Exception as error:
            print(f"Steam tag board unavailable for {tag_name} ({tag_id}): {error}", flush=True)
            continue
        if ids:
            rankings.append({"board": f"tag_{tag_id}", "region": "US", "appids": ids})

    if not rankings:
        raise RuntimeError("No Steam rankings were available")
    return rankings


def get_cached_game(appid: int) -> dict[str, Any] | None:
    with connect() as db:
        row = db.execute("SELECT * FROM games WHERE appid = ?", (appid,)).fetchone()
    return dict(row) if row else None


def details_are_fresh(cached: dict[str, Any] | None) -> bool:
    if not cached or not cached.get("details_updated_at"):
        return False
    try:
        updated = datetime.fromisoformat(cached["details_updated_at"])
        return utc_now() - updated < timedelta(days=DETAIL_CACHE_DAYS)
    except ValueError:
        return False


def fetch_game(appid: int) -> dict[str, Any] | None:
    cached = get_cached_game(appid)
    details: dict[str, Any] | None = None
    details_updated_at = cached.get("details_updated_at") if cached else None

    if details_are_fresh(cached):
        details = cached
    else:
        response = http_json(DETAIL_URL, {"appids": appid, "cc": "US", "l": "english"})
        item = response.get(str(appid)) or {}
        if item.get("success"):
            data = item.get("data") or {}
            steam_type = data.get("type") or ""
            if steam_type not in {"game", "demo"}:
                return None
            price = data.get("price_overview") or {}
            release = data.get("release_date") or {}
            details = {
                "appid": appid,
                "steam_type": steam_type,
                "name": data.get("name") or f"Steam App {appid}",
                "developer": ", ".join(data.get("developers") or []),
                "publisher": ", ".join(data.get("publishers") or []),
                "header_image": data.get("header_image") or "",
                "capsule_image": data.get("capsule_image") or data.get("header_image") or "",
                "release_date": release.get("date") or "",
                "coming_soon": int(bool(release.get("coming_soon"))),
                "genres_json": json.dumps(
                    [genre.get("description") for genre in data.get("genres") or [] if genre.get("description")],
                    ensure_ascii=False,
                ),
                "price_text": price.get("final_formatted") or ("Free" if data.get("is_free") else ""),
                "discount_percent": int(price.get("discount_percent") or 0),
            }
            details_updated_at = iso_now()
        elif cached:
            details = cached
        else:
            return None

    current_players = int((cached or {}).get("current_players") or 0)
    try:
        player_payload = http_json(PLAYER_URL, {"appid": appid}, retries=1)
        current_players = int((player_payload.get("response") or {}).get("player_count") or 0)
    except Exception:
        # Unreleased games commonly return 404 here; their store metadata is still useful.
        pass

    total_reviews = int((cached or {}).get("total_reviews") or 0)
    positive_reviews = int((cached or {}).get("positive_reviews") or 0)
    review_percent = (cached or {}).get("review_percent")
    review_label = (cached or {}).get("review_label") or ""
    try:
        review_payload = http_json(
            REVIEWS_URL.format(appid=appid),
            {
                "json": 1,
                "language": "all",
                "purchase_type": "all",
                "num_per_page": 0,
            },
            retries=1,
        )
        if review_payload.get("success") == 1:
            review_summary = review_payload.get("query_summary") or {}
            total_reviews = int(review_summary.get("total_reviews") or 0)
            positive_reviews = int(review_summary.get("total_positive") or 0)
            review_percent = round(positive_reviews / total_reviews * 100, 1) if total_reviews else None
            review_label = review_summary.get("review_score_desc") or ""
    except Exception:
        pass

    return {
        **details,
        "appid": appid,
        "total_reviews": total_reviews,
        "positive_reviews": positive_reviews,
        "review_percent": review_percent,
        "review_label": review_label,
        "current_players": current_players,
        "details_updated_at": details_updated_at,
        "updated_at": iso_now(),
    }


def upsert_game(db: sqlite3.Connection, game: dict[str, Any], sample_date: str, sampled_at: str) -> None:
    db.execute(
        """
        INSERT INTO games (
            appid, steam_type, name, developer, publisher, header_image, capsule_image,
            release_date, coming_soon, genres_json, price_text, discount_percent,
            total_reviews, positive_reviews, review_percent, review_label,
            current_players, details_updated_at, updated_at
        ) VALUES (
            :appid, :steam_type, :name, :developer, :publisher, :header_image, :capsule_image,
            :release_date, :coming_soon, :genres_json, :price_text, :discount_percent,
            :total_reviews, :positive_reviews, :review_percent, :review_label,
            :current_players, :details_updated_at, :updated_at
        )
        ON CONFLICT(appid) DO UPDATE SET
            steam_type = excluded.steam_type,
            name = excluded.name,
            developer = excluded.developer,
            publisher = excluded.publisher,
            header_image = excluded.header_image,
            capsule_image = excluded.capsule_image,
            release_date = excluded.release_date,
            coming_soon = excluded.coming_soon,
            genres_json = excluded.genres_json,
            price_text = excluded.price_text,
            discount_percent = excluded.discount_percent,
            total_reviews = excluded.total_reviews,
            positive_reviews = excluded.positive_reviews,
            review_percent = excluded.review_percent,
            review_label = excluded.review_label,
            current_players = excluded.current_players,
            details_updated_at = excluded.details_updated_at,
            updated_at = excluded.updated_at
        """,
        game,
    )
    db.execute(
        """
        INSERT INTO daily_stats (
            appid, sample_date, current_players, total_reviews, positive_reviews, sampled_at
        ) VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(appid, sample_date) DO UPDATE SET
            current_players = excluded.current_players,
            total_reviews = excluded.total_reviews,
            positive_reviews = excluded.positive_reviews,
            sampled_at = excluded.sampled_at
        """,
        (
            game["appid"],
            sample_date,
            game["current_players"],
            game["total_reviews"],
            game["positive_reviews"],
            sampled_at,
        ),
    )


def sync_all() -> dict[str, Any]:
    if not SYNC_LOCK.acquire(blocking=False):
        return {"status": "already_running"}
    init_db()
    started_at = iso_now()
    run_id: int | None = None
    try:
        with connect() as db:
            cursor = db.execute(
                "INSERT INTO sync_runs(started_at, status) VALUES (?, 'running')",
                (started_at,),
            )
            run_id = int(cursor.lastrowid)

        rankings = collect_rankings()
        ordered_appids: list[int] = []
        for ranking in rankings:
            for appid in ranking["appids"]:
                if appid not in ordered_appids:
                    ordered_appids.append(appid)
        ordered_appids = ordered_appids[:MAX_GAMES]
        allowed = set(ordered_appids)
        captured_at = iso_now()
        sample_date = utc_now().date().isoformat()

        games: list[dict[str, Any]] = []
        with ThreadPoolExecutor(max_workers=REQUEST_WORKERS) as executor:
            futures = {executor.submit(fetch_game, appid): appid for appid in ordered_appids}
            for future in as_completed(futures):
                try:
                    game = future.result()
                    if game:
                        games.append(game)
                except Exception:
                    continue

        valid_appids = {game["appid"] for game in games}
        with connect() as db:
            for game in games:
                upsert_game(db, game, sample_date, captured_at)
            for ranking in rankings:
                ranked_appids = [appid for appid in ranking["appids"] if appid in allowed]
                if ranking["board"].startswith("tag_"):
                    ranked_appids = [appid for appid in ranked_appids if appid in valid_appids][:TAG_BOARD_SIZE]
                for rank, appid in enumerate(ranked_appids, start=1):
                    if appid not in allowed:
                        continue
                    db.execute(
                        "INSERT OR IGNORE INTO ranking_snapshots(board, region, appid, rank, captured_at) VALUES (?, ?, ?, ?, ?)",
                        (ranking["board"], ranking["region"], appid, rank, captured_at),
                    )
            cutoff_rank = (utc_now() - timedelta(days=45)).isoformat(timespec="seconds")
            cutoff_stats = (utc_now().date() - timedelta(days=90)).isoformat()
            db.execute("DELETE FROM ranking_snapshots WHERE captured_at < ?", (cutoff_rank,))
            db.execute("DELETE FROM daily_stats WHERE sample_date < ?", (cutoff_stats,))
            db.execute(
                """
                UPDATE sync_runs
                SET completed_at = ?, status = 'completed', games_seen = ?, games_updated = ?
                WHERE id = ?
                """,
                (iso_now(), len(ordered_appids), len(games), run_id),
            )
        return {
            "status": "completed",
            "games_seen": len(ordered_appids),
            "games_updated": len(games),
            "captured_at": captured_at,
        }
    except Exception as error:
        if run_id is not None:
            with connect() as db:
                db.execute(
                    "UPDATE sync_runs SET completed_at = ?, status = 'failed', error = ? WHERE id = ?",
                    (iso_now(), str(error)[:500], run_id),
                )
        raise
    finally:
        SYNC_LOCK.release()


def board_source(board: str, region: str) -> tuple[str, str]:
    if board == "top_sellers":
        country_name = COUNTRY_META.get(region, {}).get("name", region)
        return "seller", f"{country_name}热销"
    if board == "new_releases":
        return "new", "热门新品"
    if board == "coming_soon":
        return "upcoming", "即将推出"
    if board.startswith("tag_"):
        try:
            tag_id = int(board.removeprefix("tag_"))
        except ValueError:
            return "category", "类型热销"
        return "category", f"{TAG_NAMES.get(tag_id, '类型')}热销"
    return "all", "Steam 榜单"


def release_date_iso(value: str) -> str | None:
    value = value.strip()
    for date_format in ("%b %d, %Y", "%d %b, %Y", "%d %b %Y"):
        try:
            return datetime.strptime(value, date_format).date().isoformat()
        except ValueError:
            continue
    return None


def get_games() -> dict[str, Any]:
    init_db()
    with connect() as db:
        latest = db.execute("SELECT MAX(captured_at) AS value FROM ranking_snapshots").fetchone()["value"]
        if not latest:
            return {
                "games": [],
                "updated_at": None,
                "history_days": 0,
                "has_previous_snapshot": False,
                "source_count": 0,
                "source_expected": len(REGIONS) + 2 + len(TAG_BOARDS),
            }
        previous_row = db.execute(
            "SELECT MAX(captured_at) AS value FROM ranking_snapshots WHERE captured_at < ?",
            (latest,),
        ).fetchone()
        previous = previous_row["value"] if previous_row else None
        game_rows = db.execute("SELECT * FROM games ORDER BY current_players DESC").fetchall()
        ranking_rows = db.execute(
            "SELECT board, region, appid, rank FROM ranking_snapshots WHERE captured_at = ?",
            (latest,),
        ).fetchall()
        previous_rows = db.execute(
            "SELECT board, region, appid, rank FROM ranking_snapshots WHERE captured_at = ?",
            (previous,),
        ).fetchall() if previous else []

        previous_map = {
            (row["board"], row["region"], row["appid"]): row["rank"]
            for row in previous_rows
        }
        rankings_by_app: dict[int, list[dict[str, Any]]] = {}
        for row in ranking_rows:
            item = dict(row)
            previous_rank = previous_map.get((row["board"], row["region"], row["appid"]))
            item["rise"] = max(0, previous_rank - row["rank"]) if previous_rank else 0
            rankings_by_app.setdefault(row["appid"], []).append(item)

        result: list[dict[str, Any]] = []
        max_history_days = 0
        for row in game_rows:
            appid = row["appid"]
            boards = rankings_by_app.get(appid)
            if not boards:
                continue
            stats = db.execute(
                "SELECT * FROM daily_stats WHERE appid = ? ORDER BY sample_date DESC LIMIT 8",
                (appid,),
            ).fetchall()
            stats = list(reversed(stats))
            history_days = 0
            player_growth: float | None = None
            review_growth: float | None = None
            if stats:
                first_date = datetime.fromisoformat(stats[0]["sample_date"]).date()
                last_date = datetime.fromisoformat(stats[-1]["sample_date"]).date()
                history_days = (last_date - first_date).days + 1
                max_history_days = max(max_history_days, history_days)
                if history_days >= 7:
                    first_players = stats[0]["current_players"]
                    first_reviews = stats[0]["total_reviews"]
                    if first_players > 0:
                        player_growth = round((stats[-1]["current_players"] - first_players) / first_players * 100, 1)
                    if first_reviews > 0:
                        review_growth = round((stats[-1]["total_reviews"] - first_reviews) / first_reviews * 100, 1)

            primary_boards = [item for item in boards if not item["board"].startswith("tag_")]
            best = min(primary_boards or boards, key=lambda item: item["rank"])
            source, source_name = board_source(best["board"], best["region"])
            rank_rise = best["rise"]
            board_types = {
                board_source(item["board"], item["region"])[0]
                for item in boards
                if not item["board"].startswith("tag_")
            }
            country_ranks = []
            server_buckets: dict[str, dict[str, Any]] = {}
            for item in sorted(boards, key=lambda value: value["rank"]):
                if item["board"] != "top_sellers":
                    continue
                country = COUNTRY_META.get(item["region"])
                if not country:
                    continue
                signal = {
                    **country,
                    "rank": item["rank"],
                    "rise": item["rise"],
                }
                country_ranks.append(signal)
                bucket = server_buckets.setdefault(
                    country["serverId"],
                    {
                        "id": country["serverId"],
                        "name": country["serverName"],
                        "bestRank": item["rank"],
                        "primaryRank": None,
                        "rise": item["rise"],
                        "countries": [],
                    },
                )
                bucket["bestRank"] = min(bucket["bestRank"], item["rank"])
                bucket["rise"] = max(bucket["rise"], item["rise"])
                if country["isPrimary"]:
                    bucket["primaryRank"] = item["rank"]
                bucket["countries"].append(signal)
            server_signals = []
            for bucket in server_buckets.values():
                bucket["countries"].sort(key=lambda value: value["rank"])
                bucket["countryCount"] = len(bucket["countries"])
                server_signals.append(bucket)
            server_signals.sort(key=lambda value: (value["bestRank"], -value["countryCount"]))
            seller_signal = min(country_ranks, key=lambda value: value["rank"], default=None)
            category_tags = []
            for item in sorted(boards, key=lambda value: value["rank"]):
                if not item["board"].startswith("tag_"):
                    continue
                try:
                    tag_id = int(item["board"].removeprefix("tag_"))
                except ValueError:
                    continue
                category_tags.append(
                    {
                        "id": tag_id,
                        "name": TAG_NAMES.get(tag_id, "类型"),
                        "rank": item["rank"],
                        "rise": item["rise"],
                    }
                )
            genres = json.loads(row["genres_json"] or "[]")
            release = "即将发行" if row["coming_soon"] else "已发行"
            normalized_release_date = release_date_iso(row["release_date"] or "")
            is_new_release = False
            if normalized_release_date and not row["coming_soon"]:
                release_day = datetime.fromisoformat(normalized_release_date).date()
                age_days = (utc_now().date() - release_day).days
                is_new_release = 0 <= age_days <= 90

            result.append(
                {
                    "id": appid,
                    "productType": row["steam_type"],
                    "title": row["name"],
                    "developer": row["developer"] or row["publisher"] or "Unknown",
                    "tags": genres[:3],
                    "image": row["header_image"] or row["capsule_image"],
                    "release": release,
                    "releaseDate": row["release_date"],
                    "releaseDateISO": normalized_release_date,
                    "isNew": is_new_release,
                    "price": row["price_text"] or "N/A",
                    "discount": row["discount_percent"],
                    "activePlayers": row["current_players"],
                    "playerGrowth": player_growth,
                    "playerTrend": [item["current_players"] for item in stats],
                    "historyDays": history_days,
                    "reviews": row["total_reviews"],
                    "reviewGrowth": review_growth,
                    "reviewPercent": row["review_percent"],
                    "reviewLabel": row["review_label"],
                    "source": source,
                    "sourceName": source_name,
                    "rank": best["rank"],
                    "rise": rank_rise,
                    "sources": sorted(board_types),
                    "isHotNewBoard": "new" in board_types,
                    "isUpcomingBoard": "upcoming" in board_types,
                    "isSellerBoard": "seller" in board_types,
                    "newReleaseRank": min(
                        (item["rank"] for item in boards if item["board"] == "new_releases"),
                        default=None,
                    ),
                    "upcomingRank": min(
                        (item["rank"] for item in boards if item["board"] == "coming_soon"),
                        default=None,
                    ),
                    "sellerBestRank": seller_signal["rank"] if seller_signal else None,
                    "regionCount": len(country_ranks),
                    "countryCount": len(country_ranks),
                    "serverCount": len(server_signals),
                    "countryRanks": country_ranks,
                    "serverSignals": server_signals,
                    "categoryTags": category_tags,
                    "boards": boards,
                }
            )
        source_count = len({(row["board"], row["region"]) for row in ranking_rows})
    return {
        "games": result,
        "updated_at": latest,
        "history_days": max_history_days,
        "has_previous_snapshot": previous is not None,
        "source_count": source_count,
        "source_expected": len(REGIONS) + 2 + len(TAG_BOARDS),
    }


def get_status() -> dict[str, Any]:
    init_db()
    with connect() as db:
        row = db.execute("SELECT * FROM sync_runs ORDER BY id DESC LIMIT 1").fetchone()
        success = db.execute(
            "SELECT completed_at FROM sync_runs WHERE status = 'completed' ORDER BY id DESC LIMIT 1"
        ).fetchone()
    payload = dict(row) if row else {"status": "never_run"}
    payload["last_success_at"] = success["completed_at"] if success else None
    return payload
