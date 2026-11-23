'use client';

import { PlaceCard } from '@/components/home/local-hub/HubCards';
import { AsideNote, Section, SectionHeader, SectionTitle } from '@/components/ui/Section';
import { PLACES } from '@/content/home';
import { useHour } from '@/lib/use-hour';
import type { Review } from '@/types/review';

const TAB_FOR: Record<Review['category'], 1 | 2 | 3> = { 'an-gi': 1, 'uong-gi': 2, 'choi-gi': 3 };

/** Other places in the same hub tab, shown with the same cards as the homepage hub. */
export function SimilarPlaces({ review: r }: { review: Review }) {
  // Opening hours depend on the visitor's clock: null while prerendering, the real hour once in the browser.
  const hour = useHour();
  const tab = TAB_FOR[r.category];
  const all = PLACES[tab];
  const others = all.filter(p => p[0] !== r.hubName);

  return (
    <Section labelledBy="similarTitle">
      <SectionHeader label={`Quán tương tự / ${r.kind}`} aside={<AsideNote>Nha Trang</AsideNote>} />
      <SectionTitle id="similarTitle">Quán tương tự ở Nha Trang</SectionTitle>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[var(--card-gap)]">
        {others.map((p, i) => (
          <div key={p[0]} className="float-in">
            <PlaceCard place={p} index={i} photoIndex={all.indexOf(p)} tab={tab} hour={hour} />
          </div>
        ))}
      </div>
    </Section>
  );
}
