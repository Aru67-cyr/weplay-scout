let games = [
  {
    id: 1601570,
    title: "The Alters",
    developer: "11 bit studios",
    tags: ["生存", "基地建设"],
    score: 94,
    source: "seller",
    sourceName: "全球热销",
    rank: 12,
    rise: 47,
    followers: 186400,
    followerGrowth: 18.4,
    activePlayers: 48210,
    playerGrowth: 184.6,
    playerTrend: [12100, 14800, 17300, 26400, 31800, 44600, 48210],
    price: "$34.99",
    discount: 10,
    release: "已发行",
    releaseDate: "2025-06-13",
    stage: "following",
    saved: true,
    fit: 96,
    momentum: 98,
    novelty: 86,
    insight: "最新热销榜上升 47 位，内容创作者覆盖与公开评价热度同步加速。",
  },
  {
    id: 2868840,
    title: "Slay the Spire 2",
    developer: "Mega Crit",
    tags: ["策略", "Roguelike"],
    score: 91,
    source: "upcoming",
    sourceName: "即将推出",
    rank: 3,
    rise: 12,
    followers: 782100,
    followerGrowth: 9.7,
    activePlayers: 12540,
    playerGrowth: 92.3,
    playerTrend: [6520, 7100, 7800, 9400, 10200, 11900, 12540],
    price: "$29.99",
    discount: 0,
    release: "即将发行",
    releaseDate: "2026-03",
    stage: "following",
    saved: true,
    fit: 90,
    momentum: 93,
    novelty: 84,
    insight: "高体量续作，愿望单仍在稳步加速，适合提前建立创作者与竞品观察。",
  },
  {
    id: 2456740,
    title: "inZOI",
    developer: "inZOI Studio",
    tags: ["模拟", "生活"],
    score: 88,
    source: "new",
    sourceName: "热门新品",
    rank: 7,
    rise: 8,
    followers: 623500,
    followerGrowth: 6.8,
    activePlayers: 26942,
    playerGrowth: 66.8,
    playerTrend: [16150, 16800, 18200, 21100, 24700, 25300, 26942],
    price: "$39.99",
    discount: 20,
    release: "抢先体验",
    releaseDate: "2025-03-28",
    stage: "new",
    saved: false,
    fit: 86,
    momentum: 91,
    novelty: 92,
    insight: "热门新品与直播观看同步走高，生活模拟赛道用户讨论密度突出。",
  },
  {
    id: 1145350,
    title: "Hades II",
    developer: "Supergiant Games",
    tags: ["动作", "Roguelike"],
    score: 86,
    source: "online",
    sourceName: "当前在线",
    rank: 18,
    rise: 21,
    followers: 1140000,
    followerGrowth: 4.2,
    activePlayers: 38472,
    playerGrowth: 34.1,
    playerTrend: [28680, 29100, 30500, 34900, 33100, 37200, 38472],
    price: "$29.99",
    discount: 0,
    release: "抢先体验",
    releaseDate: "2024-05-06",
    stage: "done",
    saved: true,
    fit: 88,
    momentum: 89,
    novelty: 78,
    insight: "大版本更新带动在线峰值回升，成熟 IP 的内容窗口仍然强劲。",
  },
  {
    id: 1172710,
    title: "Dune: Awakening",
    developer: "Funcom",
    tags: ["生存", "多人"],
    score: 84,
    source: "seller",
    sourceName: "全球热销",
    rank: 5,
    rise: 15,
    followers: 516300,
    followerGrowth: 11.3,
    activePlayers: 87910,
    playerGrowth: 48.6,
    playerTrend: [59150, 62200, 61800, 70400, 76300, 85100, 87910],
    price: "$49.99",
    discount: 0,
    release: "已发行",
    releaseDate: "2025-06-10",
    stage: "new",
    saved: false,
    fit: 92,
    momentum: 87,
    novelty: 76,
    insight: "发行窗口内热销排名稳定，多人生存标签与目标用户高度匹配。",
  },
  {
    id: 2138720,
    title: "REMATCH",
    developer: "Sloclap",
    tags: ["体育", "多人"],
    score: 81,
    source: "regional",
    sourceName: "跨区热销",
    rank: 9,
    rise: 28,
    followers: 227800,
    followerGrowth: 22.1,
    activePlayers: 63528,
    playerGrowth: 123.9,
    playerTrend: [28370, 31500, 37100, 44600, 50300, 60200, 63528],
    price: "$24.99",
    discount: 15,
    release: "已发行",
    releaseDate: "2025-06-19",
    stage: "new",
    saved: false,
    fit: 72,
    momentum: 96,
    novelty: 89,
    insight: "试玩期口碑快速扩散，短视频传播效率高，是值得关注的新品类机会。",
  },
  {
    id: 3164500,
    title: "Schedule I",
    developer: "TVGS",
    tags: ["模拟", "合作"],
    score: 78,
    source: "online",
    sourceName: "当前在线",
    rank: 21,
    rise: 6,
    followers: 346900,
    followerGrowth: 3.8,
    activePlayers: 13481,
    playerGrowth: 48.0,
    playerTrend: [9110, 9470, 10200, 13100, 14800, 13900, 13481],
    price: "$13.99",
    discount: 30,
    release: "抢先体验",
    releaseDate: "2025-03-24",
    stage: "done",
    saved: false,
    fit: 68,
    momentum: 84,
    novelty: 93,
    insight: "社区驱动明显，合作玩法维持较高在线黏性，长尾表现值得持续观察。",
  },
  {
    id: 3241660,
    title: "R.E.P.O.",
    developer: "semiwork",
    tags: ["恐怖", "合作"],
    score: 76,
    source: "new",
    sourceName: "热门新品",
    rank: 14,
    rise: 4,
    followers: 294700,
    followerGrowth: 2.9,
    activePlayers: 92140,
    playerGrowth: 26.4,
    playerTrend: [72890, 74600, 78100, 83500, 90200, 88900, 92140],
    price: "$9.99",
    discount: 0,
    release: "抢先体验",
    releaseDate: "2025-02-26",
    stage: "new",
    saved: false,
    fit: 64,
    momentum: 80,
    novelty: 88,
    insight: "合作恐怖赛道持续活跃，但上升速度开始放缓，适合观察版本更新节点。",
  },
];

const sourceMeta = {
  all: ["综合机会榜", "全部榜单", "聚合 Steam 欧美榜单，优先发现跨区升温的新游戏。"],
  new: ["热门新品", "热门新品", "汇总 Steam 新品榜，以及上线 90 天内已进入国家热销榜的新游。"],
  upcoming: ["即将推出", "即将推出", "查看已公开商店页、即将在 Steam 发行的游戏。"],
  seller: ["全球热销", "监测市场热销", "汇总至少进入一个监测国家热销榜的游戏。"],
  online: ["当前在线", "当前在线", "比较候选游戏当前的 Steam 活跃玩家规模。"],
  regional: ["跨区热销", "跨区总览", "发现同时进入多个 WePlay 区服，并下钻到具体国家热销榜。"],
  category: ["类型榜单", "精选类型", "按 Steam 用户标签查看美国区热销排名，聚焦 8 个工作相关类型。"],
  favorites: ["已收藏线索", "已收藏", "集中查看你已保存、准备进一步评估的线索。"],
  following: ["待跟进", "待跟进", "管理已经进入评估流程、需要继续推动的游戏。"],
  monitors: ["我的监控", "监控命中", "查看由自定义榜单条件自动捕获的游戏。"],
  intel: ["资讯监控", "新游资讯流", "汇总创作者与欧美游戏社区的最新内容，辅助发现榜单之外的新游信号。"],
};

const categoryOptions = [
  [492, "独立"],
  [19, "动作"],
  [122, "RPG"],
  [9, "策略"],
  [599, "模拟"],
  [1685, "合作"],
  [1662, "生存"],
  [1667, "恐怖"],
];
const categoryNames = new Map(categoryOptions);
const serverGroups = [
  { id: "us", name: "美服", primary: "US", countries: [["US", "美国"], ["AU", "澳大利亚"], ["NZ", "新西兰"], ["CA", "加拿大"], ["GB", "英国"], ["NL", "荷兰"]] },
  { id: "fr", name: "法语服", primary: "FR", countries: [["FR", "法国"], ["BE", "比利时"], ["LU", "卢森堡"], ["MC", "摩纳哥"]] },
  { id: "de", name: "德语服", primary: "DE", countries: [["DE", "德国"], ["AT", "奥地利"], ["CH", "瑞士"]] },
  { id: "it", name: "意大利服", primary: "IT", countries: [["IT", "意大利"]] },
];
const serverNames = new Map(serverGroups.map((server) => [server.id, server.name]));
const countryNames = new Map(serverGroups.flatMap((server) => server.countries));
const countryMeta = new Map(serverGroups.flatMap((server) => server.countries.map(([code, name]) => [code, { code, name, serverId: server.id, serverName: server.name, isPrimary: code === server.primary }])));

