import { SONG_XANH_CAFE } from '@/content/reviews/song-xanh-cafe';
import type { OpeningHours, Review } from '@/types/review';

/** All published reviews. Swap this list for a CMS query later; callers stay the same. */
const REVIEWS: Review[] = [SONG_XANH_CAFE];

export const CITY_LABEL: Record<Review['city'], string> = { 'nha-trang': 'Nha Trang' };
export const CATEGORY_LABEL: Record<Review['category'], string> = { 'an-gi': 'Ăn gì', 'uong-gi': 'Uống gì', 'choi-gi': 'Chơi gì' };

export const reviewPath = (r: Pick<Review, 'city' | 'category' | 'slug'>) => `/${r.city}/${r.category}/${r.slug}`;

export const getReview = (city: string, category: string, slug: string) =>
  REVIEWS.find(r => r.city === city && r.category === category && r.slug === slug);

/** Every published review (sitemaps, page-title lookups). */
export const listReviews = () => REVIEWS;

/** A review by its slug alone (e.g. a place mentioned in a post). */
export const getReviewBySlug = (slug: string) => REVIEWS.find(r => r.slug === slug);

export const reviewParams = () => REVIEWS.map(({ city, category, slug }) => ({ city, category, slug }));

/** Link for a homepage hub place, if it has a review yet. */
export const reviewHrefForPlace = (hubName: string) => {
  const r = REVIEWS.find(x => x.hubName === hubName);
  return r ? reviewPath(r) : null;
};

export const directionsUrl = (r: Pick<Review, 'name' | 'address'>) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${r.name}, ${r.address}`)}`;

export const zaloUrl = (zalo: string) => `https://zalo.me/${zalo}`;

const toMinutes =(hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Open-now status for a weekly schedule. Browser-only: it reads the visitor's clock. */
export function openStatus(hours: OpeningHours[], now = new Date()) {
  const today = hours.find(h => h.days.includes(now.getDay()));
  const mins = now.getHours() * 60 + now.getMinutes();
  if (today && mins >= toMinutes(today.open) && mins < toMinutes(today.close)) {
    return { open: true, text: `Đang mở · đến ${today.close}` };
  }
  const tomorrow = hours.find(h => h.days.includes((now.getDay() + 1) % 7));
  const opensAt = today && mins < toMinutes(today.open) ? today.open : tomorrow?.open;
  return { open: false, text: opensAt ? `Đã đóng · mở lúc ${opensAt}` : 'Đã đóng' };
}
