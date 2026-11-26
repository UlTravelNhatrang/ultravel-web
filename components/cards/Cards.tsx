import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { vnd, type Eatery, type Hotel, type TourItem } from '@/content/catalog';
import { ROUTES } from '@/lib/routes';

/** "★ 4,6 (312)" — score with one decimal, Vietnamese comma. */
export function Rating({ value, count }: { value: number; count?: number }) {
  return (
    <span className="rate">
      <span className="rate-star" aria-hidden="true">★</span>
      <b>{value.toFixed(1).replace('.', ',')}</b>
      {count !== undefined && <span className="rate-n">({count})</span>}
      <span className="sr-only"> trên 5 điểm{count !== undefined ? `, ${count} đánh giá` : ''}</span>
    </span>
  );
}

/** "từ 1.250.000đ /đêm" with an optional struck-through old price. */
export function Price({ value, old, unit }: { value: number; old?: number; unit?: string }) {
  return (
    <p className="price">
      <span className="price-from">từ</span>
      {old && <s className="price-old">{vnd(old)}</s>}
      <b>{vnd(value)}</b>
      {unit && <span className="price-unit">/{unit}</span>}
    </p>
  );
}

/** Photo-on-top card shell used by hotels, tours and places. */
function Card({ href, photo, alt, badge, children }: { href: string; photo: string; alt: string; badge?: string; children: ReactNode }) {
  return (
    <Link href={href} className="pcard group">
      <div className="pcard-img">
        <Image src={photo} alt={alt} fill sizes="(max-width: 639px) 85vw, (max-width: 1023px) 45vw, 22vw" className="object-cover" />
        {badge && <span className="pcard-badge">{badge}</span>}
      </div>
      <div className="pcard-body">{children}</div>
    </Link>
  );
}

/** `base`: the listing the card opens under (hotels by default, resorts pass ROUTES.resorts). */
export function HotelCard({ h, base = ROUTES.hotels }: { h: Hotel; base?: string }) {
  return (
    <Card href={`${base}/${h.slug}`} photo={h.photo} alt={h.name} badge={h.badge}>
      <p className="pcard-meta"><span>{h.kind} · {'★'.repeat(h.stars)}</span><Rating value={h.rating} count={h.reviews} /></p>
      <h3 className="pcard-title">{h.name}</h3>
      <p className="pcard-sub">{h.area}</p>
      <Price value={h.price} old={h.oldPrice} unit="đêm" />
    </Card>
  );
}

export function TourCard({ t }: { t: TourItem }) {
  return (
    <Card href={`${ROUTES.tours}/${t.slug}`} photo={t.photo} alt={t.title} badge={t.badge}>
      <p className="pcard-meta"><span>{t.duration} · {t.area}</span><Rating value={t.rating} count={t.reviews} /></p>
      <h3 className="pcard-title">{t.title}</h3>
      <p className="pcard-sub">{t.group}</p>
      <Price value={t.price} old={t.oldPrice} unit="khách" />
    </Card>
  );
}

export function EateryCard({ e, href }: { e: Eatery; href: string }) {
  return (
    <Card href={href} photo={e.photo} alt={e.name}>
      <p className="pcard-meta"><span>{e.kind} · {e.area}</span><Rating value={e.rating} count={e.reviews} /></p>
      <h3 className="pcard-title">{e.name}</h3>
      <p className="pcard-sub">Mở {e.open}</p>
      <p className="price"><span className="price-from">khoảng</span><b>{e.price}</b><span className="price-unit">/người</span></p>
    </Card>
  );
}
