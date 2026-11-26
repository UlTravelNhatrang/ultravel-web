import { MapPin } from '@phosphor-icons/react/dist/ssr';
import { MAP_BACKGROUND, NhaTrangMap } from '@/components/ui/NhaTrangMap';
import { directionsUrl } from '@/lib/reviews';
import type { Review } from '@/types/review';

/** Where the place is: the illustrated map cropped around its pin, the address and a Google Maps link. */
export function LocationCard({ review: r }: { review: Review }) {
  return (
    <div className="loc-card soft-card">
      <div className="loc-map" style={{ background: MAP_BACKGROUND }}>
        <NhaTrangMap pins={[{ x: r.map.x, y: r.map.y, label: '★', active: true }]} focusY={r.map.y} label={`Vị trí ${r.name} trên bản đồ minh họa`} />
      </div>
      <div className="loc-foot">
        <span className="text-[13.5px] text-ink2 leading-snug inline-flex items-start gap-1.5 min-w-0"><MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" />{r.address}</span>
        <a href={directionsUrl(r)} target="_blank" rel="noopener noreferrer" className="ct-secondary shrink-0 px-3.5 h-9">
          Google Maps <span aria-hidden="true">↗</span><span className="sr-only"> (mở trong tab mới)</span>
        </a>
      </div>
    </div>
  );
}
