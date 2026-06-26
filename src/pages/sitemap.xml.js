import { articles as zhArticles } from '../data/articles';
import { articles as enArticles } from '../data/en/articles';

export function GET({ site }) {
  const base = (site?.href ?? 'https://metaup.pro/').replace(/\/$/, '');

  // Chinese (root)
  const zhStatic = ['', '/articles', '/about', '/privacy', '/contact', '/resources', '/faq'];
  const zhArticlePaths = zhArticles.map((a) => `/articles/${a.slug}`);

  // English
  const enStatic = ['/en/', '/en/articles', '/en/about', '/en/privacy', '/en/contact', '/en/resources', '/en/faq'];
  const enArticlePaths = enArticles.map((a) => `/en/articles/${a.slug}`);

  const allPaths = [...zhStatic, ...zhArticlePaths, ...enStatic, ...enArticlePaths];

  const urls = allPaths
    .map((p) => {
      let loc = `${base}${p}`;
      if (!loc.endsWith('/')) loc += '/';
      return `  <url><loc>${loc}</loc></url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
