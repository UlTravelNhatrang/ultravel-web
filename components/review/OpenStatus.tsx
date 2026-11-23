'use client';

import { useSyncExternalStore } from 'react';
import { openStatus } from '@/lib/reviews';
import type { OpeningHours } from '@/types/review';

// Re-check every minute so a tab left open flips from open to closed on time.
const subscribe = (cb: () => void) => { const t = setInterval(cb, 60_000); return () => clearInterval(t); };
const minuteNow = () => Math.floor(Date.now() / 60_000);
const serverNow = () => null;

/** "● Đang mở · đến 22:00". Rendered in the browser only, because it depends on the visitor's clock. */
export function OpenStatus({ hours, className = '' }: { hours: OpeningHours[]; className?: string }) {
  const minute = useSyncExternalStore(subscribe, minuteNow, serverNow);
  if (minute === null) return <span className={`${className} text-ink2`}>Giờ mở cửa</span>;
  const s = openStatus(hours, new Date(minute * 60_000));
  // data-open lets a container style the status (e.g. the contact card's pill) without re-checking the clock.
  return <span data-open={s.open} className={`${className} ${s.open ? 'text-[#0f7a5a] font-semibold' : 'text-ink2'}`}>{s.open ? '● ' : ''}{s.text}</span>;
}
