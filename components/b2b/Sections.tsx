import { Check } from '@phosphor-icons/react/dist/ssr';
import { Photo } from '@/components/ui/Photo';
import { CASES, PLANS, SINGLE_SERVICES, STEPS } from '@/content/b2b';
import { B2BSection } from './parts';

/** Four steps on one line (a column on phones), joined by a rail that fills in as it scrolls into view. */
export function Process() {
  return (
    <B2BSection id="quy-trinh" label="Quy trình" title="Bốn bước, bắt đầu bằng một buổi audit">
      <ol className="b2b-steps">
        {STEPS.map((s, i) => (
          <li key={s.title} className="float-in">
            <span className="b2b-step-n num">{i + 1}</span>
            <p className="caption text-navy mt-5">{s.when}</p>
            <h3 className=" font-extrabold text-xl tracking-[-0.02em] mt-1">{s.title}</h3>
            <p className="text-ink/75 leading-relaxed mt-2">{s.text}</p>
          </li>
        ))}
      </ol>
    </B2BSection>
  );
}

export function Cases() {
  return (
    <B2BSection id="ket-qua" label="Kết quả" title="Đối tác nói bằng con số">
      <div className="grid md:grid-cols-3 gap-[var(--card-gap)]">
        {CASES.map(c => (
          <article key={c.who} className="b2b-case float-in">
            <Photo src={c.photo} alt={c.who} width={720} height={480} className="aspect-[16/9]" />
            <div className="p-5 md:p-6">
              <p className="caption text-ink/70">{c.who}</p>
              <p className="num text-[clamp(2rem,1.3rem+2.2vw,3rem)] leading-none text-navy mt-3">{c.prefix}<span data-count={c.value}>{c.value}</span>{c.suffix}</p>
              <p className="font-semibold mt-2">{c.metric}</p>
              <p className="caption text-ink/70 mt-4 pt-4 border-t border-navy/10">{c.how} · {c.time}</p>
            </div>
          </article>
        ))}
      </div>
    </B2BSection>
  );
}

export function Pricing() {
  return (
    <B2BSection id="bang-gia" label="Bảng giá" title="Gói dịch vụ và cách tính giá" aside={<p className="caption text-ink/70 max-w-[30ch]">Giá tham khảo. Báo giá chính thức sau buổi audit.</p>}>
      <div className="grid md:grid-cols-3 gap-[var(--card-gap)] items-stretch">
        {PLANS.map(p => (
          <article key={p.name} className={`b2b-plan float-in ${p.hot ? 'is-hot' : 'soft-card'}`}>
            <div className="flex items-center justify-between gap-3">
              <h3 className=" font-extrabold text-2xl tracking-[-0.02em]">{p.name}</h3>
              {p.hot && <span className="b2b-hot caption">Phổ biến nhất</span>}
            </div>
            <p className="b2b-plan-note mt-1">{p.note}</p>
            <p className="mt-6 flex items-baseline gap-1.5 flex-wrap">
              {p.from && <span className="caption b2b-plan-note">Từ</span>}
              <span className={`num leading-none ${p.from ? 'text-[2.6rem]' : 'text-[2rem] py-[.15em]'}`}>{p.price}</span>
              {p.unit && <span className="b2b-plan-note">{p.unit}</span>}
            </p>
            <ul className="grid gap-2.5 mt-6 mb-8">
              {p.items.map(it => (
                <li key={it} className="flex gap-2.5 items-start"><span className="b2b-check"><Check size={12} weight="bold" aria-hidden="true" /></span>{it}</li>
              ))}
            </ul>
            <a href="#lien-he" className={`mt-auto ${p.hot ? 'ct-primary is-accent justify-center' : 'ct-secondary'}`}>Chọn gói {p.name}</a>
          </article>
        ))}
      </div>

      <div className="post-table mt-[var(--card-gap)]">
        <table>
          <caption className="sr-only">Dịch vụ lẻ và cách tính giá</caption>
          <thead><tr><th scope="col">Dịch vụ lẻ</th><th scope="col">Cách tính giá</th><th scope="col">Thời gian</th></tr></thead>
          <tbody>{SINGLE_SERVICES.map(([a, b, c]) => <tr key={a}><th scope="row">{a}</th><td data-label="Cách tính giá" className="!font-sans !text-[15px]">{b}</td><td data-label="Thời gian">{c}</td></tr>)}</tbody>
        </table>
      </div>
    </B2BSection>
  );
}