const state = {
  source: "all",
  query: "",
  genres: new Set(),
  score: 0,
  release: "all",
  board: "trending",
  sort: "growth",
  category: "all",
  server: "all",
  country: "all",
  radarLimit: 12,
  radarMinActive: 0,
  radarNewOnly: false,
  radarCrossOnly: false,
  selectedId: null,
  viewMode: "list",
  intelPlatform: "all",
  intelNewOnly: false,
  intelSort: "hot",
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const formatFollowers = (count) => count >= 10000 ? `${(count / 10000).toFixed(count >= 100000 ? 1 : 2)}万` : count.toLocaleString("zh-CN");
const formatDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date) ? date.replaceAll("-", ".") : date;
const imageFor = (game) => game.image || `assets/games/${game.id}.jpg`;
const steamUrl = (game) => `https://store.steampowered.com/app/${game.id}`;
const releaseTimestamp = (game) => game.releaseDateISO ? Date.parse(`${game.releaseDateISO}T00:00:00`) : -Infinity;
const displayReleaseDate = (game) => game.releaseDateISO ? formatDate(game.releaseDateISO) : (/coming soon/i.test(game.releaseDate || "") ? "待定" : game.releaseDate || "待定");
const genreMap = {
  Action: "动作",
  Adventure: "冒险",
  Casual: "休闲",
  Indie: "独立",
  "Massively Multiplayer": "多人",
  Racing: "竞速",
  RPG: "RPG",
  Simulation: "模拟",
  Sports: "体育",
  Strategy: "策略",
  "Free To Play": "免费",
};
let realDataLoaded = false;
let hasPreviousSnapshot = false;
let dataHistoryDays = 0;
let contentItems = [];
let contentSources = [];
let youtubeConfigured = false;
let youtubeRegions = [];
let youtubeTrendingLocator = "youtube:gaming-trending";
let dataMode = "unknown";

const storageKeys = {
  gameState: "weplay-scout-game-state-v1",
  monitors: "weplay-scout-monitors-v1",
  contentSources: "weplay-scout-content-sources-v1",
};

function readLocalJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeLocalJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // The dashboard remains usable when browser storage is disabled or full.
  }
}

const storedGameState = readLocalJSON(storageKeys.gameState, {});
let monitors = readLocalJSON(storageKeys.monitors, []);
let localContentSources = readLocalJSON(storageKeys.contentSources, []);
if (!Array.isArray(monitors)) monitors = [];
if (!Array.isArray(localContentSources)) localContentSources = [];

games = games.map((game) => ({
  ...game,
  ...(storedGameState[String(game.id)] || {}),
}));

function persistGame(game) {
  storedGameState[String(game.id)] = {
    saved: Boolean(game.saved),
    stage: game.stage || "new",
  };
  writeLocalJSON(storageKeys.gameState, storedGameState);
}

function setStaticModeUI() {
  if (dataMode !== "static") return;
  $("#scheduleText").textContent = "GitHub Actions 每天 03:00 更新";
  $("#syncButton span").textContent = "刷新数据";
  $("#contentSyncButton span").textContent = "刷新资讯";
}

async function fetchJSON(staticPath, apiPath) {
  const staticUrl = new URL(staticPath, document.baseURI);
  staticUrl.searchParams.set("_", Date.now());
  try {
    const response = await fetch(staticUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`Static data ${response.status}`);
    dataMode = "static";
    setStaticModeUI();
    return response.json();
  } catch (staticError) {
    if (!apiPath) throw staticError;
    const response = await fetch(apiPath, { cache: "no-store" });
    if (!response.ok) throw new Error(`API ${response.status}`);
    dataMode = "api";
    return response.json();
  }
}

function hasGrowth(game) {
  return Number.isFinite(game.playerGrowth);
}

function mapApiGame(game, previous = {}) {
  const previousState = realDataLoaded ? previous : {};
  const tags = (game.tags || []).map((tag) => genreMap[tag] || tag);
  const reviewPercent = Number.isFinite(game.reviewPercent) ? game.reviewPercent : null;
  const sources = game.sources?.length ? game.sources : [game.source].filter(Boolean);
  const countryRanks = game.countryRanks?.length
    ? game.countryRanks
    : (game.boards || []).filter((board) => board.board === "top_sellers" && countryMeta.has(board.region)).map((board) => ({ ...countryMeta.get(board.region), rank: board.rank, rise: board.rise || 0 }));
  const serverSignals = game.serverSignals?.length
    ? game.serverSignals
    : serverGroups.map((server) => {
        const countries = countryRanks.filter((country) => country.serverId === server.id).sort((a, b) => a.rank - b.rank);
        if (!countries.length) return null;
        return { id: server.id, name: server.name, bestRank: countries[0].rank, primaryRank: countries.find((country) => country.isPrimary)?.rank ?? null, rise: Math.max(...countries.map((country) => country.rise || 0)), countryCount: countries.length, countries };
      }).filter(Boolean);
  return {
    id: game.id,
    title: game.title,
    developer: game.developer,
    tags: tags.length ? tags : ["未分类"],
    image: game.image,
    score: reviewPercent || 0,
    source: game.source,
    sourceName: game.sourceName,
    rank: game.rank || 0,
    rise: game.rise || 0,
    followers: game.reviews || 0,
    followerGrowth: Number.isFinite(game.reviewGrowth) ? game.reviewGrowth : null,
    reviewPercent,
    activePlayers: game.activePlayers || 0,
    playerGrowth: Number.isFinite(game.playerGrowth) ? game.playerGrowth : null,
    playerTrend: game.playerTrend || [],
    historyDays: game.historyDays || 0,
    price: game.price || "N/A",
    discount: game.discount || 0,
    release: game.release || "未知",
    releaseDate: game.releaseDate || "待定",
    releaseDateISO: game.releaseDateISO || null,
    isNew: Boolean(game.isNew),
    productType: game.productType || "game",
    stage: storedGameState[String(game.id)]?.stage || previousState.stage || "new",
    saved: storedGameState[String(game.id)]?.saved ?? Boolean(previousState.saved),
    sources,
    isHotNewBoard: Boolean(game.isHotNewBoard || sources.includes("new")),
    isUpcomingBoard: Boolean(game.isUpcomingBoard || sources.includes("upcoming")),
    isSellerBoard: Boolean(game.isSellerBoard || sources.includes("seller")),
    newReleaseRank: Number.isFinite(game.newReleaseRank) ? game.newReleaseRank : null,
    upcomingRank: Number.isFinite(game.upcomingRank) ? game.upcomingRank : null,
    sellerBestRank: Number.isFinite(game.sellerBestRank) ? game.sellerBestRank : null,
    regionCount: game.countryCount || game.regionCount || 0,
    countryCount: countryRanks.length || game.countryCount || game.regionCount || 0,
    serverCount: serverSignals.length || game.serverCount || 0,
    countryRanks,
    serverSignals,
    categoryTags: game.categoryTags || [],
    boards: game.boards || [],
    insight: game.playerGrowth == null
      ? `已进入${game.sourceName}，当前在线 ${Number(game.activePlayers || 0).toLocaleString("zh-CN")}；7 日趋势仍在积累。`
      : `近 7 日在线变化 ${game.playerGrowth >= 0 ? "+" : ""}${game.playerGrowth}%，当前位于${game.sourceName}第 ${game.rank} 名。`,
  };
}

function hasSource(game, source) {
  return (game.sources || [game.source]).includes(source);
}

function isHotNew(game) {
  return Boolean(game.isHotNewBoard || hasSource(game, "new") || (game.isNew && (game.isSellerBoard || hasSource(game, "seller"))));
}

function countrySignal(game, code) {
  return (game.countryRanks || []).find((country) => country.code === code) || null;
}

function serverSignal(game, id) {
  return (game.serverSignals || []).find((server) => server.id === id) || null;
}

function bestSellerSignal(game) {
  return [...(game.countryRanks || [])].sort((a, b) => a.rank - b.rank || Number(b.isPrimary) - Number(a.isPrimary))[0] || null;
}

function marketRank(game) {
  if (state.source === "regional" && state.country !== "all") return countrySignal(game, state.country)?.rank ?? 999;
  if (state.source === "regional" && state.server !== "all") {
    const signal = serverSignal(game, state.server);
    return signal?.primaryRank ?? signal?.bestRank ?? 999;
  }
  return game.sellerBestRank ?? bestSellerSignal(game)?.rank ?? game.rank ?? 999;
}

function compareMarketSignals(a, b) {
  if (state.source === "regional" && state.country !== "all") {
    return marketRank(a) - marketRank(b) || b.activePlayers - a.activePlayers || b.followers - a.followers;
  }
  if (state.source === "regional" && state.server !== "all") {
    const aSignal = serverSignal(a, state.server);
    const bSignal = serverSignal(b, state.server);
    return (aSignal?.primaryRank ?? aSignal?.bestRank ?? 999) - (bSignal?.primaryRank ?? bSignal?.bestRank ?? 999)
      || (bSignal?.countryCount || 0) - (aSignal?.countryCount || 0)
      || (aSignal?.bestRank ?? 999) - (bSignal?.bestRank ?? 999)
      || b.activePlayers - a.activePlayers;
  }
  const preferFresh = state.source === "all" || state.source === "new";
  const aFresh = preferFresh && (a.isNew || a.isUpcomingBoard || hasSource(a, "upcoming")) ? 1 : 0;
  const bFresh = preferFresh && (b.isNew || b.isUpcomingBoard || hasSource(b, "upcoming")) ? 1 : 0;
  return bFresh - aFresh
    || (b.serverCount || 0) - (a.serverCount || 0)
    || (b.countryCount || 0) - (a.countryCount || 0)
    || marketRank(a) - marketRank(b)
    || b.activePlayers - a.activePlayers
    || b.followers - a.followers;
}

function monitorRank(game, source) {
  if (source === "热门新品") return game.newReleaseRank ?? (isHotNew(game) ? game.rank : 999);
  if (source === "全球热销") return game.sellerBestRank ?? bestSellerSignal(game)?.rank ?? 999;
  if (source === "类型榜单") return Math.min(...(game.categoryTags || []).map((tag) => tag.rank), 999);
  if (source === "即将推出") return game.upcomingRank ?? (game.isUpcomingBoard ? game.rank : 999);
  return game.rank ?? 999;
}

