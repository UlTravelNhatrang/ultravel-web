/**
 * Places in the hub and posts in the feed that don't have their own page yet still open the
 * original demo. Point them at real routes as those pages are written.
 */
export const LEGACY_DEMO = '/legacy/layout-demo.html';
export const legacy = (view: 'review' | 'post') => `${LEGACY_DEMO}#${view}`;

export const ROUTES = {
  guides: '/cam-nang',
  food: '/am-thuc/',
  places: '/diem-den/',
  itineraries: '/lich-trinh/',
  services: '/dich-vu/',
  b2b: '/marketing-du-lich',
  b2bContact: '/marketing-du-lich#lien-he',
} as const;
