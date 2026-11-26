'use client';

import { useState } from 'react';
import { EateryCard, HotelCard, TourCard } from '@/components/cards/Cards';
import { EATERIES, HOTELS, RESORTS, TOURS } from '@/content/catalog';
import { SONG_XANH_CAFE } from '@/content/reviews/song-xanh-cafe';
import { reviewPath } from '@/lib/reviews';
import { ROUTES } from '@/lib/routes';
import { HomeHead } from './HomeHead';

/** Cards per tab: 4 columns × 2 rows on desktop. */
const PER_TAB = 8;

const TABS = [
  { key: 'tour', label: 'Tour', more: { href: ROUTES.tours, label: 'Xem tất cả tour' } },
  { key: 'hotel', label: 'Khách sạn', more: { href: ROUTES.hotels, label: 'Xem tất cả khách sạn' } },
  { key: 'resort', label: 'Resort', more: { href: ROUTES.resorts, label: 'Xem tất cả resort' } },
  { key: 'food', label: 'Nhà hàng', more: { href: ROUTES.restaurants, label: 'Xem tất cả nhà hàng' } },
] as const;
type Key = (typeof TABS)[number]['key'];

// Only Sóng Xanh has a review page so far; the others open the restaurant listing.
const eateryHref = (slug: string) => (slug === SONG_XANH_CAFE.slug ? reviewPath(SONG_XANH_CAFE) : ROUTES.restaurants);

/** "Booking": tours, hotels, resorts and restaurants, one tab at a time. */
export function Recommended() {
  const [tab, setTab] = useState<Key>('tour');
  const t = TABS.find(x => x.key === tab)!;

  return (
    <section className="wrap hsec" aria-labelledby="rec-t">
      <HomeHead id="rec-t" eyebrow="Booking" title={<>Đã đi thử, <em className="it">đáng để đặt</em></>} link={t.more} />
      <div className="rtabs mb-6" role="tablist" aria-label="Loại dịch vụ">
        {TABS.map(x => (
          <button key={x.key} type="button" role="tab" id={`rec-tab-${x.key}`} aria-selected={tab === x.key} aria-controls="rec-panel" onClick={() => setTab(x.key)}>{x.label}</button>
        ))}
      </div>
      <div id="rec-panel" role="tabpanel" aria-labelledby={`rec-tab-${tab}`} className="rgrid">
        {tab === 'tour' && TOURS.slice(0, PER_TAB).map(x => <TourCard key={x.slug} t={x} />)}
        {tab === 'hotel' && HOTELS.slice(0, PER_TAB).map(h => <HotelCard key={h.slug} h={h} />)}
        {tab === 'resort' && RESORTS.slice(0, PER_TAB).map(h => <HotelCard key={h.slug} h={h} base={ROUTES.resorts} />)}
        {tab === 'food' && EATERIES.slice(0, PER_TAB).map(e => <EateryCard key={e.slug} e={e} href={eateryHref(e.slug)} />)}
      </div>
    </section>
  );
}