function monitorSourceMatches(game, source) {
  if (source === "热门新品") return isHotNew(game);
  if (source === "全球热销") return game.isSellerBoard || hasSource(game, "seller") || game.countryCount > 0;
  if (source === "类型榜单") return (game.categoryTags || []).length > 0;
  if (source === "即将推出") return game.isUpcomingBoard || hasSource(game, "upcoming") || game.release === "即将发行";
  return true;
}

function monitorMatchesGame(monitor, game) {
  if (!monitorSourceMatches(game, monitor.source)) return false;
  const wantedTags = String(monitor.tags || "")
    .split(/[、,，/\s]+/)
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
  if (wantedTags.length && !wantedTags.some((wanted) => game.tags.some((tag) => tag.toLowerCase().includes(wanted)))) return false;
  if (monitor.condition === "进入前 50 名") return monitorRank(game, monitor.source) <= 50;
  if (monitor.condition === "单日上升 20 位") return Math.max(game.rise || 0, ...(game.boards || []).map((board) => board.rise || 0)) >= 20;
  if (monitor.condition === "7 日在线增幅达到 50%") return Number(game.playerGrowth) >= 50;
  if (monitor.condition === "评价数周增 10%") return Number(game.followerGrowth) >= 10;
  return false;
}

function matchingMonitors(game) {
  return monitors.filter((monitor) => monitorMatchesGame(monitor, game));
}

function getFilteredGames() {
  const query = state.query.trim().toLowerCase();
  const filtered = games.filter((game) => {
    if (state.source === "new" && !isHotNew(game)) return false;
    if (state.source === "upcoming" && !(game.isUpcomingBoard || hasSource(game, "upcoming") || game.release === "即将发行")) return false;
    if (state.source === "seller" && !(game.isSellerBoard || hasSource(game, "seller") || (game.countryRanks || []).length)) return false;
    if (state.source === "regional") {
      if (state.server === "all" && (game.serverCount || 0) < 2) return false;
      if (state.server !== "all" && !serverSignal(game, state.server)) return false;
      if (state.country !== "all" && !countrySignal(game, state.country)) return false;
    }
    if (state.source === "category") {
      if (!game.categoryTags.length) return false;
      if (state.category !== "all" && !game.categoryTags.some((tag) => tag.id === Number(state.category))) return false;
    }
    if (state.source === "favorites" && !game.saved) return false;
    if (state.source === "following" && game.stage !== "following") return false;
    if (state.source === "monitors" && !matchingMonitors(game).length) return false;
    if (query && ![game.title, game.developer, String(game.id), ...game.tags].some((text) => text.toLowerCase().includes(query))) return false;
    if (state.genres.size && !game.tags.some((tag) => state.genres.has(tag))) return false;
    if (state.score > 0 && (!hasGrowth(game) || game.playerGrowth < state.score)) return false;
    if (state.release === "released" && game.release === "即将发行") return false;
    if (state.release === "upcoming" && game.release !== "即将发行") return false;
    return true;
  });
  const growthReady = dataHistoryDays >= 7 && filtered.some(hasGrowth);
  return filtered.sort((a, b) => {
    if (state.sort === "growth") {
      if (growthReady && (hasGrowth(a) || hasGrowth(b))) return (b.playerGrowth ?? -Infinity) - (a.playerGrowth ?? -Infinity) || compareMarketSignals(a, b);
      return compareMarketSignals(a, b);
    }
    if (state.sort === "market") return compareMarketSignals(a, b);
    if (state.sort === "active") return b.activePlayers - a.activePlayers;
    if (state.sort === "followers") return b.followers - a.followers;
    if (state.sort === "category") return categorySignal(a).rank - categorySignal(b).rank;
    if (state.sort === "release") return releaseTimestamp(b) - releaseTimestamp(a);
    if (state.sort === "rank") return displaySignal(a).rank - displaySignal(b).rank || compareMarketSignals(a, b);
    return b.score - a.score;
  });
}

function categorySignal(game) {
  const tags = game.categoryTags || [];
  if (!tags.length) return { name: "类型热销", rank: 999, rise: 0 };
  if (state.category !== "all") {
    const selected = tags.find((tag) => tag.id === Number(state.category));
    if (selected) return { ...selected, name: `${selected.name}热销` };
  }
  const best = [...tags].sort((a, b) => a.rank - b.rank)[0];
  return { ...best, name: `${best.name}热销` };
}

function displaySignal(game) {
  if (state.source === "category") return categorySignal(game);
  if (state.source === "new" && Number.isFinite(game.newReleaseRank)) return { name: "Steam 新品榜", rank: game.newReleaseRank, rise: 0, detail: "官方新品榜" };
  if (state.source === "upcoming" && Number.isFinite(game.upcomingRank)) return { name: "即将推出", rank: game.upcomingRank, rise: 0, detail: "Steam 预告榜" };
  if (state.source === "regional" && state.country !== "all") {
    const country = countrySignal(game, state.country);
    return country ? { name: `${country.name}热销`, rank: country.rank, rise: country.rise || 0, detail: serverNames.get(country.serverId) } : { name: "国家热销", rank: 999, rise: 0 };
  }
  if (state.source === "regional" && state.server !== "all") {
    const server = serverSignal(game, state.server);
    return server ? { name: `${server.name}热销`, rank: server.primaryRank ?? server.bestRank, rise: server.rise || 0, detail: `${server.countryCount} 国上榜` } : { name: "区服热销", rank: 999, rise: 0 };
  }
  const seller = bestSellerSignal(game);
  if (state.source === "regional" && seller) return { name: `${game.serverCount} 区 · ${game.countryCount} 国`, rank: seller.rank, rise: seller.rise || 0, detail: "跨区覆盖" };
  if (seller) return { name: `${seller.name}热销`, rank: seller.rank, rise: seller.rise || 0, detail: `${game.serverCount} 区 · ${game.countryCount} 国` };
  if (Number.isFinite(game.newReleaseRank)) return { name: "Steam 新品榜", rank: game.newReleaseRank, rise: 0, detail: "官方新品榜" };
  if (Number.isFinite(game.upcomingRank)) return { name: "即将推出", rank: game.upcomingRank, rise: 0, detail: "Steam 预告榜" };
  return { name: game.sourceName || "Steam 榜单", rank: game.rank || 999, rise: game.rise || 0, detail: "每日快照" };
}

function stageLabel(stage) {
  return stage === "following" ? "待跟进" : stage === "done" ? "已评估" : "未处理";
}

function sparkline(values) {
  values = Array.isArray(values) && values.length ? [...values] : [0];
  if (values.length === 1) values.push(values[0]);
  const width = 102;
  const height = 36;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width;
    const y = height - 4 - ((value - min) / range) * (height - 8);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return `<svg class="sparkline" viewBox="0 0 ${width} ${height}" aria-hidden="true"><path class="gridline" d="M0 32 H102"/><polyline class="trend-line" points="${points}" /></svg>`;
}

function renderRows() {
  const filtered = getFilteredGames();
  const tbody = $("#gameRows");
  tbody.innerHTML = filtered.map((game, index) => {
    const signal = displaySignal(game);
    const signalRank = signal.rank < 999 ? `#${signal.rank}` : "—";
    const newBadge = game.productType === "demo"
      ? `<span class="new-game-corner demo" title="Steam 试玩版本">Demo</span>`
      : game.isNew ? `<span class="new-game-corner" title="上线 90 天内">新游</span>` : "";
    const growth = hasGrowth(game)
      ? `<span class="growth-value ${game.playerGrowth < 0 ? "negative" : ""}"><i data-lucide="${game.playerGrowth < 0 ? "trending-down" : "trending-up"}"></i> ${game.playerGrowth >= 0 ? "+" : ""}${game.playerGrowth.toFixed(1)}%</span>`
      : `<span class="growth-pending">积累中 · ${Math.min(7, game.historyDays || 1)}/7 天</span>`;
    const reviewTrend = Number.isFinite(game.followerGrowth)
      ? `7 日 +${game.followerGrowth}%`
      : game.reviewPercent != null ? `好评 ${game.reviewPercent}%` : "暂无评价";
    return `
    <tr data-id="${game.id}" tabindex="0">
      <td><span class="rank-number ${index < 3 ? "top" : ""}">${index + 1}</span></td>
      <td>
        <div class="game-cell">
          <span class="game-cover-wrap"><img class="game-cover" src="${imageFor(game)}" alt="${game.title} 游戏封面" />${newBadge}</span>
          <div class="game-main">
            <strong>${game.title}</strong>
            <small>${game.developer} · App ${game.id}</small>
            <div class="tag-line"><span class="micro-tag">${game.release}</span>${game.tags.slice(0, 1).map((tag) => `<span class="micro-tag">${tag}</span>`).join("")}</div>
          </div>
        </div>
      </td>
      <td><div class="release-date-cell"><strong>${displayReleaseDate(game)}</strong><small>${game.productType === "demo" ? "试玩版本" : game.release === "即将发行" ? "即将上线" : game.isNew ? "新近上线" : "已上线"}</small></div></td>
      <td><div class="active-players"><strong><i data-lucide="users"></i>${game.activePlayers.toLocaleString("zh-CN")}</strong><small>当前活跃</small></div></td>
      <td>${sparkline(game.playerTrend)}</td>
      <td>${growth}</td>
      <td><div class="followers compact"><strong>${formatFollowers(game.followers)}</strong><small>${reviewTrend}</small></div></td>
      <td><div class="rank-signal"><strong>${signal.name} ${signalRank}</strong><small>${signal.rise ? `上升 ${signal.rise} 位` : signal.detail || "每日快照"}</small></div></td>
      <td><div class="price-cell">${game.discount ? `<span class="discount-badge">-${game.discount}%</span>` : ""}<strong>${game.price}</strong></div></td>
      <td><div class="row-actions"><a class="row-icon steam-link" data-action="steam" href="${steamUrl(game)}" target="_blank" rel="noreferrer" aria-label="在 Steam 打开《${game.title}》" title="打开 Steam 商店页"><i data-lucide="external-link"></i></a><button class="row-icon ${game.saved ? "saved" : ""}" data-action="save" type="button" aria-label="${game.saved ? "取消收藏" : "收藏"}"><i data-lucide="${game.saved ? "bookmark-check" : "bookmark"}"></i></button><button class="row-icon" data-action="open" type="button" aria-label="查看详情"><i data-lucide="chevron-right"></i></button></div></td>
    </tr>`;
  }).join("");

  $("#resultCount").textContent = `${filtered.length} 款`;
  $("#footerSummary").textContent = `显示 ${filtered.length} 条线索`;
  $("#emptyState").hidden = filtered.length !== 0;
  $("table").hidden = filtered.length === 0;
  updateCounters();
  renderRadar();
  updateRealMetrics(filtered);
  lucide.createIcons();
}

