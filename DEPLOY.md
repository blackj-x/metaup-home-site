# DEPLOY — metaup.pro 母站部署清单（待 blackj）

母站只建了代码，未部署。部署由 blackj 执行，顺序如下：

## 0. ⚠ 前置:关掉根 URL 跳转规则（最关键)
当前 `metaup.pro` 根 URL 在 Cloudflare 上是一条纯跳转规则（→ 鹅鸭杀子站）。
**必须先在 Cloudflare 删除/停用这条 Rules，** 否则部署后访问 metaup.pro 仍会被跳走，
母站等于没上线，AdSense 也会继续在根域名看到"跳转壳"。

## 1. 构建 + 部署
```bash
cd ~/workspace/webproject/metaup-home
npm install
npm run build          # 产出 dist/（9 页 + robots + sitemap）
npx wrangler login     # 需人工 OAuth
npx wrangler deploy    # 纯静态资产模式，见 wrangler.jsonc
```
然后在 Cloudflare 把 `metaup.pro`（根域名）路由到本 Worker/Pages。

## 2. 配 Email Routing
让 `support@metaup.pro` 真实可收信（Contact 页用的就是它）。
Cloudflare → 该域名 → Email → Routing，加 catch-all 或 support@ 转发到你常用邮箱。

## 3. 填 src/data/site.ts（账号侧拿到后）
- `cfBeaconToken`：在 CF Web Analytics **为 metaup.pro 新建** beacon（⚠ 不沿用任何子站 token）。
- `googleSiteVerification`：在 GSC **注册根域名 metaup.pro**，拿 HTML 标签验证码。
- `adsenseClient`：养站 2–3 周、前置全绿后再填 `ca-pub-1501729431443241`（养站期可留空，不急着上广告码）。
改完重新 `npm run build && npx wrangler deploy`。

## 4. 收录 + 养站
- GSC 提交 `https://metaup.pro/sitemap.xml`，盯根 URL 被当真页收录、收录页数上涨。
- 养 2–3 周，积累收录与少量真实流量。

## 5. 一次性申请 AdSense（根域名 metaup.pro）
前置全绿（真主页 + 三件套 + 跳转已拆 + 收录起来 + 养站够）后，在 AdSense「Sites」
确认填的是 `metaup.pro`，一次性申请。过审后名下子域名（ggd / lc / 未来站）继承父域名状态。

## 6. 子站收尾（与母站一起做口径统一）
- ggd-site / lc-site 的合规三件套各自部署（同一邮箱 support@metaup.pro）。
- 子站 about 页已互链 metaup.pro；母站上线后子站可重新部署强化互链。
