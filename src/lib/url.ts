/**
 * Site-wide URL helpers. Canonical form is always trailing-slash
 * (matches Astro trailingSlash: 'always' + sitemap loc).
 */

/** Ensure path ends with / (leave /, #anchors, and file-like paths alone). */
export function withTrailingSlash(path: string): string {
  if (!path || path === '/') return '/';
  // split hash / query so we only normalize the path segment
  const hashIdx = path.indexOf('#');
  const queryIdx = path.indexOf('?');
  let cut = path.length;
  if (hashIdx >= 0) cut = Math.min(cut, hashIdx);
  if (queryIdx >= 0) cut = Math.min(cut, queryIdx);
  const base = path.slice(0, cut);
  const suffix = path.slice(cut);
  if (!base || base === '/') return `/${suffix.replace(/^\//, '')}` || '/';
  // asset files (e.g. /og-default.png) keep as-is
  if (/\.[a-zA-Z0-9]{1,8}$/.test(base)) return path;
  const normalized = base.endsWith('/') ? base : `${base}/`;
  return normalized + suffix;
}

/** Absolute site URL with trailing slash on the path. */
export function absoluteUrl(path: string, site: URL | string | undefined): string {
  const base = typeof site === 'string' ? site : site?.href ?? 'https://metaup.pro/';
  return new URL(withTrailingSlash(path), base).href;
}