function bubbleColor(game) {
  if (game.release === "已发行") return "#138a63";
  if (game.release === "抢先体验") return "#d18b28";
  return "#4f79a6";
}

function getRadarGames() {
  const base = getFilteredGames();
  const narrowed = base.filter((game) => {
    if (state.radarNewOnly && !isHotNew(game)) return false;
    if (state.radarCrossOnly && (game.serverCount || 0) < 2) return false;
    if (game.activePlayers < state.radarMinActive) return false;
    return true;
  });
  const displayed = state.radarLimit === "all" ? narrowed : narrowed.slice(0, Number(state.radarLimit));
  return { base, narrowed, displayed };
}

function renderRadar() {
  const { base, narrowed, displayed } = getRadarGames();
  const listRanks = new Map(base.map((game, index) => [game.id, index + 1]));
  const bubbles = $("#radarBubbles");
  const activeScale = (game) => Math.log10(Math.max(0, game.activePlayers) + 1);
  const activeValues = displayed.length ? displayed.map(activeScale) : [0];
  const minActive = Math.min(...activeValues);
  const maxActive = Math.max(...activeValues);
  const activeRange = Math.max(1, maxActive - minActive);
  const axisX = $("#radarCanvas .axis-x");
  const sortLabels = { growth: dataHistoryDays >= 7 ? "7 日在线增幅" : "跨区与榜单信号", market: "跨区与榜单信号", active: "实时在线人数", followers: "评价数", rank: "榜单排名", category: "类型榜排名", release: "上线日期" };
  const sortLabel = sortLabels[state.sort] || "当前列表顺序";
  axisX.innerHTML = `列表优先级 <i data-lucide="arrow-right"></i>`;
  $("#radarDescription").textContent = `横轴保持列表“${sortLabel}”顺序，纵轴按在线人数对数刻度展开，气泡大小代表评价数量。`;
  $(".priority-heading span").textContent = "列表前列";
  $(".priority-heading strong").textContent = `按${sortLabel}排序`;
  $("#radarMethodText").textContent = "雷达筛选只缩小可视候选，不改变完整列表；角标始终保留游戏在当前列表中的原始优先级。";
  bubbles.innerHTML = displayed.map((game, index) => {
    const signal = displaySignal(game);
    const listRank = listRanks.get(game.id) || index + 1;
    const left = displayed.length <= 1 ? 50 : 8 + ((displayed.length - index - 1) / (displayed.length - 1)) * 84;
    const bottom = 8 + ((activeScale(game) - minActive) / activeRange) * 84;
    const size = index >= 12 ? 40 : 46 + Math.min(22, Math.log10(game.followers / 10000 + 1) * 13);
    const growthDetail = hasGrowth(game) ? `${game.playerGrowth >= 0 ? "+" : ""}${game.playerGrowth.toFixed(1)}%` : `积累 ${game.historyDays || 1}/7 天`;
    return `<button class="game-bubble ${index >= 12 ? "secondary" : ""} ${index === 0 ? "top-priority" : ""}" data-radar-id="${game.id}" type="button" aria-label="查看 ${game.title}" style="left:${left}%;bottom:${bottom}%;--bubble-size:${size}px;--bubble-color:${bubbleColor(game)}">
      <img src="${imageFor(game)}" alt="" />
      <span class="bubble-growth">#${listRank}</span>
      <span class="bubble-label">${game.title}</span>
      <span class="bubble-tooltip"><strong>${game.title}</strong><span>列表优先级 <b>#${listRank}</b></span><span>当前在线 <b>${game.activePlayers.toLocaleString("zh-CN")}</b></span><span>7 日趋势 <b>${growthDetail}</b></span><span>${signal.name} <b>${signal.rank < 999 ? `#${signal.rank}` : "—"}</b></span></span>
    </button>`;
  }).join("");
  $("#radarCount").textContent = displayed.length < narrowed.length ? `显示 ${displayed.length} / ${narrowed.length}` : `${displayed.length} 个候选`;
  $("#radarEmpty").hidden = displayed.length !== 0;
  $("#priorityList").innerHTML = displayed.slice(0, 4).map((game, index) => `
    <button class="priority-item" data-priority-id="${game.id}" type="button">
      <span class="priority-order ${index < 3 ? "top" : ""}">${String(listRanks.get(game.id) || index + 1).padStart(2, "0")}</span>
      <img src="${imageFor(game)}" alt="" />
      <span class="priority-info"><strong>${game.title}</strong><small><span>${game.activePlayers.toLocaleString("zh-CN")} 在线</span><b>${displaySignal(game).name}</b></small></span>
    </button>`).join("") || `<div class="priority-empty">暂无候选</div>`;
}

function updateCounters() {
  const favorites = games.filter((game) => game.saved).length;
  const following = games.filter((game) => game.stage === "following").length;
  $("#favoriteCount").textContent = favorites;
  $("#followingCount").textContent = following;
  $("#metricFollowing").textContent = following;
  $("#monitorCount").textContent = monitors.length;
  const filterCount = state.genres.size + (state.score > 0 ? 1 : 0) + (state.release !== "all" ? 1 : 0);
  $("#filterCount").textContent = filterCount;
  $("#filterCount").hidden = filterCount === 0;
}

function updateRealMetrics(filtered) {
  $("#capturedCount").textContent = games.length;
  const measured = games.filter(hasGrowth);
  $("#trendCount").textContent = measured.length ? measured.filter((game) => game.playerGrowth >= 50).length : "—";
  $("#freshBadge").textContent = realDataLoaded ? `LIVE · ${games.length} 款已入库` : "LIVE · 演示数据";
  const fastest = [...games].sort((a, b) => b.rise - a.rise)[0];
  $("#fastestRise").textContent = fastest?.rise ? `+${fastest.rise}` : "—";
  $("#fastestGame").textContent = fastest?.rise
    ? `《${fastest.title}》· ${fastest.sourceName}`
    : hasPreviousSnapshot ? "本次暂无排名上升" : "等待第二次快照";
  $("#capturedNote").textContent = realDataLoaded ? "最近一次同步入库" : "当前使用演示数据";
  $("#trendNote").textContent = measured.length ? "基于连续 7 日每日快照" : "积累满 7 天后可计算";
  $("#followingNote").textContent = followingNoteText();

  const trendCandidates = measured.length
    ? measured.filter((game) => game.playerGrowth >= 50).length
    : games.filter((game) => isHotNew(game) || game.isUpcomingBoard || hasSource(game, "upcoming")).length;
  const boardBadges = $$(".board-tab b");
  if (boardBadges[0]) boardBadges[0].textContent = trendCandidates;
  if (boardBadges[1]) boardBadges[1].textContent = games.length;

  const counts = {
    all: games.length,
    new: games.filter(isHotNew).length,
    upcoming: games.filter((game) => game.isUpcomingBoard || hasSource(game, "upcoming") || game.release === "即将发行").length,
    seller: games.filter((game) => game.isSellerBoard || hasSource(game, "seller") || game.countryCount > 0).length,
    online: games.length,
    regional: games.filter((game) => game.serverCount >= 2).length,
    category: `${categoryOptions.length}类`,
  };
  Object.entries(counts).forEach(([source, count]) => {
    const badge = $(`.nav-item[data-source="${source}"] b`);
    if (badge) badge.textContent = count;
  });
}

function followingNoteText() {
  const following = games.filter((game) => game.stage === "following").length;
  return following ? "已加入人工评估队列" : "收藏线索后可标记跟进";
}

function setSource(source) {
  state.source = source;
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.source === source));
  const [title, context, description] = sourceMeta[source];
  $("#breadcrumb").textContent = title;
  $("#pageTitle").textContent = title === "综合机会榜" ? "欧美新游趋势" : title;
  $("#pageDescription").textContent = description;

  if (source === "intel") {
    $("#metricsBand").hidden = true;
    $("#listView").hidden = true;
    $("#radarView").hidden = true;
    $("#intelView").hidden = false;
    $(".view-switch").hidden = true;
    $("#syncButton").hidden = true;
    $("#createMonitorButton").hidden = true;
    $("#searchInput").placeholder = "搜索资讯标题、来源或关联游戏";
    renderContent();
    loadContentData();
    closeMobileSidebar();
    return;
  }

  $("#metricsBand").hidden = false;
  $("#intelView").hidden = true;
  $(".view-switch").hidden = false;
  $("#syncButton").hidden = false;
  $("#createMonitorButton").hidden = false;
  $("#listView").hidden = state.viewMode !== "list";
  $("#radarView").hidden = state.viewMode !== "radar";
  $("#searchInput").placeholder = "搜索游戏、发行商、App ID 或标签";
  if (source === "category") state.sort = "category";
  else if (source === "online") state.sort = "active";
  else if (["new", "seller", "regional"].includes(source)) state.sort = "market";
  else if (source === "upcoming") state.sort = "rank";
  else state.sort = state.board === "trending" ? "growth" : "active";
  $("#sortSelect").value = state.sort;
  $("#contextLabel").textContent = context;
  $("#categoryControl").hidden = source !== "category";
  $("#serverControl").hidden = source !== "regional";
  updateCountryOptions();
  $(".table-tools").classList.toggle("category-mode", source === "category");
  $(".table-tools").classList.toggle("regional-mode", source === "regional");
  $(".board-tabs").hidden = source !== "all";
  updateBoardHeading();
  renderRows();
  closeMobileSidebar();
}

function updateBoardHeading() {
  if (["favorites", "following", "monitors"].includes(state.source)) {
    const headings = {
      favorites: ["已收藏线索", "保存在当前浏览器中的收藏游戏；每日数据更新不会清除。", "已收藏", `${games.filter((game) => game.saved).length} 条线索`],
      following: ["待跟进线索", "已经进入人工评估队列、需要继续推动的游戏。", "待跟进", `${games.filter((game) => game.stage === "following").length} 条线索`],
      monitors: ["监控命中游戏", "按你保存在当前浏览器中的榜单、增长与标签条件自动筛选。", "监控命中", `${monitors.length} 条规则`],
    };
    const [title, description, context, hint] = headings[state.source];
    $("#boardTitle").textContent = title;
    $("#boardDescription").textContent = description;
    $("#contextLabel").textContent = context;
    $("#contextHint").textContent = hint;
    return;
  }
  if (state.source === "category") {
    const selectedName = state.category === "all" ? "精选类型" : categoryNames.get(Number(state.category));
    $("#boardTitle").textContent = `${selectedName}热销榜`;
    $("#boardDescription").textContent = "每类仅保留美国区热销前 50，选择类型即可缩小结果，不增加额外页面。";
    $("#contextLabel").textContent = state.category === "all" ? "精选类型" : `${selectedName}热销`;
    $("#contextHint").textContent = "Steam 美国区标签热销";
    return;
  }
  if (state.source === "regional") {
    if (state.server === "all") {
      $("#boardTitle").textContent = "跨区热销榜";
      $("#boardDescription").textContent = "仅显示同时进入至少 2 个 WePlay 区服的游戏；按区服覆盖、国家覆盖与最佳排名排列。";
      $("#contextLabel").textContent = "跨区总览";
      $("#contextHint").textContent = "至少 2 个区服上榜";
      return;
    }
    const server = serverGroups.find((item) => item.id === state.server);
    const countryName = state.country === "all" ? null : countryNames.get(state.country);
    $("#boardTitle").textContent = `${countryName || server?.name || "区服"}热销榜`;
    $("#boardDescription").textContent = countryName
      ? `查看 ${countryName} Steam 热销排名，所属 ${server?.name || "区服"}。`
      : `${server?.name || "区服"}以 ${countryNames.get(server?.primary) || "代表国家"}为主，并保留组内各国家的独立排名。`;
    $("#contextLabel").textContent = countryName || server?.name || "区服热销";
    $("#contextHint").textContent = countryName ? server?.name || "国家榜单" : `${server?.countries.length || 0} 个国家榜单`;
    return;
  }
  const sourceHeadings = {
    new: ["热门新品与新游热销", "Steam 新品榜加上 90 天内已经进入国家热销榜的新发行游戏。", "新品与新游", "多榜单身份"],
    upcoming: ["即将推出榜", "按 Steam 即将推出榜排名查看已公开商店页的候选游戏。", "即将推出", "Steam 官方榜单"],
    seller: ["欧美市场热销榜", "全球热销是 14 个监测国家榜单的并集；进入任意一个国家即可收录。", "监测市场热销", "至少 1 个国家上榜"],
    online: ["当前在线榜", "按 Steam 当前活跃玩家规模比较全部已收录候选。", "当前在线", "实时玩家信号"],
  };
  if (sourceHeadings[state.source]) {
    const [title, description, context, hint] = sourceHeadings[state.source];
    $("#boardTitle").textContent = title;
    $("#boardDescription").textContent = description;
    $("#contextLabel").textContent = context;
    $("#contextHint").textContent = hint;
    return;
  }
  $("#boardTitle").textContent = state.board === "trending" ? "值得关注的趋势新游" : "当前热门游戏";
  $("#boardDescription").textContent = state.board === "trending"
    ? "按 7 日活跃玩家增幅排序，优先发现正在形成热度的新游戏。"
    : "按当前活跃玩家规模排序，观察已经形成稳定市场热度的游戏。";
  $("#contextLabel").textContent = sourceMeta[state.source]?.[1] || "全部榜单";
  $("#contextHint").textContent = state.source === "all" ? "每日同步更新" : "Steam 公开榜单";
}

function updateCountryOptions() {
  const server = serverGroups.find((item) => item.id === state.server);
  if (!server) state.country = "all";
  const options = server?.countries || [];
  $("#countrySelect").innerHTML = `<option value="all">全部国家</option>${options.map(([code, name]) => `<option value="${code}">${name}</option>`).join("")}`;
  $("#countrySelect").value = state.country;
  $("#countryControl").hidden = state.source !== "regional" || state.server === "all";
}

function setBoard(board) {
  state.board = board;
  state.sort = board === "trending" ? "growth" : "active";
  $("#sortSelect").value = state.sort;
  $$(".board-tab").forEach((button) => button.classList.toggle("active", button.dataset.board === board));
  updateBoardHeading();
  renderRows();
}

function openDrawer(id) {
  const game = games.find((item) => item.id === Number(id));
  if (!game) return;
  state.selectedId = game.id;
  const signal = displaySignal(game);
  const growthReady = hasGrowth(game);
  const growthText = growthReady ? `${game.playerGrowth >= 0 ? "+" : ""}${Math.round(game.playerGrowth)}%` : `${game.historyDays || 1}/7天`;
  const reviewGrowthText = Number.isFinite(game.followerGrowth) ? `+${game.followerGrowth}%` : "积累中";
  const boardLabels = { top_sellers: "热销榜", new_releases: "新品榜", popular_new: "热门新品", coming_soon: "即将推出" };
  const boardHistory = [...(game.boards || [])].sort((a, b) => Number(b.board === "top_sellers") - Number(a.board === "top_sellers") || a.rank - b.rank).slice(0, 8).map((board) => {
    const country = countryMeta.get(board.region);
    const boardName = board.board === "top_sellers"
      ? `${country?.name || board.region}热销`
      : boardLabels[board.board] || (board.board.startsWith("tag_") ? `${categoryNames.get(Number(board.board.slice(4))) || "类型"}热销` : "Steam 榜单");
    const marketName = board.region === "GLOBAL" ? "全球" : country?.serverName || board.region;
    return `
    <div class="history-item"><span class="history-rank">#${board.rank}</span><span><strong>${boardName}</strong><small>${marketName} · 每日快照</small></span><b class="history-rise">${board.rise ? `↑ ${board.rise}` : "已收录"}</b></div>`;
  }).join("") || `<div class="history-item"><span class="history-rank">#${game.rank}</span><span><strong>${game.sourceName}</strong><small>Steam 每日快照</small></span><b class="history-rise">已收录</b></div>`;
  $("#drawerContent").innerHTML = `
    <div class="drawer-hero">
      <img src="${imageFor(game)}" alt="${game.title} 游戏封面" />
      <button class="icon-button drawer-close" data-drawer-action="close" type="button" aria-label="关闭"><i data-lucide="x"></i></button>
      <div class="drawer-title"><div class="eyebrow">${signal.name} · 当前 ${signal.rank < 999 ? `#${signal.rank}` : "已收录"}</div><h2>${game.title}</h2><p>${game.developer} · Steam App ${game.id}</p></div>
    </div>
    <div class="drawer-body">
      <div class="drawer-actions">
        <button class="button ${game.saved ? "secondary" : "primary"}" data-drawer-action="save" type="button"><i data-lucide="${game.saved ? "bookmark-check" : "bookmark-plus"}"></i>${game.saved ? "已收藏" : "收藏线索"}</button>
        <button class="button ${game.stage === "following" ? "secondary" : "primary"}" data-drawer-action="follow" type="button"><i data-lucide="circle-dot-dashed"></i>${game.stage === "following" ? "跟进中" : "标记待跟进"}</button>
        <a class="icon-button" href="${steamUrl(game)}" target="_blank" rel="noreferrer" aria-label="打开 Steam"><i data-lucide="external-link"></i></a>
      </div>
      <div class="signal-summary"><div class="big-score growth">${growthText}</div><div><strong>${growthReady ? "7 日趋势信号" : "真实趋势积累中"}</strong><p>${game.insight}</p></div></div>
      <section class="drawer-section">
        <div class="drawer-section-heading"><h3>客观趋势信号</h3><span>最近 7 日</span></div>
        <div class="signal-bars">
          <div class="signal-bar"><label>在线增幅</label><span><i style="width:${growthReady ? Math.min(100, Math.max(0, game.playerGrowth) / 2) : 6}%"></i></span><b>${growthReady ? `${game.playerGrowth >= 0 ? "+" : ""}${game.playerGrowth.toFixed(1)}%` : "积累中"}</b></div>
          <div class="signal-bar"><label>评价增长</label><span><i style="width:${Number.isFinite(game.followerGrowth) ? Math.min(100, Math.max(0, game.followerGrowth) * 4) : 6}%"></i></span><b>${reviewGrowthText}</b></div>
          <div class="signal-bar"><label>榜单位置</label><span><i style="width:${Math.max(8, 100 - signal.rank * 2)}%"></i></span><b>#${signal.rank}</b></div>
        </div>
      </section>
      <section class="drawer-section">
        <div class="drawer-section-heading"><h3>榜单轨迹</h3><span>近 7 日</span></div>
        <div class="rank-history">
          ${boardHistory}
        </div>
      </section>
      <section class="drawer-section">
        <div class="drawer-section-heading"><h3>建议关注</h3><span>自动生成</span></div>
        <ul class="insight-list"><li>当前已进入 ${signal.name}，建议结合后续每日快照确认排名持续性。</li><li>${game.tags[0]} 类型可加入同类游戏对照组，比较当前在线和评价增长。</li><li>公开评价 ${formatFollowers(game.followers)} 条${game.reviewPercent != null ? `，好评率 ${game.reviewPercent}%` : ""}；内部匹配仍需人工评估。</li></ul>
      </section>
      <section class="drawer-section">
        <div class="drawer-section-heading"><h3>基础信息</h3></div>
        <div class="drawer-meta"><div><small>上线日期</small><strong>${displayReleaseDate(game)}${game.isNew && game.productType !== "demo" ? " · 新游" : ""}</strong></div><div><small>开发商</small><strong>${game.developer}</strong></div><div><small>主要标签</small><strong>${game.tags.join(" / ")}</strong></div><div><small>产品类型</small><strong>${game.productType === "demo" ? "Demo · 试玩版本" : game.release}</strong></div><div><small>区服覆盖</small><strong>${game.serverCount || 0} 个区服</strong></div><div><small>国家覆盖</small><strong>${game.countryCount || 0} 个国家</strong></div></div>
      </section>
    </div>`;
  $("#detailDrawer").classList.add("open");
  $("#detailDrawer").setAttribute("aria-hidden", "false");
  $("#overlay").hidden = false;
  document.body.style.overflow = "hidden";
  lucide.createIcons();
}

function closeDrawer() {
  state.selectedId = null;
  $("#detailDrawer").classList.remove("open");
  $("#detailDrawer").setAttribute("aria-hidden", "true");
  if (!$("#sidebar").classList.contains("open")) $("#overlay").hidden = true;
  document.body.style.overflow = "";
}

function toggleSaved(id) {
  const game = games.find((item) => item.id === Number(id));
  game.saved = !game.saved;
  persistGame(game);
  renderRows();
  if (state.selectedId === game.id) openDrawer(game.id);
  showToast(game.saved ? `已收藏《${game.title}》` : `已取消收藏《${game.title}》`);
}

function cycleStage(id) {
  const game = games.find((item) => item.id === Number(id));
  const stages = ["new", "following", "done"];
  game.stage = stages[(stages.indexOf(game.stage) + 1) % stages.length];
  persistGame(game);
  renderRows();
  showToast(`《${game.title}》已更新为“${stageLabel(game.stage)}”`);
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i data-lucide="circle-check"></i><span>${message}</span>`;
  $("#toastRegion").appendChild(toast);
  lucide.createIcons();
  setTimeout(() => toast.remove(), 2600);
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
  })[character]);
}

function safeExternalUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
  } catch (error) {
    return "#";
  }
}

function contentPlatformLabel(platform) {
  if (platform === "youtube") return "YouTube";
  if (platform === "tiktok") return "TikTok";
  return "社区资讯";
}

function contentIcon(platform) {
  if (platform === "youtube") return "youtube";
  if (platform === "tiktok") return "music-2";
  return "messages-square";
}

function formatContentTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "时间未知";
  return date.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function contentRegions(item) {
  return String(item.region_codes || "").split(",").map((value) => value.trim()).filter(Boolean);
}

function contentHeatCompare(a, b) {
  const regionDifference = contentRegions(b).length - contentRegions(a).length;
  if (regionDifference) return regionDifference;
  const viewDifference = Number(b.view_count || 0) - Number(a.view_count || 0);
  if (viewDifference) return viewDifference;
  return Date.parse(b.published_at || 0) - Date.parse(a.published_at || 0);
}

function sourceState(source) {
  const labels = {
    active: ["已接入", "active"],
    pending: ["待同步", "pending"],
    needs_key: ["需密钥", "pending"],
    requires_auth: ["需授权", "auth"],
    local_only: ["本地关注", "pending"],
    error: ["异常", "error"],
  };
  return labels[source?.status] || ["待配置", "pending"];
}

