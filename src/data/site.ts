// 站点级配置 —— 域名在 astro.config.mjs 的 site 字段统一配置，这里放其余站点信息
export const SITE = {
  name: 'MetaUp 游戏攻略站群',
  shortName: 'MetaUp',
  // 默认社交分享图（放在 public/og-default.svg / public/og-default.png），各页可覆盖
  defaultOgImage: '/og-default.png',
  locale: 'zh_CN',
  // 主题色（移动端浏览器地址栏）—— 站群中性深色
  themeColor: '#0f1320',
  // Cloudflare Web Analytics (RUM) beacon token（留空则不输出统计脚本）
  // 站群共用同一个 beacon token（blackj 当前只建了一个 CF Web Analytics 站点，metaup.pro + 各子站共用）
  cfBeaconToken: '81a7abda8ac14ca9a3c476e10b326eb8',
  // Google Search Console HTML 标签验证码（meta content 值，留空则不输出标签）
  // ⚠ 上线后在 GSC 注册 metaup.pro（根域名）拿到后填入
  googleSiteVerification: '',
  // AdSense 发布商 ID（账号级，与站群同主体沿用）
  // public/ads.txt：google.com, pub-1501729431443241, DIRECT, f08c47fec0942fa0
  // ⚠ 母站过审是解锁全站群变现的关键，但养站期不急着填广告码——前置全绿+养站后再申
  adsenseClient: '',
};
