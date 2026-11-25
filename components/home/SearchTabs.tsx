'use client';

import Form from 'next/form';
import { useState, type ReactNode } from 'react';
import { AREAS } from '@/content/home';
import { TOP_DESTINATIONS } from '@/content/catalog';
import { ROUTES } from '@/lib/routes';

type TabKey = 'hotel' | 'tour' | 'food' | 'place';
const TABS: { key: TabKey; label: string; action: string; cta: string }[] = [
  { key: 'hotel', label: 'Khách sạn', action: ROUTES.hotels, cta: 'Tìm khách sạn' },
  { key: 'tour', label: 'Tour', action: ROUTES.tours, cta: 'Tìm tour' },
  { key: 'food', label: 'Ăn uống', action: ROUTES.food, cta: 'Tìm quán' },
  { key: 'place', label: 'Điểm đến', action: ROUTES.places, cta: 'Khám phá' },
];
const PEOPLE = [1, 2, 3, 4, 5, 6];

/** One labelled cell of the search bar. */
function Cell({ id, label, children, wide = false }: { id: string; label: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`sb-cell ${wide ? 'is-wide' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}

/** Destination field shared by tabs; `id="q"` on the first tab so the header's "/" shortcut focuses it. */
function Where({ id, label = 'Điểm đến', placeholder = 'Bạn muốn đi đâu?' }: { id: string; label?: string; placeholder?: string }) {
  return (
    <Cell id={id} label={label} wide>
      <input id={id} name="q" list="sb-dest" placeholder={placeholder} autoComplete="off" />
    </Cell>
  );
}

/**
 * Hero search: tabs for hotels, tours, food and places, each a GET form to its listing page
 * (next/form navigates on the client and keeps the query string).
 */
export function SearchTabs() {
  const [tab, setTab] = useState<TabKey>('hotel');
  const t = TABS.find(x => x.key === tab)!;

  return (
    <div className="sb">
      <div className="sb-tabs" role="tablist" aria-label="Bạn muốn tìm">
        {TABS.map(x => (
          <button key={x.key} type="button" role="tab" id={`sb-tab-${x.key}`} aria-selected={tab === x.key} aria-controls="sb-panel" onClick={() => setTab(x.key)}>
            {x.label}
          </button>
        ))}
      </div>

      <Form id="sb-panel" role="tabpanel" aria-labelledby={`sb-tab-${tab}`} action={t.action} className="sb-form" key={tab}>
        {tab === 'hotel' && (
          <>
            <Where id="q" />
            <Cell id="sb-in" label="Nhận phòng"><input id="sb-in" name="in" type="date" /></Cell>
            <Cell id="sb-out" label="Trả phòng"><input id="sb-out" name="out" type="date" /></Cell>
            <Cell id="sb-guests" label="Khách"><select id="sb-guests" name="guests" defaultValue="2">{PEOPLE.map(n => <option key={n} value={n}>{n} người</option>)}</select></Cell>
          </>
        )}
        {tab === 'tour' && (
          <>
            <Where id="q" />
            <Cell id="sb-date" label="Ngày đi"><input id="sb-date" name="date" type="date" /></Cell>
            <Cell id="sb-type" label="Loại tour">
              <select id="sb-type" name="type" defaultValue=""><option value="">Tất cả</option><option>Biển đảo</option><option>Thành phố</option><option>Trải nghiệm</option></select>
            </Cell>
            <Cell id="sb-people" label="Số người"><select id="sb-people" name="people" defaultValue="2">{PEOPLE.map(n => <option key={n} value={n}>{n} người</option>)}</select></Cell>
          </>
        )}
        {tab === 'food' && (
          <>
            <Where id="q" label="Món hoặc quán" placeholder="Bún sứa, hải sản, cà phê…" />
            <Cell id="sb-area" label="Khu vực"><select id="sb-area" name="area" defaultValue="">{AREAS.map(a => <option key={a} value={a === 'Tất cả' ? '' : a}>{a}</option>)}</select></Cell>
            <Cell id="sb-budget" label="Ngân sách">
              <select id="sb-budget" name="budget" defaultValue=""><option value="">Mọi mức</option><option value="low">Dưới 100k</option><option value="mid">100–300k</option><option value="high">Trên 300k</option></select>
            </Cell>
          </>
        )}
        {tab === 'place' && <Where id="q" label="Điểm đến" placeholder="Nha Trang, Đà Lạt, Phú Quốc…" />}
        <button type="submit" className="sb-go">{t.cta} <span aria-hidden="true">→</span></button>
      </Form>

      <datalist id="sb-dest">{TOP_DESTINATIONS.map(d => <option key={d.name} value={d.name} />)}</datalist>
    </div>
  );
}
