import Link from 'next/link';
import { memo } from 'react';
import { Photo } from '@/components/ui/Photo';
import { reviewHrefForPlace } from '@/lib/reviews';
import { PHOTOS } from '@/content/photos';
import type { Place } from '@/types/content';
import { isOpenAt, pad } from '@/lib/format';
import { legacy } from '@/lib/routes';

const placePhotos = [PHOTOS.place1, PHOTOS.place2, PHOTOS.place3] as const;

type PlaceCardProps = {
  place: Place;
  /** Position in the filtered list (drives the number and the map pin). */
  index: number;
  /** Position in the full tab list (keeps the same photo when filtering). */
  photoIndex: number;
  tab: 1 | 2 | 3;
  hour: number | null;
  /** Map pin highlight in the hub; optional elsewhere. */
  onHover?: (i: number | null) => void;
};

/**
 * Tabs 02-04: compact horizontal place card with live open/closed status. Memoised: hovering a card
 * re-renders the hub (to light its map pin), and the other cards' props haven't changed.
 */
export const PlaceCard = memo(function PlaceCard({ place, index, photoIndex, tab, hour, onHover }: PlaceCardProps) {
  const [name, kind, area, price, opensAt, closesAt, tip, , , rating] = place;
  const open = hour !== null && isOpenAt(hour, opensAt, closesAt);
  const hours = `${pad(opensAt)}-${pad(closesAt)}h`;
  // Places with a full review open it; the rest still point at the old demo.
  const reviewHref = reviewHrefForPlace(name);
  return (
    <article className="hc group flex gap-4 p-3 bg-white/60 hover:bg-white/90 rounded-[var(--card-r)] shadow-[inset_0_0_0_1px_rgb(1_44_121/.06),0_18px_40px_-30px_rgb(1_44_121/.45)]" onMouseEnter={() => onHover?.(index)} onMouseLeave={() => onHover?.(null)}>
      <Photo src={placePhotos[tab - 1][photoIndex]} alt={name} width={128} height={128} sizes="128px" className="w-28 h-28 xl:w-32 xl:h-32 shrink-0 rounded-2xl" />
      <div className="min-w-0 flex-1 flex flex-col py-0.5">
        <div className="flex items-start gap-2">
          <span className="num w-6 h-6 rounded-full bg-ink text-paper text-[11px] grid place-items-center shrink-0 mt-0.5">{pad(index + 1)}</span>
          <h3 className="font-display font-bold text-[17px] leading-tight group-hover:text-red">
            {reviewHref ? <Link href={reviewHref}>{name}</Link> : <a className="orig" href={legacy('review')}>{name}</a>}
          </h3>
        </div>
        <div className="flex justify-between gap-2 mono text-ink2 mt-1.5"><span className="truncate">{kind} / {area}</span><span className="shrink-0">★ {rating}</span></div>
        <p className="text-[13px] leading-snug mt-1.5 text-ink/80 line-clamp-2">{tip}</p>
        <div className="flex justify-between gap-2 mono mt-auto pt-2">
          <span className="font-semibold">{price}</span>
          {hour === null ? (
            <span className="text-ink2">{hours}</span>
          ) : (
            <span className={open ? 'font-semibold text-[#0f7a5a]' : 'text-ink2 line-through'}>{open ? '● Mở' : 'Đóng'} {hours}</span>
          )}
        </div>
      </div>
    </article>
  );
});
