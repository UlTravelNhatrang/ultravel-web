/** [discount, title, code, expiry dd.mm.yyyy] */
export type Voucher = [discount: string, title: string, code: string, expires: string];

/** [title, kicker] */
export type GuideCard = [title: string, kicker: string];

/** One place in the local hub list, with its spot on the illustrated map. */
export type Place = [
  name: string,
  kind: string,
  area: string,
  price: string,
  opensAt: number,
  closesAt: number,
  tip: string,
  mapX: number,
  mapY: number,
  rating: number,
];

export type Area = string;

/** [city, article count] */
export type Destination = [city: string, posts: number];

/** [dish, category] */
export type FoodItem = [name: string, category: string];

/** [title, date dd.mm.yyyy, author] */
export type FeedPost = [title: string, date: string, author: string];

/** [title, price, duration, detail, photo] */
export type Tour = [title: string, price: string, duration: string, detail: string, photo: string];

/** [network badge, handle, quote] */
export type SocialPost = [network: string, handle: string, quote: string];

/** One question and its answer (review, post and B2B FAQs). The answer may use **bold** and [links](/path). */
export type FaqItem = { q: string; a: string };
