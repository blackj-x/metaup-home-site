# MetaUp 母站 · 自动节奏计划（agent 执行手册）

**仓库：** `/Users/gouzhiyuan/workspace/webproject/metaup-home`  
**域名：** `https://metaup.pro`  
**配套文档：** `SEO-PLAN.md`（战略）、`SEO-BASELINE.md`（基线）、本文件（可执行日历）  
**建立日：** 2026-07-13  

定时 agent 每次启动时 **必须先读本文件**，再按「今天到期」勾选执行，禁止一次改 10+ 页，禁止动 Privacy 合规含义。

---

## 0. 全局铁律（每次必读）

1. 工作区：`cd /Users/gouzhiyuan/workspace/webproject/metaup-home`
2. 每周只做 **1–3 个小任务**；优先动态 > 事件跟进 > 小优化 > 新长文。
3. 新文章节奏：**每 2 周最多 1 篇**（中英可错开，非字面翻译）。
4. 技术 URL：尾斜杠 `always`；`npm run build` 必须过 canonical checker。
5. `lastmod` 只抬**真实改动的页面**；合规页（about/privacy/contact）日期与文案保持稳定。
6. 做完：`npm run build` → commit（清晰 message）→ `git push` → `npx wrangler deploy`（除非用户禁止部署）。
7. 改完若涉及里程碑，提醒 blackj 回填 OPT-CEO 看板（本仓看不到）。

### 禁止

- 用构建日期批量刷全站 lastmod  
- 伪造发售/数据  
- 改 Privacy/AdSense 法律表述（除非用户明确要求）  
- 未 build 就 deploy  

---

## 1. 状态机：如何判断「今天该做什么」

每次 agent 运行：

```bash
date +%Y-%m-%d
# 读首页动态最新 date
grep -A2 "const updates" -A20 src/pages/index.astro | head -25
# 读文章最新 date
grep "date:" src/data/articles.ts | tail -5
```

| 条件 | 动作 ID |
|------|---------|
| 最新站群动态距今 ≥ 3 天 | **W1** 每周动态 |
| 今天 ∈ 事件表日期（§2） | 对应 **E*** 事件任务 |
| 距上一篇新文章 ≥ 14 天 且 无更大事件占用 | **C1** 内容窗（仅规划或短文，见规则） |
| 距上次 GSC 提示 ≥ 14 天 | **H1** 输出 GSC 人工 checklist（不替用户登录） |
| 工作区有未提交 SEO 相关改动 | **T0** 先 build 验证再决定 commit |
| 无到期项 | 只做 **T1** 健康检查（build），无 diff 则不 commit |

---

## 2. 事件日历（2026-07 ~ 08）

| 日期 | ID | 任务 | 优先级 |
|------|-----|------|--------|
| **2026-07-15**（及 +1 天缓冲） | **E1** | The Mound 发售观察：查公开来源是否上线；更新 watchlist 中英状态段 + 站群动态 1 条；必要时微调建站优先级表述 | P0 |
| **2026-07-16 ~ 07-18** | **E2** | 内容窗：若 E1 已做，可启动 **短文或 watchlist 深更**（二选一，不要两篇） | P1 |
| **2026-07-20** | **E3** | 中期复盘笔记：GSC/Trends 给用户的 5 行 checklist；动态 1 条「养站维护」 | P2 |
| **2026-07-27** | **E4** | 双周：站群动态 + 评估是否需要新编辑文主题（列表即可，可下期写） | P1 |
| **2026-08-01** | **E5** | 月初：AdSense 准备度自检（页数、更新频率、合规页、无 307 内链）→ 写进动态或 BASELINE 一段 | P1 |
| **2026-08-05** | **E6** | MIMESIS / Cursed Companions 观察刷新（Steam 状态一句 + watchlist 小改） | P2 |

> 过期未做的事件：下一次 agent 运行时 **补做最近一个未完成的 P0/P1**，不要一次补全月。

---

## 3. 例行任务卡片（可重复）

### W1 · 每周站群动态（默认每 3–4 天）

**改：** `src/pages/index.astro`、`src/pages/en/index.astro`  
**可选：** 趋势卡片日期、`sitemap.xml.js` 仅 `/` 与 `/en/` 的 lastmod  

