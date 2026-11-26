import type { ReactNode } from 'react';
import { Camera, ForkKnife } from '@phosphor-icons/react/dist/ssr';
import type { NearbyPlace, Review } from '@/types/review';
import { LocationCard } from './LocationCard';
import { ReviewSection } from './ReviewSection';

function NearbyList({ title, icon, items }: { title: string; icon: ReactNode; items: NearbyPlace[] }) {
  return (
    <div className="soft-card p-5">
      <h3 className="hd text-lg flex items-center gap-2">{icon}{title}</h3>
      <ul className="mt-3 divide-y divide-ink/10">
        {items.map(n => (
          <li key={n.name} className="flex items-baseline justify-between gap-3 py-2.5">
            <span><span className="font-semibold">{n.name}</span> <span className="text-ink2 text-sm">· {n.kind}</span></span>
            <span className="mono text-ink2 shrink-0">{n.distance}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** What is within walking distance, side by side. The map lives in the sidebar (phones: on top of this section). */
export function Nearby({ review: r }: { review: Review }) {
  return (
    <ReviewSection id="vi-tri" title="Vị trí & xung quanh">
      <div className="lg:hidden mb-[var(--card-gap)]"><LocationCard review={r} /></div>
      <div className="grid md:grid-cols-2 gap-[var(--card-gap)] items-start">
        <NearbyList title="Quán ăn gần đây" icon={<ForkKnife size={18} aria-hidden="true" />} items={r.nearbyFood} />
        <NearbyList title="Điểm tham quan gần đây" icon={<Camera size={18} aria-hidden="true" />} items={r.nearbySights} />
      </div>
    </ReviewSection>
  );
}
