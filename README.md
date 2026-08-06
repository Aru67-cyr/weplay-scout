# WePlay Scout

面向 WePlay 欧美区服的新游线索工作台。网站发布在 GitHub Pages，GitHub Actions 每天采集 Steam 榜单与游戏资讯并生成静态 JSON；访问网站不需要保持任何本机程序运行。

## 运行方式

- GitHub Pages 托管 `index.html`、`app.js`、`styles.css` 与 `data/*.json`
- GitHub Actions 每天新加坡时间 `03:00` 运行采集并重新发布
- SQLite 只作为 Actions 的历史缓存，不会进入公开网站产物
- 收藏、待跟进、监控规则与本地添加的创作者保存在浏览器 `localStorage`

公开网站不包含登录、共享工作区或推送通知。需要这些能力时再接入独立后端与数据库。

## 当前数据源

- Steam New Releases 与 Coming Soon
- Steam Top Sellers：14 个国家，按美服、法语服、德语服、意大利语服分组
- Steam 类型热销：独立、动作、RPG、策略、模拟、合作、生存、恐怖，每类保留 50 款
- Steam 当前在线人数、价格、折扣、发行日期与公开评价
- ResetEra Gaming Headlines 公开 RSS
- YouTube Data API Gaming 热门视频：美国、英国、法国、德国、意大利，按跨区覆盖与播放量发现近期话题（可选）
- YouTube 指定频道上传列表，并同步公开视频的播放、点赞与评论数据（可选）
- DeepL 标题翻译：只翻译新出现的 YouTube 标题并写入历史缓存，页面保留原标题（可选）

完整游戏与 Demo 都会保留，DLC、工具和原声包会排除。每日历史连续积累 7 天后，页面会展示真实的 7 日在线与评价增长。

## 本地生成与预览

需要 Python 3.10 或更高版本，无第三方依赖。

使用已有数据库快速生成：

```bash
python3 export_static.py --skip-sync
python3 -m http.server 4173 --directory dist
```

执行一次真实采集后生成：

```bash
python3 export_static.py
```

打开 `http://127.0.0.1:4173/`。旧的 `python3 server.py` 本地 API 模式仍保留用于调试。

## GitHub Pages 发布

1. 创建公开 GitHub 仓库并把本目录推送到 `main` 分支。
2. 在仓库 `Settings > Pages` 中把 Source 设为 `GitHub Actions`。
3. 在 `Actions` 页面手动运行一次 `Update data and deploy Pages`，之后每天自动更新。

可选的 GitHub 配置：

- Actions secret `YOUTUBE_API_KEY`：YouTube Data API 服务端密钥
- Actions secret `DEEPL_API_KEY`：DeepL API Free 或 Pro 密钥，用于生成简体中文视频标题
- Actions variable `SCOUTLINE_YOUTUBE_CHANNELS`：`显示名称|@handle,显示名称|UC频道ID`
- Actions variable `SCOUTLINE_YOUTUBE_REGIONS`：热门视频地区，默认 `US,GB,FR,DE,IT`
- Actions variable `SCOUTLINE_YOUTUBE_MAX_RESULTS`：每个地区和频道读取数量，默认 `20`，范围 `5-50`

## YouTube API 配置

1. 在 Google Cloud 创建项目并启用 `YouTube Data API v3`。
2. 创建 API Key，并把 API restriction 限制为 `YouTube Data API v3`；不要把密钥写进仓库文件。
3. 在 GitHub 仓库 `Settings > Secrets and variables > Actions > Secrets` 新建 `YOUTUBE_API_KEY`。
4. 在 Actions 页面手动运行一次 `Update data and deploy Pages`。

热门游戏视频只读取公开的 `videos.list` 榜单，不需要用户 OAuth。指定频道使用公开频道信息与上传列表，也不需要创作者授权。API Key 只在 GitHub Actions 采集过程中使用，不会进入 Pages 网页或公开 JSON。

## YouTube 中文标题

1. 在 DeepL 创建 API Free 账户并取得 API Key；Free 方案目前每月包含 50 万字符额度。
2. 在 GitHub 仓库 `Settings > Secrets and variables > Actions > Secrets` 新建 `DEEPL_API_KEY`。
3. 在 Actions 页面手动运行一次 `Update data and deploy Pages`。

翻译在采集阶段批量完成，只处理尚无中文标题的新视频。译文保存在 Actions 的 SQLite 历史缓存中，后续每日更新不会重复翻译；翻译服务临时不可用时网站会回退到原标题，不影响 Steam 和 YouTube 数据发布。

公开仓库若连续 60 天没有活动，GitHub 可能暂停定时工作流；手动运行或提交一次更新即可恢复。

## 生成产物

- `dist/data/games.json`：游戏、榜单、地区和趋势数据
- `dist/data/content.json`：论坛与创作者资讯
- `dist/data/status.json`：最近采集时间与每日计划

数据库路径可通过 `SCOUTLINE_DB_PATH` 指定。GitHub Actions 使用 `.cache/scoutline.db`，该目录与 `dist/` 都已加入 `.gitignore`。
