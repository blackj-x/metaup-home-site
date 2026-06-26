// 站群子站登记表 —— 母站导航卡 / 站群动态 / sitemap 互链的唯一数据源。
// 新增一个游戏站时只改这里：补一条记录、写 ≥80 字原创简介，首页卡片与 sitemap 自动更新。
export interface SubSite {
  slug: string;
  /** 站名（中文） */
  name: string;
  /** 对应游戏 */
  game: string;
  gameEn: string;
  /** 二级域名 URL */
  url: string;
  /** 卡片图标 emoji */
  icon: string;
  /** 强调色（卡片顶条与悬浮光） */
  accent: string;
  /** 站点状态：live=已上线 / building=建设中 */
  status: 'live' | 'building';
  /** 一句话定位（卡片副标题） */
  tagline: string;
  /** ≥80 字原创简介：这个站讲什么游戏、有什么内容、适合谁。反纯链接农场。 */
  blurb: string;
  /** 卡片上展示的内容亮点标签 */
  highlights: string[];
  /** English version for /en/ pages (optional, falls back to Chinese if missing) */
  taglineEn?: string;
  blurbEn?: string;
  highlightsEn?: string[];
}

export const sites: SubSite[] = [
  {
    slug: 'gooseduck',
    name: '鹅鸭攻略社',
    game: '鹅鸭杀',
    gameEn: 'Goose Goose Duck',
    url: 'https://gooseduck.metaup.pro',
    icon: '🦢',
    accent: '#3ba9ff',
    status: 'live',
    tagline: '社交推理 · 全角色身份图鉴',
    blurb:
      '《鹅鸭杀》是一款人多嘴杂的太空狼人杀，身份多到开局记不全。鹅鸭攻略社把鹅、鸭、中立三大阵营的每个角色技能、胜利条件、能不能带刀/投票，全部拆成一查就懂的图鉴，再配上各张地图的任务点位、刀点与藏尸区的原创示意图，外加新手入门和进阶话术专题。适合刚下载想快速记住身份的新人，也适合要规划路线、抠对局博弈的老手——开局前 30 秒来这里查一遍，上桌不慌。',
    highlights: ['全角色技能图鉴', '原创地图点位图', '新手入门 + 话术'],
    taglineEn: 'Social Deduction · Complete Role Compendium',
    blurbEn:
      'Goose Goose Duck is a chaotic social deduction game in space where remembering every role feels impossible. Goose Duck Guide breaks down every Goose, Duck, and Neutral role — skills, win conditions, kill/vote eligibility — into clear, scannable entries, paired with original annotated SVG maps showing tasks, kill spots, and body hiding zones, plus beginner guides and advanced strategy. Perfect for first-timers who want to survive the first 30 seconds and veterans who want to optimize routes and mind games.',
    highlightsEn: ['Full Role Skill Compendium', 'Original Map Diagrams', 'Beginner + Advanced Strategy'],
  },
  {
    slug: 'lethalcompany',
    name: '致命公司攻略社',
    game: '致命公司',
    gameEn: 'Lethal Company',
    url: 'https://lethalcompany.metaup.pro',
    icon: '🛰',
    accent: '#7ad17a',
    status: 'live',
    tagline: '合作恐怖 · 怪物与卫星资料库',
    blurb:
      '《致命公司》是几个打工人下废弃星球捡废品、躲怪、凑业绩的合作恐怖游戏，一个判断失误全队报销。致命公司攻略社把每种怪物的行为逻辑、触发条件和应对打法写成成体系的中文攻略，再覆盖各颗卫星的地形与风险、室内物品价值、终端指令、天气机制和版本解读。适合第一次进厂不知道哪个怪能惹、哪个不能碰的新人，也适合想压低死亡率、把每趟业绩拉满的老队伍——出舱前先查清楚这趟会遇到什么。',
    highlights: ['33 种怪物打法', '卫星地形 + 物品价值', '终端指令 + 版本解读'],
    taglineEn: 'Co-op Horror · Monsters & Moon Data Archive',
    blurbEn:
      'Lethal Company sends teams of workers to abandoned moons to collect scrap while avoiding deadly creatures. One bad call wipes the squad. Lethal Company Guide documents the full behavior, triggers, and counters for every monster, plus moon layouts and risks, indoor scrap values, terminal commands, weather mechanics, and version notes. Ideal for new crews who don’t know what to touch and veteran teams trying to minimize deaths and max quota.',
    highlightsEn: ['33+ Monster Strategies', 'Moon Terrain & Loot Values', 'Terminal + Version Notes'],
  },
];

export const liveSites = sites.filter((s) => s.status === 'live');
