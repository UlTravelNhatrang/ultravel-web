import { MAP_BACKGROUND, NhaTrangMap } from '@/components/ui/NhaTrangMap';
import type { Place } from '@/types/content';
import { pad } from '@/lib/format';

/** Hub map: pins follow the list; the hovered card's pin grows and turns orange. */
export function HubMap({ places, active }: { places: Place[]; active: number | null }) {
  const pins = places.map((p, i) => ({ x: p[7], y: p[8], label: pad(i + 1), active: active === i }));
  return (
    <div className="hidden lg:block lg:col-span-4 relative min-h-[22rem]" style={{ background: MAP_BACKGROUND }}>
      <NhaTrangMap pins={pins} className="absolute inset-x-0 top-0 bottom-12 w-full h-[calc(100%-3rem)]" />
      <div className="absolute left-3 right-3 bottom-3 flex justify-between items-center mono bg-white/80 rounded-full pl-4 pr-1.5 py-1.5">
        <span className="text-ink2">Bản đồ minh họa</span>
        <a href="#" className="text-ink font-semibold hover:text-red bg-white rounded-full px-3 py-1.5">Google Maps <span className="arr">→</span></a>
      </div>
    </div>
  );
}
