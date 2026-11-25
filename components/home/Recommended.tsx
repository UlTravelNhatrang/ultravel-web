'use client';

import { useState } from 'react';
import { EateryCard, HotelCard, TourCard } from '@/components/cards/Cards';
import { EATERIES, HOTELS, TOURS } from '@/content/catalog';
import { SONG_XANH_CAFE } from '@/content/reviews/song-xanh-cafe';
import { reviewPath } from '@/lib/reviews';
import { ROUTES } from '@/lib/routes';
import { HomeHead } from './HomeHead';

const TABS = [
  { key: 'hotel', label: 'Khách sạn', more: { href: ROUTES.hotels, label: 'Xem tất cả khách sạn' } },
  { key: 'tour', label: 'Tour', more: { href: ROUTES.tours, label: 'Xem tất cả tour' } },
  { key: 'food', label: 'Ăn uống', more: { href: ROUTES.food, label: 'Xem tất cả quán' } },
] as const;
type Key = (typeof TABS)[number]['key'];

// Only Sóng Xanh has a review page so far; the others open the food listing.
const eateryHref = (slug: string) => (slug === SONG_XANH_CAFE.slug ? reviewPath(SONG_XANH_CAFE) : ROUTES.food);

/** "Gợi ý cho bạn": hotels, tours and places to eat, one tab at a time. */
export function Recommended() {
  const [tab, setTab] = useState<Key>('hotel');
  const t = TABS.find(x => x.key === tab)!;

  return (
    <section className="wrap hsec" aria-labelledby="rec-t">
      <HomeHead id="rec-t" eyebrow="Gợi ý cho bạn" title={<>Đã đi thử, <em className="it">đáng để đặt</em></>} link={t.more} />
      <div className="rtabs mb-6" role="tablist" aria-label="Loại gợi ý">
        {TABS.map(x => (
          <button key={x.key} type="button" role="tab" id={`rec-tab-${x.key}`} aria-selected={tab === x.key} aria-controls="rec-panel" onClick={() => setTab(x.key)}>{x.label}</button>
        ))}
      </div>
      <div id="rec-panel" role="tabpanel" aria-labelledby={`rec-tab-${tab}`} className="rgrid">
        {tab === 'hotel' && HOTELS.map(h => <HotelCard key={h.slug} h={h} />)}
        {tab === 'tour' && TOURS.map(x => <TourCard key={x.slug} t={x} />)}
        {tab === 'food' && EATERIES.map(e => <EateryCard key={e.slug} e={e} href={eateryHref(e.slug)} />)}
      </div>
    </section>
  );
}
