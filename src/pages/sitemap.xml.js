import { articles as zhArticles } from '../data/articles';
import { articles as enArticles } from '../data/en/articles';

/**
 * lastmod sources:
 * - articles: data.date (publish/update field)
 * - static pages: explicit map (compliance pages only bump on real edits — AdSense stability)
 */
const STATIC_LASTMOD = {
  '/': '2026-07-12',
  '/articles/': '2026-07-12',
  '/about/': '2026-06-16',
  '/privacy/': '2026-06-16',
  '/contact/': '2026-06-16',
  '/resources/': '2026-07-12',
  '/faq/': '2026-06-25',
  '/en/': '2026-07-12',
  '/en/articles/': '2026-07-12',
  '/en/about/': '2026-06-24',
  '/en/privacy/': '2026-06-24',
  '/en/contact/': '2026-06-24',
  '/en/resources/': '2026-07-12',
  '/en/faq/': '2026-06-25',
};

function withTrailingSlash(p) {
  if (!p || p === '/') return '/';
  return p.endsWith('/') ? p : `${p}/`;
}

export function GET({ site }) {
  const origin = (site?.href ?? 'https://metaup.pro/').replace(/\/$/, '');

  const zhStatic = ['/', '/articles/', '/about/', '/privacy/', '/contact/', '/resources/', '/faq/'];
  const enStatic = [
    '/en/',
    '/en/articles/',
    '/en/about/',
    '/en/privacy/',
    '/en/contact/',
    '/en/resources/',
    '/en/faq/',
  ];

  const staticEntries = [...zhStatic, ...enStatic].map((p) => {
    const path = withTrailingSlash(p);
    return {
      path,
      lastmod: STATIC_LASTMOD[path] ?? '2026-07-12',
    };
  });

  const zhArticleEntries = zhArticles.map((a) => ({
    path: withTrailingSlash(`/articles/${a.slug}`),
    lastmod: a.date,
  }));

  const enArticleEntries = enArticles.map((a) => ({
    path: withTrailingSlash(`/en/articles/${a.slug}`),
    lastmod: a.date,
  }));

  const all = [...staticEntries, ...zhArticleEntries, ...enArticleEntries];

  const urls = all
    .map(({ path, lastmod }) => {
      const loc = `${origin}${path}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