**内容模板（真实、可核验）：**

- 技术/维护类：尾斜杠、checker、部署、内链  
- 事件类：Mound / MIMESIS / LC 子站  
- Trends 类：写「扫描了 co-op horror / 致命公司 / 鹅鸭」+ 1 句观察（可用 web_search，勿编造具体排名数字）  

**验收：** 最新 `date` = 当天；中英各 1 条；`updates.slice(0, 8)` 仍成立；build PASS。

### W2 · Trends 扫描（并入 W1 或单独）

- 搜索：`co-op horror 2026`、`Lethal Company`、`Goose Goose Duck` 相关公开讨论  
- 产出：动态里 1 句 或 `notes/` 不强制（无 notes 目录则只写动态）

### C1 · 双周内容（≥14 天无新文时）

**候选主题（按优先级）：**

1. The Mound 上线初观察（机制深度 vs 建站标准）— 依赖 E1  
2. 合作恐怖选题清单 v2（FEEDERS / R.E.P.O. 等，仍用评估框架非新闻）  
3. 方法论文短延伸（E-E-A-T / last reviewed 实践案例）  

**硬规则：** 一篇 ≥800 字有效信息；双语则独立写作 + `alternateSlug`；先中文或先英文皆可。

### T1 · 技术健康检查（可每天空跑）

```bash
npm run build   # 含 check-canonical-links
```

失败则修到通过再走其他内容任务。

### H1 · 人工 GSC 提示（agent 只生成清单）

输出给用户，不替登录：

1. GSC 属性 `metaup.pro` 是否已验证  
2. 提交 `https://metaup.pro/sitemap.xml`  
3. 看覆盖率 / 是否有「页面带重定向」激增  
4. 查询是否出现 watchlist / co-op horror 相关  
5. 移动可用性 / CWV 若有报告则截一张  

---

## 4. 已完成基线（避免重复劳动）

| 完成项 | 约日期 / commit |
|--------|-----------------|
| 双语母站 + 编辑文批量 | 2026-06 |
| Watchlist + AI citable 方法论 | 2026-07-02 |
| 趋势入口 home/resources | 2026-07-02 |
| 每周动态节奏跑通 | 07-04 ~ 07-13 |
| 尾斜杠 + lastmod + 构建检查 | 2026-07-12 `6de95ab` `c3a3cbc` |
| 动态 07-13 + Mound T-2 | 2026-07-13 `913e73f` |

**不要重做：** 整站 hreflang 大重构、Privacy 重写、无证据的「全站 lastmod 今天」。

---

## 5. 执行协议（定时 agent 用）

1. `Read SEO-RHYTHM-AUTO.md` + 快速 `git status` / `git log -3`  
2. 用 §1 状态机列出 **今天最多 3 个** 任务 ID  
3. 实现 → `npm run build`  
4. Commit message 前缀：  
   - `chore(seo): weekly rhythm YYYY-MM-DD — …`  
   - `feat(seo): …` 新文  
   - `fix(seo): …` 技术  
5. `git push origin main` + `npx wrangler deploy`  
6. 回复用户 5 行摘要：做了啥 / 构建 / commit / 部署 / 下次到期  

若 `git status` 有**其他 agent 未提交大改**，不要强行覆盖：先 build，再只提交本任务文件。

---

## 6. 定时调度说明

Grok 会话内 durable 定时任务会调用本手册。注意：平台 recurring 任务可能有 **约 7 天过期**；过期后请用户说「续订自动节奏」再挂载。

建议调度：

| 任务名 | 间隔 | 行为 |
|--------|------|------|
| metaup-daily-rhythm | 1d | 跑 §1 状态机，执行到期 W1/E*/T1 |
| metaup-mound-window | 1d（发售后几天） | 聚焦 E1，直到 watchlist 已更新发售状态 |

---

## 7. 检查清单（每次收工）

- [ ] build + canonical check 绿  
- [ ] 无无意义合规页 lastmod 抖动  
- [ ] 新内链带尾斜杠  
- [ ] 动态中英同步  
- [ ] 已 push + deploy（或明确说明未部署原因）  
