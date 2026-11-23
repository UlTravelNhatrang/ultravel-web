/* eslint-disable @next/next/no-img-element -- remote placeholder photo */
import { PHOTOS } from '@/content/photos';

/** Partner ad (970×90 slot) framed in the brand gradient. */
export function PromoBanner() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 pt-20 md:pt-28">
      <a href="#" className="group block hazard p-[10px]">
        <div className="relative ht min-h-[130px] flex">
          <img className="absolute inset-0 w-full h-full object-cover" src={PHOTOS.place3[1]} alt="" loading="lazy" width={1600} height={400} />
          <div className="absolute inset-0 bg-ink/65 z-[2]" />
          <div className="relative z-[3] flex-1 flex flex-col md:flex-row md:items-center justify-between gap-5 px-5 md:px-10 py-7 text-paper">
            <div>
              <p className="mono text-paper/70">Quảng cáo / 970×90 / Đối tác</p>
              <p className="hd text-2xl md:text-4xl mt-2">Mùa hè Nha Trang: resort 4 sao giảm đến 30%</p>
            </div>
            <span className="shrink-0 inline-flex items-center gap-3 bg-paper text-ink px-6 py-3.5 mono text-[12px] font-semibold group-hover:bg-red group-hover:text-ink">Đặt ngay <span className="arr">→</span></span>
          </div>
        </div>
      </a>
    </section>
  );
}
