/**
 * Build-time check (run after `astro build`):
 * 1. Every HTML page's <link rel="canonical"> ends with / (page paths)
 * 2. Canonical path matches the file path under dist/
 * 3. Internal <a href="/..."> links use trailing slash (no soft-307 class)
 * 4. Compliance / nav paths stay present (AdSense review stability)
 *
 * Exit 1 on any failure.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');

if (!fs.existsSync(DIST)) {
  console.error('dist/ missing — run astro build first');
  process.exit(1);
}

function walkHtml(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, out);
    else if (ent.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function fileToUrlPath(file) {
  let rel = path.relative(DIST, file).split(path.sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel === '404.html') return '/404.html';
  if (rel.endsWith('/index.html')) rel = rel.slice(0, -'/index.html'.length) + '/';
  else if (rel.endsWith('.html')) rel = rel.slice(0, -'.html'.length);
  if (!rel.startsWith('/')) rel = '/' + rel;
  return rel;
}

function isAssetOrSpecial(p) {
  if (!p || p.startsWith('//')) return true;
  if (p.startsWith('mailto:') || p.startsWith('http://') || p.startsWith('https://')) return true;
  if (p.startsWith('#')) return true;
  if (/\.[a-zA-Z0-9]{1,8}$/.test(p.split(/[?#]/)[0])) return true;
  return false;
}

function pathNeedsSlash(p) {
  if (isAssetOrSpecial(p)) return false;
  if (!p.startsWith('/')) return false;
  const base = p.split(/[?#]/)[0];
  if (base === '/') return false;
  return !base.endsWith('/');
}

const errors = [];
const warnings = [];
const pages = walkHtml(DIST);

// Required pages for AdSense / compliance (must exist and be linked)
const requiredPaths = [
  '/',
  '/about/',
  '/privacy/',
  '/contact/',
  '/articles/',
  '/resources/',
  '/faq/',
  '/en/',
  '/en/about/',
  '/en/privacy/',
  '/en/contact/',
];

for (const req of requiredPaths) {
  const disk =
    req === '/'
      ? path.join(DIST, 'index.html')
      : path.join(DIST, req.replace(/^\//, ''), 'index.html');
  if (!fs.existsSync(disk)) {
    errors.push(`Missing required page for review stability: ${req}`);
  }
}

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const urlPath = fileToUrlPath(file);
  const rel = path.relative(DIST, file);

  // skip bare 404 from strict path match if needed
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  if (!canonicalMatch) {
    if (rel !== '404.html') errors.push(`${rel}: missing <link rel="canonical">`);
    continue;
  }

  const canonical = canonicalMatch[1];
  let canonPath;
  try {
    canonPath = new URL(canonical).pathname;
  } catch {
    errors.push(`${rel}: invalid canonical URL ${canonical}`);
    continue;
  }

  if (pathNeedsSlash(canonPath)) {
    errors.push(`${rel}: canonical path missing trailing slash: ${canonPath}`);
  }

  // Path match (normalize 404)
  if (rel !== '404.html') {
    const expected = urlPath.endsWith('/') || urlPath === '/' ? urlPath : urlPath + '/';
    const got = canonPath.endsWith('/') || canonPath === '/' ? canonPath : canonPath + '/';
    // Astro may emit pathname with or without depending on config; we require trailing form
    if (got !== expected && !(expected === '/' && got === '/')) {
      // allow if only slash difference already checked above
      if (got.replace(/\/$/, '') !== expected.replace(/\/$/, '')) {
        errors.push(`${rel}: canonical path ${got} != file path ${expected}`);
      }
    }
  }

  // Internal links
  const hrefRe = /href="(\/[^"]*)"/gi;
  let m;
  while ((m = hrefRe.exec(html)) !== null) {
    const href = m[1];
    if (pathNeedsSlash(href)) {
      errors.push(`${rel}: internal link missing trailing slash: ${href}`);
    }
  }
}

// sitemap lastmod presence
const sitemapPath = path.join(DIST, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sm = fs.readFileSync(sitemapPath, 'utf8');
  const urlBlocks = sm.match(/<url>[\s\S]*?<\/url>/g) || [];
  let missingLastmod = 0;
  for (const block of urlBlocks) {
    if (!/<lastmod>/.test(block)) missingLastmod++;
  }
  if (missingLastmod > 0) {
    errors.push(`sitemap.xml: ${missingLastmod}/${urlBlocks.length} urls missing <lastmod>`);
  }
  // all locs should end with /
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((x) => x[1]);
  for (const loc of locs) {
    try {
      const p = new URL(loc).pathname;
      if (p !== '/' && !p.endsWith('/')) {
        errors.push(`sitemap.xml: loc without trailing slash: ${loc}`);
      }
    } catch {
      errors.push(`sitemap.xml: bad loc ${loc}`);
    }
  }
} else {
  errors.push('sitemap.xml missing from dist/');
}

if (warnings.length) {
  console.warn('Warnings:');
  for (const w of warnings) console.warn('  -', w);
}

if (errors.length) {
  console.error(`\nCanonical / trailing-slash check FAILED (${errors.length} issues):\n`);
  for (const e of errors.slice(0, 80)) console.error('  ✗', e);
  if (errors.length > 80) console.error(`  … and ${errors.length - 80} more`);
  process.exit(1);
}

console.log(
  `Canonical / trailing-slash check OK — ${pages.length} HTML pages, required compliance routes present.`
);
