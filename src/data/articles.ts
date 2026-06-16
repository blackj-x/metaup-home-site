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
}

export const articles: Article[] = [
  {
    slug: 'how-we-make-guides',
    title: '我们怎么做游戏攻略：数据来源、事实校验闸与原创 SVG 地图',
    excerpt: '攻略错一个数值就害人。这篇讲清 MetaUp 的数据从哪来、怎么核、为什么地图全是手画的。',
    kicker: '方法论',
    date: '2026-06-16',
    words: 1500,
  },
  {
    slug: 'coop-games-for-beginners',
    title: '适合新手入坑的联机合作游戏盘点：从社交推理到合作恐怖',
    excerpt: '想拉朋友一起玩、又怕太硬核劝退？按上手难度和「翻车好笑程度」挑了几款，附入坑提醒。',
    kicker: '盘点',
    date: '2026-06-16',
    words: 1700,
  },
  {
    slug: 'spot-reliable-game-data',
    title: '怎么分辨一份游戏攻略数据靠不靠谱:玩家自查指南',
    excerpt: '满网都是抄来抄去的攻略,数值还经常过期。教你几招快速判断哪份数据能信。',
    kicker: '玩家指南',
    date: '2026-06-16',
    words: 1300,
  },
];
