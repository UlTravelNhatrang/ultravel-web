'use client';

import Link from 'next/link';
import { useState } from 'react';
import { EateryCard, HotelCard, TourCard } from '@/components/cards/Cards';
import { HOTELS, RESORTS, RESTAURANTS, TOURS } from '@/content/catalog';
import { ROUTES } from '@/lib/routes';
import { HomeHead } from './HomeHead';

const TABS = [
  { key: 'tour', label: 'Tour', more: { href: ROUTES.tours, label: 'Xem tất cả tour' } },
  { key: 'hotel', label: 'Khách sạn', more: { href: ROUTES.hotels, label: 'Xem tất cả khách sạn' } },
  { key: 'resort', label: 'Resort', more: { href: ROUTES.resorts, label: 'Xem tất cả resort' } },
  { key: 'restaurant', label: 'Nhà hàng', more: { href: ROUTES.food, label: 'Xem tất cả nhà hàng' } },
] as const;
type Key = (typeof TABS)[number]['key'];

/** Two rows of four on desktop; "Xem thêm" reveals the rest of the tab. */
const FIRST = 8;

/** "Booking": tours, hotels, resorts and restaurants, one tab at a time: two rows first, the rest on "Xem thêm". */
export function Recommended() {
  const [tab, setTab] = useState<Key>('tour');
  const [all, setAll] = useState(false);
  const t = TABS.find(x => x.key === tab)!;
  const cards = {
    tour: TOURS.map(x => <TourCard key={x.slug} t={x} />),
    hotel: HOTELS.map(h => <HotelCard key={h.slug} h={h} />),
    resort: RESORTS.map(h => <HotelCard key={h.slug} h={h} />),
    restaurant: RESTAURANTS.map(e => <EateryCard key={e.slug} e={e} href={ROUTES.food} />),
  }[tab];

  return (
    <section className="wrap hsec" aria-labelledby="rec-t">
      <HomeHead id="rec-t" eyebrow="Booking" link={t.more} />
      <div className="rtabs mb-6" role="tablist" aria-label="Loại dịch vụ">
        {TABS.map(x => (
          <button key={x.key} type="button" role="tab" id={`rec-tab-${x.key}`} aria-selected={tab === x.key} aria-controls="rec-panel" onClick={() => { setTab(x.key); setAll(false); }}>{x.label}</button>
        ))}
      </div>
      <div id="rec-panel" role="tabpanel" aria-labelledby={`rec-tab-${tab}`} className="rgrid">
        {all ? cards : cards.slice(0, FIRST)}
      </div>
      <div className="rmore">
        {all || cards.length <= FIRST ? (
          <Link href={t.more.href} className="btn btn-secondary">{t.more.label} <span className="arr" aria-hidden="true">→</span></Link>
        ) : (
          <button type="button" className="btn btn-secondary" onClick={() => setAll(true)} aria-controls="rec-panel">Xem thêm {cards.length - FIRST} {t.label.toLowerCase()} <span aria-hidden="true">↓</span></button>
        )}
      </div>
    </section>
  );
}
