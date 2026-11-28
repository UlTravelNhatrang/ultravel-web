'use client';

import { useState, type CSSProperties } from 'react';
import type { Review, TravellerType } from '@/types/review';
import { ReviewSection } from './ReviewSection';
import { Stars } from './Stars';

const FILTERS: ('Tất cả' | TravellerType)[] = ['Tất cả', 'Cặp đôi', 'Gia đình', 'Nhóm bạn', 'Đi một mình'];
const PAGE = 3;

/** Rating summary, traveller-type filter and review cards, three at a time. */
export function GuestReviews({ review: r }: { review: Review }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('Tất cả');
  const [count, setCount] = useState(PAGE);
  const list = r.guestReviews.filter(g => filter === 'Tất cả' || g.type === filter);
  const max = Math.max(...r.histogram);

  return (
    <ReviewSection id="danh-gia" title="Đánh giá từ khách" aside={<button type="button" data-open-review className="act-btn act-btn-hot">Viết đánh giá</button>}>
      <div className="soft-card p-5 md:p-6 grid md:grid-cols-[12rem_1fr] gap-6 items-center">
        <div>
          <p className="num text-5xl leading-none">{r.rating.toFixed(1).replace('.', ',')}</p>
          <div className="mt-2"><Stars value={r.rating} size={18} /></div>
          <p className="caption text-ink/70 mt-2">{r.reviewCount} đánh giá</p>
        </div>
        <ul className="grid gap-2" aria-label="Phân bố số sao">
          {r.histogram.map((n, i) => (
            <li key={i} className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center gap-3 caption">
              <span>{5 - i} ★</span>
              <span className="meter meter-thin" style={{ '--v': n / max } as CSSProperties}><i /></span>
              <span className="text-right text-ink/70 tabular-nums">{n}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2 mt-6" role="group" aria-label="Lọc theo loại khách">
        {FILTERS.map(f => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => { setFilter(f); setCount(PAGE); }} className={`filter-chip ${filter === f ? 'is-on' : ''}`}>{f}</button>
        ))}
      </div>

      <ul className="grid gap-[var(--card-gap)] mt-5">
        {list.slice(0, count).map(g => (
          <li key={g.name + g.date} className="soft-card p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="avatar" aria-hidden="true">{g.name.split(' ').pop()?.[0]}</span>
              <span className="font-semibold">{g.name}</span>
              <span className="tag-chip">{g.type}</span>
              <span className="ml-auto caption text-ink/70"><time dateTime={g.date.split('.').reverse().join('-')}>{g.date}</time></span>
            </div>
            <div className="mt-3 flex items-center gap-2"><Stars value={g.stars} /><span className="sr-only">{g.stars} trên 5 sao</span></div>
            <p className="mt-2 leading-relaxed text-ink/85">{g.text}</p>
          </li>
        ))}
        {!list.length && <li className="soft-card p-8 text-center text-ink/70">Chưa có đánh giá từ nhóm khách này.</li>}
      </ul>

      {count < list.length && (
        <button type="button" onClick={() => setCount(c => c + PAGE)} className="bx w-full mt-5 py-3 caption text-[12px] font-semibold">
          Xem thêm đánh giá ({list.length - count})
        </button>
      )}
    </ReviewSection>
  );
}
