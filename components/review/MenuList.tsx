import type { Review } from '@/types/review';
import { ReviewSection } from './ReviewSection';

export function MenuList({ review: r }: { review: Review }) {
  return (
    <ReviewSection id="menu" title="Menu & giá" aside={<span className="stamp mono">Giá kiểm tra {r.menuCheckedAt}</span>}>
      <ul className="soft-card divide-y divide-ink/10 px-5 md:px-6">
        {r.menu.map(m => (
          <li key={m.item} className="flex items-baseline gap-4 py-4">
            <span className="font-semibold">{m.item}</span>
            {m.note && <span className="mono text-red">{m.note}</span>}
            <span className="flex-1 border-b border-dotted border-ink/20 translate-y-[-4px]" aria-hidden="true" />
            <span className="mono font-semibold text-[14px] tabular-nums">{m.price}</span>
          </li>
        ))}
      </ul>
    </ReviewSection>
  );
}
