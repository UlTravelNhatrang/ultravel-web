import { ArrowRight, Check } from '@phosphor-icons/react/dist/ssr';
import { STATS } from '@/content/b2b';
import { SampleTag } from './parts';

const CHECKS = ['Hiểu thị trường Nha Trang', 'Có kênh truyền thông riêng', 'Báo cáo KPI mỗi tháng'];

/** SAMPLE 90-day report: three headline metrics and a growth line that draws itself in. */
function ReportCard() {
  return (
    <div className="b2b-report hero-fade" aria-label="Ví dụ báo cáo hiệu quả 90 ngày (số liệu mẫu)">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display font-extrabold tracking-[-0.02em]">Báo cáo 90 ngày</p>
        <SampleTag />
      </div>
      <dl className="grid grid-cols-3 gap-2 mt-4">
        {[['+180%', 'Chỉ đường'], ['+95%', 'Cuộc gọi'], ['Top 3', 'Từ khóa Maps']].map(([v, l]) => (
          <div key={l} className="b2b-metric">
            <dt className="mono">{l}</dt>
            <dd className="num">{v}</dd>
          </div>
        ))}
      </dl>
      <svg viewBox="0 0 400 130" className="w-full mt-5 overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="b2b-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#F7800A" stopOpacity=".28" /><stop offset="1" stopColor="#F7800A" stopOpacity="0" /></linearGradient>
        </defs>
        {[30, 65, 100].map(y => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgb(1 44 121/.08)" />)}
        <path d="M0 112 L60 104 L120 96 L180 84 L240 60 L300 42 L360 24 L400 14 L400 130 L0 130Z" fill="url(#b2b-area)" className="b2b-area" />
        <polyline points="0,112 400,98" fill="none" stroke="rgb(1 44 121/.25)" strokeWidth="2" strokeDasharray="5 6" />
        <polyline className="b2b-line" points="0,112 60,104 120,96 180,84 240,60 300,42 360,24 400,14" fill="none" stroke="#F7800A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
        <circle cx="400" cy="14" r="6" fill="#F7800A" stroke="#fff" strokeWidth="3" className="b2b-dot" />
      </svg>
      <div className="flex justify-between mono text-ink2 mt-2"><span>Tháng 1</span><span>Tháng 2</span><span>Tháng 3</span></div>
      <p className="flex items-center gap-4 mono text-ink2 mt-3">
        <span className="inline-flex items-center gap-1.5"><i className="w-4 h-[3px] rounded bg-red" />Sau khi làm</span>
        <span className="inline-flex items-center gap-1.5"><i className="w-4 border-t-2 border-dashed border-ink/30" />Trước đó</span>
      </p>
    </div>
  );
}

/** Navy opening band: the pitch, two actions, the sample report, then the headline figures. */
export function B2BHero() {
  return (
    <section className="b2b-hero" aria-labelledby="b2b-title">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-7">
          <p className="hero-fade mono text-[#FF9A3C]">Ultravel Marketing · Đối tác du lịch Nha Trang</p>
          <h1 id="b2b-title" className="mega text-[clamp(2.5rem,5.6vw,5.4rem)] mt-5">
            <span className="hero-line"><span>Thêm khách thật</span></span>
            <span className="hero-line"><span>cho quán, khách sạn</span></span>
            <span className="hero-line"><span>và tour của bạn<span className="text-[#FF9A3C]">.</span></span></span>
          </h1>
          <p className="hero-fade mt-6 text-[1.1rem] leading-relaxed text-paper/75 max-w-[52ch]">SEO, Google Maps, review, quảng cáo, website, ấn phẩm và OTA. Một đội ngũ ở Nha Trang, một báo cáo KPI rõ ràng mỗi tháng.</p>
          <div className="hero-fade flex flex-wrap gap-3 mt-8">
            <a href="#lien-he" className="ct-primary pr-1.5">
              <span>Nhận audit miễn phí</span>
              <span className="ct-primary-arr" aria-hidden="true"><ArrowRight size={14} weight="bold" /></span>
            </a>
            <a href="#bang-gia" className="b2b-ghost">Xem bảng giá</a>
          </div>
          <ul className="hero-fade flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-paper/70">
            {CHECKS.map(c => <li key={c} className="inline-flex items-center gap-2"><Check size={15} weight="bold" className="text-[#FF9A3C]" aria-hidden="true" />{c}</li>)}
          </ul>
        </div>
        <div className="lg:col-span-5"><ReportCard /></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 pb-10 md:pb-14">
        <dl className="b2b-stats">
          {STATS.map(s => (
            // dt comes first in the markup (valid <dl>); CSS shows the number above the label.
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd className="num"><span data-count={s.value}>{s.value}</span>{s.suffix}</dd>
            </div>
          ))}
        </dl>
        <p className="mono text-paper/45 mt-3">Số liệu mẫu, sẽ thay bằng số thật.</p>
      </div>
    </section>
  );
}
