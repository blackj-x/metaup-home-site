/**
 * One-shot / re-runnable codemod: ensure internal site paths in src use trailing slash.
 * Does NOT touch mailto:, https://, http://, or asset file paths.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src');

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (/\.(astro|ts|js|mjs)$/.test(ent.name)) out.push(p);
  }
  return out;
}

function ensureSlashOnPath(p) {
  if (!p.startsWith('/')) return p;
  if (p.startsWith('//')) return p;
  const hashIdx = p.indexOf('#');
  const queryIdx = p.indexOf('?');
  let cut = p.length;
  if (hashIdx >= 0) cut = Math.min(cut, hashIdx);
  if (queryIdx >= 0) cut = Math.min(cut, queryIdx);
  const base = p.slice(0, cut);
  const suffix = p.slice(cut);
  if (base === '/' || base === '') return p;
  if (/\.[a-zA-Z0-9]{1,8}$/.test(base)) return p;
  const normalized = base.endsWith('/') ? base : `${base}/`;
  return normalized + suffix;
}

function transform(content, file) {
  let next = content;
  let changes = 0;

  // href="/path" or href='/path'
  next = next.replace(/href=(["'])(\/[^"']*)\1/g, (m, q, href) => {
    if (href.startsWith('//')) return m;
    const fixed = ensureSlashOnPath(href);
    if (fixed !== href) {
      changes++;
      return `href=${q}${fixed}${q}`;
    }
    return m;
  });

  // href={`/articles/${a.slug}`} → href={`/articles/${a.slug}/`}
  next = next.replace(/href=\{`(\/[^`$]*?)(\$\{[^}]+\})(\/?)`\}/g, (m, pre, expr, slash) => {
    if (slash === '/') return m;
    // avoid double if pre already ends and we only need after expr
    changes++;
    return `href={\`${pre}${expr}/\`}`;
  });

  // new URL('/path', Astro.site) — only page-like paths
  next = next.replace(/new URL\((["'])(\/[^"']*)\1\s*,\s*Astro\.site\)/g, (m, q, p) => {
    if (/\.[a-zA-Z0-9]{1,8}$/.test(p)) return m; // assets
    const fixed = ensureSlashOnPath(p);
    if (fixed !== p) {
      changes++;
      return `new URL(${q}${fixed}${q}, Astro.site)`;
    }
    return m;
  });

  // new URL('/en/' ...) already ok; also item: new URL without Astro.site in some places
  next = next.replace(/item:\s*new URL\((["'])(\/[^"']*)\1\s*,\s*Astro\.site\)/g, (m, q, p) => {
    if (/\.[a-zA-Z0-9]{1,8}$/.test(p)) return m;
    const fixed = ensureSlashOnPath(p);
    if (fixed !== p) {
      changes++;
      return `item: new URL(${q}${fixed}${q}, Astro.site)`;
    }
    return m;
  });

  return { next, changes, file };
}

const files = walk(SRC);
let total = 0;
for (const f of files) {
  // skip the url helper itself
  if (f.endsWith(`${path.sep}lib${path.sep}url.ts`)) continue;
  const raw = fs.readFileSync(f, 'utf8');
  const { next, changes } = transform(raw, f);
  if (changes > 0) {
    fs.writeFileSync(f, next);
    total += changes;
    console.log(`fixed ${changes} in ${path.relative(ROOT, f)}`);
  }
}
console.log(`Done. Total fixes: ${total}`);
