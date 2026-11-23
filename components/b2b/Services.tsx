import { ArrowRight, PuzzlePiece } from '@phosphor-icons/react/dist/ssr';
import { SERVICES } from '@/content/b2b';
import { B2BSection, ServiceIcon } from './parts';

/** Seven services and a "build your own" card: an even 4 × 2 grid on desktop. */
export function Services() {
  return (
    <B2BSection id="dich-vu" label="Dịch vụ" title="Một đội ngũ, đủ 7 mảng marketing du lịch">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[var(--card-gap)]">
        {SERVICES.map((s, i) => (
          <article key={s.key} className="b2b-svc soft-card float-in">
            <div className="flex items-start justify-between">
              <span className="b2b-svc-ico"><ServiceIcon k={s.key} /></span>
              <span className="mono text-ink/30">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="font-display font-extrabold text-xl tracking-[-0.02em] mt-5">{s.title}</h3>
            <p className="text-[15px] text-ink/75 leading-relaxed mt-2">{s.text}</p>
            <p className="mono text-ink2 mt-auto pt-5">Hợp với: {s.fit}</p>
          </article>
        ))}
        <a href="#lien-he" className="b2b-svc b2b-svc-combo float-in group">
          <span className="b2b-svc-ico"><PuzzlePiece size={22} weight="duotone" aria-hidden="true" /></span>
          <span className="font-display font-extrabold text-xl tracking-[-0.02em] mt-5 block">Combo theo ngân sách</span>
          <span className="text-[15px] text-paper/75 leading-relaxed mt-2 block">Ghép các mảng bạn cần, bỏ phần chưa cần. Báo giá sau buổi audit.</span>
          <span className="mono font-semibold mt-auto pt-5 inline-flex items-center gap-2 text-[#FF9A3C]">Nhận tư vấn <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
        </a>
      </div>
    </B2BSection>
  );
}
