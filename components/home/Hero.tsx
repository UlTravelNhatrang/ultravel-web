/* eslint-disable @next/next/no-img-element -- hero photo is animated as a raw element (shutter + zoom) */
import type { ReactNode } from 'react';
import { HeroSearch } from './HeroSearch';

const HERO_PHOTO =
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Nha_Trang_skyline.jpg/1280px-Nha_Trang_skyline.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail';

const STATS: { value: ReactNode; label: string }[] = [
  { value: <span className="count" data-to="312">312</span>, label: 'Quán đã ăn thử' },
  { value: <span className="count" data-to="480">480</span>, label: 'Bài viết thực địa' },
  { value: <>25K<span className="text-red">/</span>450K</>, label: 'Khoảng giá một bữa' },
  { value: '12.11', label: 'Lần kiểm tra giá cuối' },
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
            <img className="absolute inset-0 w-full h-full object-cover" src={HERO_PHOTO} alt="Toàn cảnh vịnh biển Nha Trang" width={1200} height={1400} fetchPriority="high" />
            <span className="absolute top-3 left-3 z-[2] mono bg-paper px-2 py-1">Fig. 01</span>
          </div>
          <figcaption className="mono flex justify-between gap-3 px-4 py-3 border-t border-ink">
            <span>Vịnh Nha Trang / Trần Phú</span><span className="text-ink2">06:10 / 21.11</span>
          </figcaption>
        </figure>
      </div>

      {/* Data strip */}
      <div className="grid-ink grid-cols-2 lg:grid-cols-4 border-t-0">
        {STATS.map(s => (
          <div key={s.label} className="p-4 md:p-5">
            <div className="num text-[clamp(1.75rem,7.4vw,3rem)]">{s.value}</div>
            <p className="mono mt-2 text-ink2">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
