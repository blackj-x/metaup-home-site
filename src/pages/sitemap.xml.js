import { articles } from '../data/articles';

export function GET({ site }) {
  const base = (site?.href ?? 'https://metaup.pro/').replace(/\/$/, '');
  const staticPaths = ['', '/articles', '/about', '/privacy', '/contact'];
  const articlePaths = articles.map((a) => `/articles/${a.slug}`);
  const urls = [...staticPaths, ...articlePaths]
    .map((p) => `  <url><loc>${base}${p}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
