import type { Metadata } from 'next';
import { NOT_FOUND_META } from '@/components/layout/NotFoundView';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ArrowRight, Storefront } from '@phosphor-icons/react/dist/ssr';
import { ContactCard } from '@/components/review/ContactCard';
import { Faq } from '@/components/review/Faq';
import { Gallery } from '@/components/review/Gallery';
import { GuestReviews } from '@/components/review/GuestReviews';
import { LocationCard } from '@/components/review/LocationCard';
import { MenuList } from '@/components/review/MenuList';
import { MobileActionBar } from '@/components/review/MobileActionBar';
import { Nearby } from '@/components/review/Nearby';
import { Overview } from '@/components/review/Overview';
import { PlaceHero } from '@/components/review/PlaceHero';
import { ReviewDialog } from '@/components/review/ReviewDialog';
import { ScoreBreakdown } from '@/components/review/ScoreBreakdown';
import { SectionNav } from '@/components/ui/SectionNav';
import { SimilarPlaces } from '@/components/review/SimilarPlaces';
import { CATEGORY_LABEL, CITY_LABEL, getReview, reviewParams, reviewPath } from '@/lib/reviews';
import { ROUTES } from '@/lib/routes';
import { absUrl, breadcrumbLd } from '@/lib/site';
import { plain } from '@/components/ui/Rich';
import type { Review } from '@/types/review';

type Props = PageProps<'/[city]/[category]/[slug]'>;

const SECTIONS = [
  { id: 'tong-quan', label: 'Tổng quan' },
  { id: 'cham-diem', label: 'Chấm điểm' },
  { id: 'menu', label: 'Menu & giá' },
  { id: 'danh-gia', label: 'Đánh giá' },
  { id: 'vi-tri', label: 'Vị trí' },
  { id: 'hoi-dap', label: 'Hỏi đáp' },
];

export function generateStaticParams() {
  return reviewParams();
}

async function load(params: Props['params']) {
  const { city, category, slug } = await params;
  return getReview(city, category, slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await load(params);
  if (!r) return NOT_FOUND_META;
  const title = `Review ${r.name} ${CITY_LABEL[r.city]}: giá, menu, giờ mở cửa | Ultravel`;
  const description = `${r.name}: Ultravel chấm ${r.score.total}/5 sau khi ${r.score.method.toLowerCase()}. Menu từ ${r.menu[1]?.price ?? r.menu[0].price}, ${r.kind.toLowerCase()} trên ${r.address}.`;
  return { title, description, alternates: { canonical: reviewPath(r) }, openGraph: { title, description, images: [r.photos[0].src] } };
}

/** Structured data: the café, its rating, the breadcrumb and the FAQ. */
function jsonLd(r: Review) {
  const path = reviewPath(r);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CafeOrCoffeeShop',
      name: r.name,
      address: { '@type': 'PostalAddress', streetAddress: r.address, addressLocality: CITY_LABEL[r.city], addressCountry: 'VN' },
      telephone: r.phone,
      priceRange: r.facts.find(f => f.label === 'Mức giá')?.value,
      image: r.photos.map(p => p.src),
      url: absUrl(path),
      aggregateRating: { '@type': 'AggregateRating', ratingValue: r.rating, reviewCount: r.reviewCount, bestRating: 5 },
      openingHoursSpecification: r.hours.map(h => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days.map(d => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d]),
        opens: h.open,
        closes: h.close,
      })),
    },
    // Mirrors the visible breadcrumb (PlaceHero).
    breadcrumbLd([
      { name: 'Trang chủ', path: '/' },
      { name: CITY_LABEL[r.city], path: ROUTES.places },
      { name: CATEGORY_LABEL[r.category], path: ROUTES.places },
      { name: r.kind, path: ROUTES.places },
      { name: r.name, path },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: r.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
    },
  ];
}

/** Quiet B2B prompt: the whole card is the link. */
function OwnerCard() {
  return (
    <Link href={ROUTES.b2b} className="owner-card group">
      <span className="owner-ico" aria-hidden="true"><Storefront size={22} weight="duotone" /></span>
      <span className="min-w-0">
        <span className="font-display font-extrabold text-[1.05rem] tracking-[-0.02em] block">Bạn là chủ quán?</span>
        <span className="text-[13px] text-ink2 leading-snug block mt-0.5">Nhận hồ sơ, trả lời đánh giá và đưa quán lên vị trí nổi bật.</span>
      </span>
      <span className="owner-arr" aria-hidden="true"><ArrowRight size={16} weight="bold" /></span>
    </Link>
  );
}

/** Same rhythm as the real page, so content swaps in without a jump. */
function ReviewSkeleton() {
  return (
    <main id="main" className="max-w-[1440px] mx-auto px-4 md:px-6 pt-8 grid gap-[var(--card-gap)]" aria-busy="true" aria-label="Đang tải review">
      <div className="h-4 w-72 rounded-full bg-ink/10" />
      <div className="grid lg:grid-cols-12 gap-[var(--card-gap)]">
        <div className="soft-card lg:col-span-8 h-72 animate-pulse" />
        <div className="lg:col-span-4 h-72 rounded-[var(--card-r)] bg-ink/80 animate-pulse" />
      </div>
      <div className="soft-card h-[27rem] animate-pulse" />
    </main>
  );
}

// The URL (which place) is read inside Suspense so the route's shell stays shared across places.
export default function ReviewPage({ params }: Props) {
  return (
    <Suspense fallback={<ReviewSkeleton />}>
      <ReviewContent params={params} />
    </Suspense>
  );
}

async function ReviewContent({ params }: Pick<Props, 'params'>) {
  const r = await load(params);
  if (!r) notFound();

  return (
    <>
      <main id="main" className="overflow-x-clip w-full max-w-full">
        <PlaceHero review={r} />
        <Gallery photos={r.photos} total={r.photoCount} />

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 mt-10 grid lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-8 min-w-0">
            <SectionNav sections={SECTIONS} />
            {/* On phones the contact card comes first; on desktop it lives in the sticky sidebar. */}
            <div className="lg:hidden mt-6"><ContactCard review={r} /></div>
            <Overview review={r} />
            <ScoreBreakdown review={r} />
            <MenuList review={r} />
            <GuestReviews review={r} />
            <Nearby review={r} />
            <Faq review={r} />
          </div>
          <aside className="hidden lg:block lg:col-span-4" aria-label="Liên hệ và vị trí">
            <div className="sticky grid gap-[var(--card-gap)]" style={{ top: 'calc(var(--hh) + 20px)' }}>
              <ContactCard review={r} />
              <LocationCard review={r} />
              <OwnerCard />
            </div>
          </aside>
        </div>

        <SimilarPlaces review={r} />
        <div className="lg:hidden max-w-[1440px] mx-auto px-4 md:px-6 mt-10"><OwnerCard /></div>
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 mt-10 mb-24 md:mb-32">
          <Link href="/" className="bx px-5 py-3 mono text-[11px] font-semibold">← Về trang chủ</Link>
        </div>
        {/* Kept at the end: Next scrolls to a new page's first element, and a <script> has no position. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(r)).replace(/</g, '\\u003c') }} />
      </main>
      <MobileActionBar review={r} />
      <ReviewDialog placeName={r.name} />
    </>
  );
}
