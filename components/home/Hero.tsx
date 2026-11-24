import Image from 'next/image';
import type { ReactNode } from 'react';
import { HeroSearch } from './HeroSearch';

const HERO_PHOTO =
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Nha_Trang_skyline.jpg/1280px-Nha_Trang_skyline.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail';

/** Tally marks in groups of five, like a field notebook. */
function Tally() {
  return (
    <svg className="hs-viz" viewBox="0 0 120 26" aria-hidden="true">
      {[0, 1, 2].map(g => (
        <g key={g} transform={`translate(${g * 40} 0)`}>
          {[0, 1, 2, 3].map(i => <path key={i} d={`M${4 + i * 7} 3v20`} />)}
          <path d="M1 19 30 6" className="hs-slash" />
        </g>
      ))}
    </svg>
  );
}

/** Small rising bars: posts piling up month by month. */
function Bars() {
  const h = [6, 9, 8, 12, 14, 13, 17, 20, 24];
  return (
    <svg className="hs-viz" viewBox="0 0 120 26" aria-hidden="true">
      {h.map((v, i) => <rect key={i} x={i * 13.5} y={26 - v} width="8" height={v} rx="2" className={i === h.length - 1 ? 'hs-hot' : undefined} />)}
    </svg>
  );
}

/** Where 25K and 450K sit on a 0 to 500K scale. */
function PriceRange() {
  return (
    <div className="hs-range" aria-hidden="true">
      <span className="hs-range-fill" style={{ left: '5%', right: '10%' }} />
      <span className="hs-range-dot" style={{ left: '5%' }} />
      <span className="hs-range-dot" style={{ left: '90%' }} />
      <span className="hs-range-scale mono"><span>Bình dân</span><span>Cao cấp</span></span>
    </div>
  );
}

const STATS: { value: ReactNode; label: string; code: string; viz: ReactNode }[] = [
  { code: 'A', value: <span className="count" data-to="312">312</span>, label: 'Quán đã ăn thử', viz: <Tally /> },
  { code: 'B', value: <span className="count" data-to="480">480</span>, label: 'Bài viết thực địa', viz: <Bars /> },
  { code: 'C', value: <>25K<span className="text-red">/</span>450K</>, label: 'Khoảng giá một bữa', viz: <PriceRange /> },
  { code: 'D', value: '12.11', label: 'Lần kiểm tra giá cuối', viz: <span className="hs-stamp mono" aria-hidden="true">Đã<br />kiểm tra</span> },
];

export function Hero() {
  return (
    <section className="hero max-w-[1440px] mx-auto px-4 md:px-6 pt-6 md:pt-8">
      <div className="flex justify-between mono text-ink2 pb-3">
        <span>01 — Cẩm nang</span><span className="hidden sm:inline">Số 11 / Mùa khô 2026</span><span>Unit / NT-01</span>
      </div>

      <div className="grid-ink lg:grid-cols-12">
        <div className="card-open lg:col-span-8 p-5 md:p-8 lg:p-10 flex flex-col justify-between gap-10">
          <h1 className="mega text-[clamp(3.1rem,9.2vw,9.6rem)]">
            <span className="hero-line"><span>Cẩm nang</span></span>
            <span className="hero-line"><span>du lịch</span></span>
            <span className="hero-line"><span>thực tế<span className="text-red">.</span></span></span>
          </h1>
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 md:gap-10 items-end">
            <div className="hero-fade lede">
              <p className="lede-q">
                <span className="q"><i>01</i>Ăn gì?</span>
                <span className="q"><i>02</i>Chơi đâu?</span>
                <span className="q q-red"><i>03</i>Giá bao nhiêu?</span>
              </p>
              <p className="lede-a">Thổ địa đi thực tế, <b>trả tiền thật</b> và ghi rõ <mark>ngày kiểm tra</mark> trên từng bài.</p>
            </div>
            <HeroSearch />
          </div>
        </div>

        <figure className="lg:col-span-4 relative flex flex-col">
          {/* The frame itself is the .ht photo box so the shutter reveal clips the whole thing. */}
          <div className="hero-img ht flex-1 min-h-[320px] lg:min-h-[560px]">
            <Image className="absolute inset-0 w-full h-full object-cover" src={HERO_PHOTO} alt="Toàn cảnh vịnh biển Nha Trang" width={1200} height={1400} sizes="(max-width: 1023px) 100vw, 45vw" preload fetchPriority="high" />
            <span className="absolute top-3 left-3 z-[2] mono bg-paper px-2 py-1">Fig. 01</span>
          </div>
          <figcaption className="mono flex justify-between gap-3 px-4 py-3 border-t border-ink">
            <span>Vịnh Nha Trang / Trần Phú</span><span className="text-ink2">06:10 / 21.11</span>
          </figcaption>
        </figure>
      </div>

      {/* Data strip: one navy "receipt" with perforated dividers; each figure carries a small picture of what it means. */}
      <dl className="hero-stats">
        {STATS.map(s => (
          <div key={s.label} className="hs">
            <dt className="mono hs-k"><span className="hs-code">{s.code}</span>{s.label}</dt>
            <dd className="num hs-n">{s.value}</dd>
            <dd className="hs-v">{s.viz}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
