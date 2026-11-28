'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { ArrowUpRight, Check, Clock, Copy, Globe, MapPin, NavigationArrow, Phone } from '@phosphor-icons/react';
import { ZaloIcon } from '@/components/ui/ZaloIcon';
import { copyText } from '@/lib/clipboard';
import { directionsUrl, zaloUrl } from '@/lib/reviews';
import type { Review } from '@/types/review';
import { OpenStatus } from './OpenStatus';

// Today's weekday (0 = Sunday) in the visitor's timezone; null while prerendering and hydrating.
const subscribe = (cb: () => void) => { const t = setInterval(cb, 60_000); return () => clearInterval(t); };
const useWeekday = () => useSyncExternalStore(subscribe, () => new Date().getDay(), () => null);

function CopyButton({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = () => {
    copyText(value).then(ok => {
      if (!ok) return;
      setDone(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setDone(false), 1800);
    });
  };
  return (
    <button type="button" onClick={copy} className={`ct-action ${done ? 'is-done' : ''}`} aria-label={`Sao chép ${label}`} title={`Sao chép ${label}`}>
      {done ? <Check size={15} weight="bold" aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">{done ? 'Đã sao chép' : ''}</span>
    </button>
  );
}

function InfoRow({ icon, label, children, action }: { icon: ReactNode; label: string; children: ReactNode; action?: ReactNode }) {
  return (
    <li className="ct-row">
      <span className="ct-ico" aria-hidden="true">{icon}</span>
      <div className="ct-value min-w-0"><span className="sr-only">{label}: </span>{children}</div>
      {action}
    </li>
  );
}

/** Contact, this week's hours (today highlighted) and the main actions: book via Zalo, directions, call. */
export function ContactCard({ review: r }: { review: Review }) {
  const today = useWeekday();
  const site = /^https?:\/\//.test(r.website) ? r.website : `https://${r.website}`;
  const tel = `tel:${r.phone.replace(/[^\d+]/g, '')}`;

  return (
    <div className="contact-card soft-card">
      <div className="flex items-center justify-between gap-3">
        <h2 className="hd text-xl">Liên hệ</h2>
        <OpenStatus hours={r.hours} className="status-pill caption" />
      </div>

      <ul className="ct-list">
        <InfoRow icon={<MapPin size={17} />} label="Địa chỉ" action={<CopyButton value={r.address} label="địa chỉ" />}>
          {r.address}
        </InfoRow>
        <InfoRow icon={<Phone size={17} />} label="Điện thoại" action={<CopyButton value={r.phone} label="số điện thoại" />}>
          <a href={tel} className="ct-link tabular-nums">{r.phone}</a>
        </InfoRow>
        <InfoRow
          icon={<Globe size={17} />}
          label="Website"
          action={<a href={site} target="_blank" rel="noopener noreferrer" className="ct-action" aria-label={`Mở ${r.website} trong tab mới`} tabIndex={-1}><ArrowUpRight size={15} aria-hidden="true" /></a>}
        >
          <a href={site} target="_blank" rel="noopener noreferrer" className="ct-link break-all">
            {r.website.replace(/^https?:\/\//, '')}<span className="sr-only"> (mở trong tab mới)</span>
          </a>
        </InfoRow>
        <InfoRow icon={<Clock size={17} />} label="Giờ mở cửa">
          <dl className="ct-hours">
            {r.hours.map(h => {
              const isToday = today !== null && h.days.includes(today);
              return (
                <div key={h.label} className={isToday ? 'is-today' : ''}>
                  <dt>{h.label}{isToday && <span className="sr-only"> (hôm nay)</span>}</dt>
                  <dd className="caption tabular-nums">{h.open}–{h.close}</dd>
                </div>
              );
            })}
          </dl>
        </InfoRow>
      </ul>

      <div className="grid gap-2">
        <a href={zaloUrl(r.zalo)} target="_blank" rel="noopener noreferrer" className="ct-primary">
          <span className="ct-zalo"><ZaloIcon size={22} /></span>
          <span className="flex-1">Đặt bàn qua Zalo</span>
          <span className="ct-primary-arr" aria-hidden="true"><ArrowUpRight size={14} weight="bold" /></span>
        </a>
        <div className="grid grid-cols-2 gap-2">
          <a href={directionsUrl(r)} target="_blank" rel="noopener noreferrer" className="ct-secondary"><NavigationArrow size={15} aria-hidden="true" />Chỉ đường</a>
          <a href={tel} className="ct-secondary"><Phone size={15} aria-hidden="true" />Gọi quán</a>
        </div>
      </div>
    </div>
  );
}
