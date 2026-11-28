import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CATEGORY_LABEL, CITY_LABEL } from '@/lib/reviews';
import { ROUTES } from '@/lib/routes';
import type { Review } from '@/types/review';
import { OpenStatus } from './OpenStatus';
import { PlaceActions } from './PlaceActions';
import { Stars } from './Stars';

/** Top of the review: breadcrumb, place name, key facts, actions, and the Ultravel score card. */
export function PlaceHero({ review: r }: { review: Review }) {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 pt-6 md:pt-8">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: CITY_LABEL[r.city], href: ROUTES.places },
          { label: CATEGORY_LABEL[r.category], href: ROUTES.places },
          { label: r.kind, href: ROUTES.places },
          { label: r.name },
        ]}
      />

      <div className="grid-ink lg:grid-cols-12 mt-4">
        <div className="lg:col-span-8 p-5 md:p-8 lg:p-10 flex flex-col justify-between gap-8">
          <div>
            <p className="caption text-ink/70 hero-fade">{r.kind} / {CITY_LABEL[r.city]}</p>
            <h1 className="mega text-h1 mt-3">
              <span className="hero-line"><span>{r.name}<span className="text-orange">.</span></span></span>
            </h1>
          </div>
          <div className="hero-fade grid gap-5">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px]">
              <span className="inline-flex items-center gap-2"><b className="num text-2xl">{r.rating.toFixed(1).replace('.', ',')}</b><Stars value={r.rating} /></span>
              <a href="#danh-gia" className="underline underline-offset-4 text-blue hover:text-navy">{r.reviewCount} đánh giá</a>
              <span className="text-ink/70">#{r.rank} trong {r.kind}</span>
              <span className="caption">{r.priceLevel}</span>
              <OpenStatus hours={r.hours} className="caption text-[13px]" />
            </div>
            <p className="text-ink/70">{r.address}</p>
            <PlaceActions slug={r.slug} name={r.name} />
          </div>
        </div>

        {/* Ultravel's own verdict: the trust signal, so it sits at the top. */}
        <aside className="lg:col-span-4 !bg-navy text-white p-6 md:p-8 flex flex-col gap-6 score-card" aria-label="Ultravel chấm điểm">
          <div className="flex items-center justify-between caption text-cloud/75"><span>Ultravel chấm</span><span>Kiểm tra {r.score.checkedAt}</span></div>
          <div>
            <p className="num text-5xl leading-none text-orange" aria-label={`${r.score.total} trên 5`}>
              <span data-count={r.score.total} data-decimals="1">{r.score.total.toFixed(1).replace('.', ',')}</span><span className="text-cloud/75 text-[.4em] align-top ml-1">/5</span>
            </p>
            <p className="hd text-2xl mt-2">{r.score.verdict}</p>
          </div>
          <p className="text-base text-cloud/85 leading-relaxed">{r.score.method}. Không nhận tài trợ từ quán.</p>
          <a href="#cham-diem" className="caption font-semibold text-cloud mt-auto hover:text-orange">Xem chi tiết chấm điểm <span className="arr">↓</span></a>
        </aside>
      </div>
    </section>
  );
}
