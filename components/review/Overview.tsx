import type { Review } from '@/types/review';
import { ReviewSection } from './ReviewSection';

export function Overview({ review: r }: { review: Review }) {
  return (
    <ReviewSection id="tong-quan" title="Tổng quan">
      <p className="text-[17px] leading-relaxed max-w-[62ch] text-ink/85">{r.intro}</p>
      <dl className="grid sm:grid-cols-2 gap-[var(--card-gap)] mt-6">
        {r.facts.map(f => (
          <div key={f.label} className="soft-card p-4">
            <dt className="mono text-ink2">{f.label}</dt>
            <dd className="font-semibold mt-1">{f.value}</dd>
          </div>
        ))}
      </dl>
      <ul className="flex flex-wrap gap-2 mt-5" aria-label="Đặc điểm">
        {r.tags.map(t => <li key={t} className="tag-chip">{t}</li>)}
      </ul>
    </ReviewSection>
  );
}
