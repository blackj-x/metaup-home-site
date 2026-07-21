// 母站独有原创编辑文登记表 —— 首页「编辑精选」区与 sitemap 的数据源。
// 正文写在各自的 src/pages/articles/<slug>.astro 里；这里只放卡片所需元信息。
export interface Article {
  slug: string;
  title: string;
  /** 卡片摘要（≤60 字） */
  excerpt: string;
  /** 类别标签 */
  kicker: string;
  /** 发布/更新日期 */
  date: string;
  /** 正文大致原创字数（用于站内自查，不显示） */
  words: number;
  /**
   * If this article has a direct counterpart in the other language,
   * set the slug of the alternate here. Only articles with this will get
   * cross-language hreflang.
   */
  alternateSlug?: string;
}

export const articles: Article[] = [
  {
    slug: 'how-we-make-guides',
    title: '我们怎么做游戏攻略：数据来源、事实校验闸与原创 SVG 地图',
    excerpt: '攻略错一个数值就害人。这篇讲清 MetaUp 的数据从哪来、怎么核、为什么地图全是手画的。',
    kicker: '方法论',
    date: '2026-06-16',
    words: 1500,
    alternateSlug: 'how-we-build-reliable-guides',
  },
  {
    slug: 'coop-games-for-beginners',
    title: '适合新手入坑的联机合作游戏盘点：从社交推理到合作恐怖',
    excerpt: '想拉朋友一起玩、又怕太硬核劝退？按上手难度和「翻车好笑程度」挑了几款，附入坑提醒。',
    kicker: '盘点',
    date: '2026-06-16',
    words: 1700,
    alternateSlug: 'best-beginner-coop-games',
  },
  {
    slug: 'spot-reliable-game-data',
    title: '怎么分辨一份游戏攻略数据靠不靠谱:玩家自查指南',
    excerpt: '满网都是抄来抄去的攻略,数值还经常过期。教你几招快速判断哪份数据能信。',
    kicker: '玩家指南',
    date: '2026-06-16',
    words: 1300,
    alternateSlug: 'how-to-spot-trustworthy-guides',
  },
  {
    slug: 'reading-patch-notes',
    title: '如何真正读懂游戏更新说明（不漏掉关键变化）',
    excerpt: '大多数玩家扫一眼补丁说明就以为懂了，然后被改动打脸。教你一套快速提取真实影响的方法。',
    kicker: '玩家技能',
    date: '2026-06-24',
    words: 1100,
    alternateSlug: 'reading-game-patch-notes',
  },
  {
    slug: 'common-coop-mistakes',
    title: '联机合作游戏中最常见的翻车原因与预防',
    excerpt: '大多数团灭不是因为操作差，而是沟通、判断和习惯出了问题。这里总结最容易犯的几类错误。',
    kicker: '避坑指南',
    date: '2026-06-25',
    words: 1250,
    alternateSlug: 'common-coop-mistakes',
  },
  {
    slug: 'why-original-maps',
    title: '为什么我们坚持原创手绘地图而不是直接截图',
    excerpt: '游戏截图方便，但我们选择自己画 SVG。这篇讲清楚背后的版权、清晰度和长期价值考虑。',
    kicker: '内容理念',
    date: '2026-06-25',
    words: 980,
    alternateSlug: 'why-we-draw-maps',
  },
  {
    slug: 'maintaining-game-guides',
    title: '游戏攻略的长期维护：如何防止内容随时间腐烂',
    excerpt: '攻略上线后不是一劳永逸。分享我们如何持续跟踪版本、修正错误、保持数据鲜活。',
    kicker: '内容维护',
    date: '2026-06-25',
    words: 1100,
    alternateSlug: 'maintaining-game-guides',
  },
  {
    slug: '2026-coop-horror-watchlist',
    title: '2026 合作恐怖游戏观察：哪些值得建独立攻略站',
    excerpt: 'Cursed Companions、MIMESIS、The Mound 三款新游 + Lethal Company 参照。我们标注发售状态、核心机制复杂度与独立建站潜力。',
    kicker: '趋势观察',
    date: '2026-07-21',
    words: 1650,
    alternateSlug: '2026-coop-horror-watchlist',
  },
  {
    slug: 'ai-search-citable-guides',
    title: 'AI Search 时代我们如何做可引用攻略',
    excerpt: 'AI 搜索引擎更青睐可验证、结构化、持续更新的内容。我们把这套方法论写清楚，也服务长期 E-E-A-T。',
    kicker: '方法论',
    date: '2026-07-02',
    words: 1320,
    alternateSlug: 'how-we-make-citable-guides',
  },
];