function renderContentSources() {
  const mergedSources = [...contentSources];
  localContentSources.forEach((source) => {
    if (!mergedSources.some((item) => item.platform === source.platform && item.locator === source.locator)) mergedSources.push(source);
  });
  const forum = mergedSources.find((source) => source.platform === "forum");
  const youtube = mergedSources.filter((source) => source.platform === "youtube");
  const youtubeTrending = youtube.find((source) => source.locator === youtubeTrendingLocator);
  const youtubeCreators = youtube.filter((source) => source.locator !== youtubeTrendingLocator);
  const tiktok = mergedSources.filter((source) => source.platform === "tiktok");
  const tiktokState = tiktok[0] || { status: "requires_auth" };
  const cards = [
    {
      platform: "forum",
      title: forum?.name || "ResetEra 游戏头条",
      detail: forum?.last_synced_at ? `最近同步 ${formatContentTime(forum.last_synced_at)}` : "公开 RSS · 每日更新",
      state: sourceState(forum),
    },
    {
      platform: "youtube",
      title: `YouTube 游戏热门 · ${youtubeRegions.length || 5} 区`,
      detail: youtubeConfigured
        ? `官方 Data API · 每日更新${youtubeCreators.length ? ` · ${youtubeCreators.length} 个博主` : ""}`
        : `配置 API Key 后启用${youtubeCreators.length ? ` · 已保存 ${youtubeCreators.length} 个博主` : ""}`,
      state: sourceState(youtubeTrending || { status: youtubeConfigured ? "pending" : "needs_key" }),
    },
    {
      platform: "tiktok",
      title: tiktok.length ? `TikTok 创作者 · ${tiktok.length} 个` : "TikTok 创作者",
      detail: "官方接口需要每位创作者授权",
      state: sourceState(tiktokState),
    },
  ];
  $("#contentSourceStrip").innerHTML = cards.map((card) => `
    <div class="source-status-item">
      <span class="source-status-icon ${card.platform}"><i data-lucide="${contentIcon(card.platform)}"></i></span>
      <span><strong>${escapeHTML(card.title)}</strong><small>${escapeHTML(card.detail)}</small></span>
      <b class="source-state ${card.state[1]}">${card.state[0]}</b>
    </div>`).join("");
}

function getFilteredContent() {
  const query = state.query.trim().toLowerCase();
  const filtered = contentItems.filter((item) => {
    if (state.intelPlatform !== "all" && item.platform !== state.intelPlatform) return false;
    if (state.intelNewOnly && !item.is_new_game) return false;
    if (query && ![item.title, item.summary, item.author, item.source_name, item.matched_game].some((value) => String(value || "").toLowerCase().includes(query))) return false;
    return true;
  });
  return filtered.sort(state.intelSort === "hot"
    ? contentHeatCompare
    : (a, b) => Date.parse(b.published_at || 0) - Date.parse(a.published_at || 0));
}

function renderContent() {
  if (!$("#intelFeed")) return;
  const filtered = getFilteredContent();
  const signalCount = contentItems.filter((item) => item.is_new_game).length;
  $("#intelFeed").innerHTML = filtered.map((item) => {
    const articleUrl = safeExternalUrl(item.url);
    const sourceLabel = item.source_name || contentPlatformLabel(item.platform);
    const regions = contentRegions(item);
    const summary = item.summary ? `<p>${escapeHTML(item.summary)}</p>` : "";
    const match = item.matched_appid
      ? `<a class="intel-game-match" href="https://store.steampowered.com/app/${Number(item.matched_appid)}" target="_blank" rel="noreferrer"><i data-lucide="gamepad-2"></i>${escapeHTML(item.matched_game)}<i data-lucide="external-link"></i></a>`
      : "";
    const thumbnail = item.thumbnail
      ? `<img class="intel-thumbnail" src="${escapeHTML(safeExternalUrl(item.thumbnail))}" alt="" loading="lazy" />`
      : `<span class="intel-source-mark ${escapeHTML(item.platform)}"><i data-lucide="${contentIcon(item.platform)}"></i></span>`;
    const metrics = [
      regions.length ? `<span class="intel-metric regions" title="热门地区：${escapeHTML(regions.join(" / "))}"><i data-lucide="globe-2"></i>${regions.length} 区热门</span>` : "",
      Number(item.view_count) ? `<span class="intel-metric" title="播放量"><i data-lucide="eye"></i>${formatFollowers(Number(item.view_count))}</span>` : "",
      Number(item.like_count) ? `<span class="intel-metric" title="点赞数"><i data-lucide="thumbs-up"></i>${formatFollowers(Number(item.like_count))}</span>` : "",
      Number(item.comment_count) ? `<span class="intel-metric" title="评论数"><i data-lucide="message-circle"></i>${formatFollowers(Number(item.comment_count))}</span>` : "",
    ].join("");
    return `
      <article class="intel-item">
        ${thumbnail}
        <div class="intel-item-main">
          <div class="intel-item-meta"><span>${escapeHTML(contentPlatformLabel(item.platform))}</span><strong>${escapeHTML(sourceLabel)}</strong><time>${formatContentTime(item.published_at)}</time></div>
          <a class="intel-item-title" href="${escapeHTML(articleUrl)}" target="_blank" rel="noreferrer">${escapeHTML(item.title)}<i data-lucide="external-link"></i></a>
          ${summary}
          <div class="intel-item-signals">${metrics}${item.is_new_game ? '<span class="intel-signal"><i data-lucide="sparkles"></i>新游信号</span>' : ""}${match}</div>
        </div>
      </article>`;
  }).join("");
  $("#intelResultCount").textContent = `${filtered.length} 条`;
  $("#contentCount").textContent = signalCount;
  if (state.source === "intel") $("#freshBadge").textContent = `DAILY · ${signalCount} 条新游信号`;
  $("#intelEmpty").hidden = filtered.length !== 0;
  $("#intelFooterSummary").textContent = contentItems.length
    ? `已收录 ${contentItems.length} 条 · ${signalCount} 条新游信号`
    : "等待首次资讯同步";
  renderContentSources();
  lucide.createIcons();
}

