/** Day numbers follow Date#getDay(): 0 = Chủ nhật, 1 = Thứ 2 … 6 = Thứ 7. */
export type OpeningHours = { label: string; days: number[]; open: string; close: string };

export type TravellerType = 'Cặp đôi' | 'Gia đình' | 'Nhóm bạn' | 'Đi một mình';

export type GuestReview = {
  name: string;
  type: TravellerType;
  stars: 1 | 2 | 3 | 4 | 5;
  /** dd.mm.yyyy */
  date: string;
  text: string;
};

export type NearbyPlace = { name: string; kind: string; distance: string };

export type Review = {
  slug: string;
  city: 'nha-trang';
  category: 'an-gi' | 'uong-gi' | 'choi-gi';
  /** Name used for this place in the homepage hub, so hub cards can link here. */
  hubName: string;
  name: string;
  /** Sub-category shown in the breadcrumb and rank, e.g. "Cà phê view biển". */
  kind: string;

  rating: number;
  reviewCount: number;
  /** Counts for 5★ down to 1★. */
  histogram: [number, number, number, number, number];
  rank: number;
  priceLevel: string;

  address: string;
  phone: string;
  zalo: string;
  website: string;
  /** Position on the illustrated Nha Trang map (same coordinates as the hub). */
  map: { x: number; y: number };
  hours: OpeningHours[];

  score: {
    total: number;
    verdict: string;
    /** dd.mm.yyyy */
    checkedAt: string;
    method: string;
    parts: { label: string; value: number }[];
  };

  intro: string;
  facts: { label: string; value: string }[];
  tags: string[];
  pros: string[];
  cons: string[];

  menu: { item: string; note?: string; price: string }[];
  menuCheckedAt: string;

  photos: { src: string; alt: string }[];
  photoCount: number;

  guestReviews: GuestReview[];
  nearbyFood: NearbyPlace[];
  nearbySights: NearbyPlace[];
  faq: { q: string; a: string }[];
  voucher?: { code: string; title: string; terms: string; expires: string };
};
