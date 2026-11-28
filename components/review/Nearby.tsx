import type { ReactNode } from 'react';
import { MapPin, ForkKnife, Camera } from '@phosphor-icons/react/dist/ssr';
import { MAP_BACKGROUND, NhaTrangMap } from '@/components/ui/NhaTrangMap';
import { directionsUrl } from '@/lib/reviews';
import type { NearbyPlace, Review } from '@/types/review';
import { ReviewSection } from './ReviewSection';

function NearbyList({ title, icon, items }: { title: string; icon: ReactNode; items: NearbyPlace[] }) {
  return (
    <div className="soft-card p-5">
      <h3 className="hd text-lg flex items-center gap-2">{icon}{title}</h3>
      <ul className="mt-3 divide-y divide-navy/10">
        {items.map(n => (
          <li key={n.name} className="flex items-baseline justify-between gap-3 py-2.5">
            <span><span className="font-semibold">{n.name}</span> <span className="text-ink/70 text-sm">· {n.kind}</span></span>
            <span className="caption text-ink/70 shrink-0">{n.distance}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The place on the shared illustrated map, with its address and a Google Maps link. */
export function LocationMap({ review: r, className = '' }: { review: Review; className?: string }) {
  return (
    <div className={`relative soft-card overflow-hidden ${className}`} style={{ background: MAP_BACKGROUND }}>
      <NhaTrangMap pins={[{ x: r.map.x, y: r.map.y, label: '★', active: true }]} label={`Vị trí ${r.name} trên bản đồ minh họa`} className="absolute inset-x-0 top-0 bottom-12 w-full h-[calc(100%-3rem)]" />
      <div className="absolute left-3 right-3 bottom-3 flex justify-between items-center gap-3 caption bg-white/90 rounded-[10px] pl-4 pr-1.5 py-1.5">
        <span className="text-ink/70 truncate inline-flex items-center gap-1.5"><MapPin size={14} aria-hidden="true" />{r.address}</span>
        <a href={directionsUrl(r)} target="_blank" rel="noopener noreferrer" className="shrink-0 text-navy font-semibold hover:bg-navy hover:text-white bg-white rounded-[8px] px-3 py-1.5">Google Maps <span className="arr">→</span></a>
      </div>
    </div>
  );
}

/** What is within walking distance. On desktop the map sits in the sidebar; on phones it opens this section. */
export function Nearby({ review: r }: { review: Review }) {
  return (
    <ReviewSection id="vi-tri" title="Vị trí & xung quanh">
      <LocationMap review={r} className="lg:hidden min-h-[20rem] mb-[var(--card-gap)]" />
      <div className="grid md:grid-cols-2 gap-[var(--card-gap)]">
        <NearbyList title="Quán ăn gần đây" icon={<ForkKnife size={18} aria-hidden="true" />} items={r.nearbyFood} />
        <NearbyList title="Điểm tham quan gần đây" icon={<Camera size={18} aria-hidden="true" />} items={r.nearbySights} />
      </div>
    </ReviewSection>
  );
}
