# MetaUp 母站 SEO Baseline (2026-06-26)

**目的**：为后续 SEO 专员提供清晰的当前状态基线，便于沟通、调整和微调计划。所有后续变更应基于此 baseline 进行迭代。

## 当前站点概况
- **架构**：Astro SSG 静态站，数据驱动（`src/data/` 主导文章和站点信息）
- **语言支持**：完整双语
  - 中文：根路径 `/`（主流量）
  - 英文：`/en/` 分区（独立内容，非简单翻译）
- **端口配置**：开发服务器已调整为 `14321`（原 4321 被占用）
  - `astro.config.mjs`: `server: { host: '127.0.0.1', port: 14321 }`
- **总页面数**（构建后）：约 31 个内容页面
- **文章统计**（母站独占原创编辑文）：
  - 中文：8 篇
  - 英文：10 篇
- **新增核心页面**：
  - FAQ（中英）
  - Resources / 实用资源（中英）
  - 大量新编辑文（方法论、避坑、维护、地图价值等）
- **站群动态**：已大幅丰富，覆盖 2026-05 ~ 06-25 多条条目（母站 + 子站更新），体现持续活跃

## 内容结构
- **母站 (metaup.pro)**：发现 + 权威层（E-E-A-T）
  - 编辑精选系列（方法论、数据可信度、补丁阅读、团队沟通、地图理念、维护等）
  - FAQ、Resources、About、Privacy、Contact
- **子站入口**：鹅鸭攻略社 (gooseduck.metaup.pro)、致命公司攻略社 (lethalcompany.metaup.pro)
  - 母站卡片有 ≥80 字原创 blurb（中英双语）
- **数据文件**：
  - `src/data/articles.ts` + `src/data/en/articles.ts`
  - `src/data/sites.ts`（含 blurbEn 等）
- **布局更新**：Base.astro 支持 lang，动态 nav/footer/hreflang；Article.astro 双语支持

## 已完成的 SEO 相关变更（Baseline）
1. 双语路由 + 导航 + 页脚完整支持
2. 新增 6+ 篇原创编辑文（非翻译，针对用户价值）
3. 站群动态作为可持续更新点（每周计划更新）
4. SEO-PLAN.md：12 周每周小步执行计划
5. 首页描述、hero、更新列表优化（加入搜索意图词）
6. 内部链接、sitemap 更新
7. 端口和配置调整
8. FAQ + Resources 页面（提升内容厚度）
9. Week 2 技术 SEO：
   - sitemap 所有 canonical URL 统一添加尾斜杠（https://metaup.pro/、/articles/ 等）
   - Base.astro 输出 hreflang="zh" / "en" + hreflang="x-default"（x-default 指向中文主版本）
   - Article schema 补充 image + publisher.logo（使用 og-default.png）

## 构建状态
- `npm run build` 成功，产出 dist/（静态资产）
- robots.txt + sitemap.xml 已包含双语所有路径

## 关键文件清单（变更基线）
- 修改：astro.config.mjs, src/data/*.ts, layouts/*.astro, 多篇 pages/*.astro
- 新增：
  - SEO-PLAN.md
  - src/data/en/
  - src/pages/en/ (完整双语结构)
  - 多个新 articles + faq.astro + resources.astro

## 待 SEO 专员接手的工作
- **Baseline 确认**：使用当前状态作为起点
- **微调计划**：参考 SEO-PLAN.md（每周小任务，避免大批量发布）
- **沟通点**：
  - 站群动态每周更新机制
  - 趋势驱动内容（Google Trends + GSC）
  - 中英内容差异化策略
  - 母站 vs 子站关键词集群
  - E-E-A-T 信号强化（已有大量方法论内容）
- **下一步建议**：
  1. 运行 `npm run dev` (端口 14321) 本地验证
  2. 连接 GSC，提交 sitemap，建立收录 baseline
  3. 按 SEO-PLAN.md Week 1+ 执行
  4. 定期与团队同步调整计划

## 版本信息
- 当前分支：main
- Baseline 日期：2026-06-26
- 最新提交：chore(seo): Week 2 technical - sitemap trailing slash for canonical, Base hreflang + x-default, Article schema image + logo
- 基线包含：双语结构 + 原创内容 + 站群动态 + SEO-PLAN + 本次技术优化
- 后续变更：请参考 SEO-PLAN.md 每周小步执行，并在本文件追加更新记录

---

**注意**：dist/ 和 node_modules/ 已忽略（.gitignore）。CLAUDE.md 按惯例不入库。

此 baseline 文档 + SEO-PLAN.md 应作为 SEO 专员的主要参考。后续所有微调请在此基础上迭代，并更新本文件或计划文档。