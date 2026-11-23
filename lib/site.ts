/**
 * Public address of the site. Social previews, canonical links and structured data need absolute URLs.
 * Set NEXT_PUBLIC_SITE_URL for staging; production defaults to the real domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ultravel.vn').replace(/\/$/, '');

/** "/cam-nang/x" -> "https://ultravel.vn/cam-nang/x"; absolute URLs pass through unchanged. */
export const absUrl = (path: string) => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`);

/** BreadcrumbList structured data: every crumb gets an absolute `item` URL, as Google requires. */
export const breadcrumbLd = (crumbs: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absUrl(c.path) })),
});
