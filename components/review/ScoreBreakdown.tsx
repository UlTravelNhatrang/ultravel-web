import type { CSSProperties } from 'react';
import { Check, WarningCircle } from '@phosphor-icons/react/dist/ssr';
import type { Review } from '@/types/review';
import { BrandWord } from '@/components/ui/BrandWord';
import { ReviewSection } from './ReviewSection';

const fmt = (n: number) => n.toFixed(1).replace('.', ',');

/** Sub-scores as bars (they fill on scroll via MotionProvider), then pros and cons. */
export function ScoreBreakdown({ review: r }: { review: Review }) {
  return (
    <ReviewSection id="cham-diem" title={<><BrandWord /> chấm điểm</>} aside={<span className="mono text-ink2">{r.score.method} · {r.score.checkedAt}</span>}>
      <div className="soft-card p-5 md:p-6 grid gap-4">
        {r.score.parts.map(p => (
          <div key={p.label} className="grid grid-cols-[minmax(0,10rem)_1fr_2.5rem] sm:grid-cols-[12rem_1fr_3rem] items-center gap-4">
            <span className="text-[15px] font-medium">{p.label}</span>
            <span className="meter" style={{ '--v': p.value / 5 } as CSSProperties} role="meter" aria-valuemin={0} aria-valuemax={5} aria-valuenow={p.value} aria-label={p.label}><i /></span>
            <span className="num text-xl text-right">{fmt(p.value)}</span>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-[var(--card-gap)] mt-[var(--card-gap)]">
        <div className="soft-card p-5 md:p-6">
          <h3 className="hd text-xl">Điểm cộng</h3>
          <ul className="mt-4 grid gap-3">
            {r.pros.map(t => <li key={t} className="flex gap-3"><span className="mark-ok"><Check size={14} weight="bold" aria-hidden="true" /></span>{t}</li>)}
          </ul>
        </div>
        <div className="soft-card p-5 md:p-6">
          <h3 className="hd text-xl">Cần lưu ý</h3>
          <ul className="mt-4 grid gap-3">
            {r.cons.map(t => <li key={t} className="flex gap-3"><span className="mark-warn"><WarningCircle size={14} weight="bold" aria-hidden="true" /></span>{t}</li>)}
          </ul>
        </div>
      </div>
    </ReviewSection>
  );
}