async function readContentStatus() {
  const payload = await fetchJSON("data/status.json", "/api/content/status");
  return dataMode === "static" ? payload.content || { status: "completed" } : payload;
}

async function waitForContentSync(maxPolls = 60) {
  for (let index = 0; index < maxPolls; index += 1) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const status = await readContentStatus();
    if (!status.running && status.status !== "running") return status;
  }
  throw new Error("资讯同步等待超时");
}

async function loadContentData({ waitIfRunning = true } = {}) {
  try {
    const payload = await fetchJSON("data/content.json", "/api/content");
    contentItems = payload.items || [];
    contentSources = payload.sources || [];
    youtubeConfigured = Boolean(payload.youtube_configured);
    youtubeRegions = payload.youtube_regions || [];
    youtubeTrendingLocator = payload.youtube_trending_locator || youtubeTrendingLocator;
    if (payload.updated_at) $("#contentUpdatedTime").textContent = formatContentTime(payload.updated_at);
    renderContent();
    if (dataMode === "api" && payload.running && waitIfRunning) {
      $("#intelFooterSummary").textContent = "资讯正在同步，当前内容可以继续查看";
      await waitForContentSync();
      await loadContentData({ waitIfRunning: false });
    }
  } catch (error) {
    $("#intelFooterSummary").textContent = "资讯源暂时无法连接";
    renderContent();
  }
}

function resetFilters() {
  state.query = "";
  state.genres.clear();
  state.score = 0;
  state.release = "all";
  $("#searchInput").value = "";
  $$("#genreFilters input").forEach((input) => input.checked = false);
  $("#scoreRange").value = 0;
  $("#scoreValue").textContent = "0%";
  $("#releaseFilter").value = "all";
  renderRows();
}

function closeMobileSidebar() {
  $("#sidebar").classList.remove("open");
  if (!$("#detailDrawer").classList.contains("open")) $("#overlay").hidden = true;
}

function closeTopMenus() {
  ["notificationMenu", "accountMenu"].forEach((menuId) => {
    $(`#${menuId}`).hidden = true;
  });
  ["notificationButton", "accountButton"].forEach((buttonId) => {
    $(`#${buttonId}`).setAttribute("aria-expanded", "false");
  });
}

function toggleTopMenu(menuId, buttonId) {
  const menu = $(`#${menuId}`);
  const shouldOpen = menu.hidden;
  closeTopMenus();
  if (shouldOpen) {
    menu.hidden = false;
    $(`#${buttonId}`).setAttribute("aria-expanded", "true");
  }
}

function closeMonitorModal() {
  const modal = $("#monitorModal");
  if (modal.open) modal.close();
  $("#monitorForm").reset();
}

function closeCreatorModal() {
  const modal = $("#creatorModal");
  if (modal.open) modal.close();
  $("#creatorForm").reset();
  $("#creatorPlatform").dispatchEvent(new Event("change"));
}

function setDataStatus(label, healthy = true) {
  $("#statusText").innerHTML = `<i class="status-dot ${healthy ? "" : "pending"}"></i>${label}`;
}

async function loadRealData() {
  const payload = await fetchJSON("data/games.json", "/api/games");
  if (!payload.games?.length) return false;

  const previous = new Map(games.map((game) => [game.id, game]));
  games = payload.games.map((game) => mapApiGame(game, previous.get(game.id)));
  realDataLoaded = true;
  hasPreviousSnapshot = Boolean(payload.has_previous_snapshot);
  dataHistoryDays = Number(payload.history_days || 0);
  const updated = payload.updated_at ? new Date(payload.updated_at) : new Date();
  $("#updatedTime").textContent = updated.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });
  $("#notificationSyncTime").textContent = updated.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });
  $("#notificationGameCount").textContent = games.length;
  $("#scheduleText").textContent = dataMode === "static" ? "GitHub Actions 每天 03:00 更新" : "每天 03:00 自动同步";
  $("#sourceHealth").textContent = `${payload.source_count || 0}/${payload.source_expected || 24}`;
  $("#accountSourceHealth").textContent = `${payload.source_count || 0}/${payload.source_expected || 24}`;
  setDataStatus(`Steam 数据已同步 · ${games.length} 款`);
  if ((payload.history_days || 0) < 7 && state.board === "trending" && state.source === "all") {
    $("#boardDescription").textContent = `真实 7 日趋势正在积累（${Math.max(1, payload.history_days || 1)}/7 天），当前按新游身份、区服覆盖、国家覆盖与最佳排名排序。`;
  }
  renderRows();
  return true;
}

async function readSyncStatus() {
  return fetchJSON("data/status.json", "/api/status");
}

async function waitForSync(maxPolls = 120) {
  for (let index = 0; index < maxPolls; index += 1) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const status = await readSyncStatus();
    if (!status.running && status.status !== "running") return status;
  }
  throw new Error("同步等待超时");
}

async function bootstrapData() {
  try {
    const loaded = await loadRealData();
    const status = await readSyncStatus();
    if (dataMode === "api" && status.running) {
      setDataStatus(status.sync_due ? "正在补更今日 Steam 数据" : "Steam 数据同步中", false);
      await waitForSync();
      await loadRealData();
      return;
    }
    if (loaded) {
      setDataStatus(dataMode === "static" ? `每日公开数据可用 · ${games.length} 款` : (status.sync_due ? "今日数据待补更" : `Steam 数据已同步 · ${games.length} 款`), dataMode === "static" || !status.sync_due);
      return;
    }
    setDataStatus("等待首次同步", false);
  } catch (error) {
    setDataStatus("暂用本地演示数据", false);
  }
}

$$(".nav-item").forEach((button) => button.addEventListener("click", () => setSource(button.dataset.source)));
$$(".board-tab").forEach((button) => button.addEventListener("click", () => setBoard(button.dataset.board)));

$("#searchInput").addEventListener("input", (event) => {
  state.query = event.target.value;
  if (state.source === "intel") renderContent();
  else renderRows();
});

$("#sortSelect").addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderRows();
});

$("#categorySelect").addEventListener("change", (event) => {
  state.category = event.target.value;
  updateBoardHeading();
  renderRows();
});

$("#serverSelect").addEventListener("change", (event) => {
  state.server = event.target.value;
  state.country = "all";
  updateCountryOptions();
  updateBoardHeading();
  renderRows();
});

$("#countrySelect").addEventListener("change", (event) => {
  state.country = event.target.value;
  updateBoardHeading();
  renderRows();
});

$("#radarLimit").addEventListener("change", (event) => {
  state.radarLimit = event.target.value;
  renderRadar();
  lucide.createIcons();
});

$("#radarMinActive").addEventListener("change", (event) => {
  state.radarMinActive = Number(event.target.value);
  renderRadar();
  lucide.createIcons();
});

$("#radarNewOnly").addEventListener("change", (event) => {
  state.radarNewOnly = event.target.checked;
  renderRadar();
  lucide.createIcons();
});

$("#radarCrossOnly").addEventListener("change", (event) => {
  state.radarCrossOnly = event.target.checked;
  renderRadar();
  lucide.createIcons();
});

$("#radarReset").addEventListener("click", () => {
  state.radarLimit = 12;
  state.radarMinActive = 0;
  state.radarNewOnly = false;
  state.radarCrossOnly = false;
  $("#radarLimit").value = "12";
  $("#radarMinActive").value = "0";
  $("#radarNewOnly").checked = false;
  $("#radarCrossOnly").checked = false;
  renderRadar();
  lucide.createIcons();
});

$("#filterButton").addEventListener("click", () => {
  $("#filtersPanel").hidden = !$("#filtersPanel").hidden;
});

$$("#genreFilters input").forEach((input) => input.addEventListener("change", () => {
  input.checked ? state.genres.add(input.value) : state.genres.delete(input.value);
  renderRows();
}));

$("#scoreRange").addEventListener("input", (event) => {
  state.score = Number(event.target.value);
  $("#scoreValue").textContent = `${state.score}%`;
  renderRows();
});

$("#releaseFilter").addEventListener("change", (event) => {
  state.release = event.target.value;
  renderRows();
});

$("#resetFilters").addEventListener("click", resetFilters);
$("#emptyReset").addEventListener("click", resetFilters);

