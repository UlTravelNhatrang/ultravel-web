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

/** One question and its answer (review, post and B2B FAQs). The answer may use **bold** and [links](/path). */
export type FaqItem = { q: string; a: string };