$("#gameRows").addEventListener("click", (event) => {
  const row = event.target.closest("tr");
  if (!row) return;
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action) event.stopPropagation();
  if (action === "steam") return;
  if (action === "save") toggleSaved(row.dataset.id);
  else if (action === "stage") cycleStage(row.dataset.id);
  else openDrawer(row.dataset.id);
});

$("#gameRows").addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && !event.target.closest("button, a")) openDrawer(event.target.closest("tr")?.dataset.id);
});

$("#radarBubbles").addEventListener("click", (event) => {
  const bubble = event.target.closest("[data-radar-id]");
  if (bubble) openDrawer(bubble.dataset.radarId);
});

$("#priorityList").addEventListener("click", (event) => {
  const item = event.target.closest("[data-priority-id]");
  if (item) openDrawer(item.dataset.priorityId);
});

$$(".view-switch button").forEach((button) => button.addEventListener("click", () => {
  $$(".view-switch button").forEach((item) => item.classList.toggle("active", item === button));
  state.viewMode = button.dataset.mode;
  $("#radarView").hidden = button.dataset.mode !== "radar";
  $("#listView").hidden = button.dataset.mode !== "list";
}));

$("#priorityMore").addEventListener("click", () => {
  const listButton = $('.view-switch button[data-mode="list"]');
  listButton.click();
});

$("#drawerContent").addEventListener("click", (event) => {
  const action = event.target.closest("[data-drawer-action]")?.dataset.drawerAction;
  if (action === "close") closeDrawer();
  if (action === "save") toggleSaved(state.selectedId);
  if (action === "follow") {
    const game = games.find((item) => item.id === state.selectedId);
    game.stage = game.stage === "following" ? "new" : "following";
    persistGame(game);
    renderRows();
    openDrawer(game.id);
    showToast(game.stage === "following" ? `《${game.title}》已加入待跟进` : `《${game.title}》已移出待跟进`);
  }
});

$("#overlay").addEventListener("click", () => {
  closeDrawer();
  closeMobileSidebar();
});

$("#syncButton").addEventListener("click", async () => {
  const button = $("#syncButton");
  button.classList.add("spin");
  button.disabled = true;
  button.querySelector("span").textContent = "同步中";
  try {
    if (dataMode === "static") {
      await Promise.all([loadRealData(), loadContentData({ waitIfRunning: false })]);
      showToast("已刷新公开数据；云端每天 03:00 自动采集");
      return;
    }
    const response = await fetch("/api/sync", { method: "POST" });
    if (!response.ok) throw new Error(`Sync API ${response.status}`);
    showToast("Steam 每日同步已开始");
    setDataStatus("Steam 数据同步中", false);
    await waitForSync();
    await loadRealData();
    showToast("Steam 榜单与每日快照已更新");
  } catch (error) {
    showToast("同步未完成，请稍后重试");
    setDataStatus(realDataLoaded ? "上次同步数据可用" : "同步暂不可用", realDataLoaded);
  } finally {
    button.classList.remove("spin");
    button.disabled = false;
    button.querySelector("span").textContent = dataMode === "static" ? "刷新数据" : "同步榜单";
  }
});

$("#createMonitorButton").addEventListener("click", () => {
  closeTopMenus();
  $("#monitorModal").showModal();
});
$$('[data-monitor-close]').forEach((button) => button.addEventListener("click", closeMonitorModal));
$("#monitorModal").addEventListener("cancel", (event) => {
  event.preventDefault();
  closeMonitorModal();
});
$("#monitorModal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) closeMonitorModal();
});
$("#monitorForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get("name") || "").trim();
  if (!name) return;
  const monitor = {
    id: `monitor-${Date.now()}`,
    name,
    source: String(form.get("source") || "热门新品"),
    condition: String(form.get("condition") || "进入前 50 名"),
    tags: String(form.get("tags") || "").trim(),
    createdAt: new Date().toISOString(),
  };
  monitors.push(monitor);
  writeLocalJSON(storageKeys.monitors, monitors);
  closeMonitorModal();
  updateCounters();
  const matched = games.filter((game) => monitorMatchesGame(monitor, game)).length;
  showToast(`监控“${name}”已创建 · 当前命中 ${matched} 款`);
});

$("#intelPlatformFilter").addEventListener("change", (event) => {
  state.intelPlatform = event.target.value;
  renderContent();
});

$("#intelSort").addEventListener("change", (event) => {
  state.intelSort = event.target.value;
  renderContent();
});

$("#intelNewOnly").addEventListener("change", (event) => {
  state.intelNewOnly = event.target.checked;
  renderContent();
});

$("#contentSyncButton").addEventListener("click", async () => {
  const button = $("#contentSyncButton");
  button.classList.add("spin");
  button.disabled = true;
  button.querySelector("span").textContent = "更新中";
  try {
    if (dataMode === "static") {
      await loadContentData({ waitIfRunning: false });
      showToast("已刷新资讯；云端每天 03:00 自动更新");
      return;
    }
    const response = await fetch("/api/content/sync", { method: "POST" });
    if (!response.ok) throw new Error(`Content sync API ${response.status}`);
    $("#intelFooterSummary").textContent = "正在读取最新资讯";
    await waitForContentSync();
    await loadContentData({ waitIfRunning: false });
    showToast("创作者与社区资讯已更新");
  } catch (error) {
    showToast("资讯更新未完成，请稍后重试");
  } finally {
    button.classList.remove("spin");
    button.disabled = false;
    button.querySelector("span").textContent = dataMode === "static" ? "刷新资讯" : "更新资讯";
  }
});

$("#addCreatorButton").addEventListener("click", () => $("#creatorModal").showModal());
$$("[data-creator-close]").forEach((button) => button.addEventListener("click", closeCreatorModal));
$("#creatorModal").addEventListener("cancel", (event) => {
  event.preventDefault();
  closeCreatorModal();
});
$("#creatorModal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) closeCreatorModal();
});
$("#creatorPlatform").addEventListener("change", (event) => {
  const tiktok = event.target.value === "tiktok";
  $("#creatorHelp").textContent = tiktok
    ? "可以先保存 TikTok 创作者名单；官方接口需要创作者本人授权后才能自动读取视频。"
    : "添加 YouTube 频道主页或频道 ID，先保存在当前浏览器的关注名单。";
  $("#creatorNote").innerHTML = tiktok
    ? '<i data-lucide="shield-check"></i><span>不会使用不稳定的页面抓取；授权完成前会明确显示“需授权”。</span>'
    : '<i data-lucide="key-round"></i><span>云端自动采集使用 GitHub Actions 机密配置，密钥不会出现在网页中。</span>';
  $("#creatorForm [name='locator']").placeholder = tiktok
    ? "https://tiktok.com/@用户名"
    : "https://youtube.com/@频道名";
  lucide.createIcons();
});
$("#creatorForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const platform = String(form.get("platform") || "");
  const locator = String(form.get("locator") || "").trim();
  const name = String(form.get("name") || "").trim() || locator.replace(/^https?:\/\//, "");
  try {
    if (dataMode === "static") {
      if (!locator) throw new Error("请输入创作者主页或账号");
      if (!localContentSources.some((source) => source.platform === platform && source.locator === locator)) {
        localContentSources.push({
          platform,
          name,
          locator,
          status: platform === "tiktok" ? "requires_auth" : "local_only",
          created_at: new Date().toISOString(),
        });
        writeLocalJSON(storageKeys.contentSources, localContentSources);
      }
      closeCreatorModal();
      renderContentSources();
      lucide.createIcons();
      showToast(platform === "tiktok" ? "TikTok 账号已保存在此浏览器" : "YouTube 频道已加入本地关注名单");
      return;
    }
    const response = await fetch("/api/content/sources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platform,
        name,
        locator,
      }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "来源保存失败");
    closeCreatorModal();
    await loadContentData({ waitIfRunning: false });
    if (platform === "tiktok") showToast("TikTok 创作者已保存，等待官方授权");
    else if (!youtubeConfigured) showToast("YouTube 频道已保存，配置 API Key 后开始同步");
    else {
      showToast("YouTube 频道已添加");
      $("#contentSyncButton").click();
    }
  } catch (error) {
    showToast(error.message || "来源保存失败");
  }
});

$("#notificationButton").addEventListener("click", () => {
  toggleTopMenu("notificationMenu", "notificationButton");
  $("#notificationButton .notification-dot").hidden = true;
});
$("#accountButton").addEventListener("click", () => toggleTopMenu("accountMenu", "accountButton"));
$$("[data-top-action]").forEach((button) => button.addEventListener("click", () => {
  const action = button.dataset.topAction;
  closeTopMenus();
  if (action === "categories") setSource("category");
  if (action === "favorites") setSource("favorites");
  if (action === "status") showToast(`${$("#sourceHealth").textContent} 个 Steam 榜单来源运行正常`);
}));

$("#mobileMenu").addEventListener("click", () => {
  $("#sidebar").classList.add("open");
  $("#overlay").hidden = false;
});

$("#columnsButton").addEventListener("click", () => showToast("当前已显示推荐字段组合"));
$("#sourceSwitcher").addEventListener("click", () => showToast("更多数据源将在下一阶段接入"));

document.addEventListener("click", (event) => {
  if (!event.target.closest(".top-actions")) closeTopMenus();
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    $("#searchInput").focus();
  }
  if (event.key === "Escape") {
    closeTopMenus();
    if ($("#monitorModal").open) closeMonitorModal();
    if ($("#creatorModal").open) closeCreatorModal();
    closeDrawer();
    closeMobileSidebar();
  }
});

renderRows();
lucide.createIcons();
bootstrapData();
loadContentData();
