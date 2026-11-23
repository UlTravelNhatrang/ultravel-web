import Link from 'next/link';
import { ArrowRight, BookOpenText, Compass, House, Megaphone, Storefront } from '@phosphor-icons/react/dist/ssr';
import { SONG_XANH_CAFE } from '@/content/reviews/song-xanh-cafe';
import { LICH_TRINH_3N2D } from '@/content/posts/lich-trinh-nha-trang-3-ngay-2-dem';
import { postPath } from '@/lib/posts';
import { reviewPath } from '@/lib/reviews';
import { ROUTES } from '@/lib/routes';

const WAYS = [
  { href: '/', label: 'Trang chủ', note: 'Bắt đầu lại từ đầu', Icon: House },
  { href: ROUTES.guides, label: 'Cẩm nang', note: 'Lịch trình, chi phí, mẹo', Icon: BookOpenText },
  { href: reviewPath(SONG_XANH_CAFE), label: SONG_XANH_CAFE.name, note: 'Review mới nhất', Icon: Storefront },
  { href: postPath(LICH_TRINH_3N2D), label: LICH_TRINH_3N2D.shortTitle, note: 'Bài đọc nhiều', Icon: Compass },
  { href: ROUTES.b2b, label: 'Marketing du lịch', note: 'Cho chủ cơ sở', Icon: Megaphone },
];

/** The "0" of 404: a compass whose needle spins, then keeps searching. */
function CompassZero() {
  return (
    <svg viewBox="0 0 120 120" className="nf-compass" aria-hidden="true">
      <circle cx="60" cy="60" r="54" className="nf-ring" />
      <circle cx="60" cy="60" r="44" className="nf-ring2" />
      {Array.from({ length: 24 }, (_, i) => (
        <line key={i} x1="60" y1={i % 6 ? 10 : 7} x2="60" y2={i % 6 ? 15 : 18} transform={`rotate(${i * 15} 60 60)`} className="nf-tick" />
      ))}
      <text x="60" y="31" textAnchor="middle" className="nf-n">N</text>
      <g className="nf-needle">
        <path d="M60 22 L67 60 L60 66 L53 60 Z" className="nf-needle-n" />
        <path d="M60 98 L53 60 L60 54 L67 60 Z" className="nf-needle-s" />
      </g>
      <circle cx="60" cy="60" r="4.5" className="nf-pin" />
    </svg>
  );
}

/** Coastline with a dotted route that wanders off to sea, a bobbing boat and a "?" where the page should be. */
function LostMap() {
  return (
    <svg viewBox="0 0 520 200" className="nf-map" aria-hidden="true">
      <path d="M0 0H150C168 40 140 80 160 120 178 160 150 180 162 200H0Z" className="nf-land" />
      {/* Outline only along the coast, not the frame edges. */}
      <path d="M150 0C168 40 140 80 160 120 178 160 150 180 162 200" className="nf-coast" />
      {[50, 95, 140].map(y => <path key={y} d={`M190 ${y} q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0`} className="nf-swell" />)}
      <path d="M118 150 C170 140 190 90 250 96 S330 150 380 110 S430 50 468 62" className="nf-route" pathLength={1} />
      <g transform="translate(118 150)"><circle r="7" className="nf-you" /><circle r="14" className="nf-you-ring" /></g>
      <text x="96" y="182" className="nf-you-t">Bạn ở đây</text>
      <g className="nf-boat" transform="translate(300 118)"><path d="M-16 0h32l-6 9h-20z" /><path d="M0 -20v20M0 -20l11 15H0" /></g>
      <g transform="translate(468 62)"><circle r="17" className="nf-q" /><text y="6" textAnchor="middle" className="nf-q-t">?</text></g>
    </svg>
  );
}

/** 404 page body, shared by unknown URLs (app/not-found) and missing reviews or posts ((site)/not-found). */
export function NotFoundView() {
  return (
    <main id="main" className="overflow-x-clip w-full max-w-full">
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-24 md:pb-32 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center" aria-labelledby="nf-title">
        <div className="lg:col-span-6 lg:order-2">
          <div className="nf-card">
            <p className="nf-code" aria-label="Lỗi 404">
              <span className="hero-line"><span>4</span></span>
              <CompassZero />
              <span className="hero-line"><span>4</span></span>
            </p>
            <LostMap />
            <p className="nf-coord mono">12°15&apos;N 109°11&apos;E · ngoài khơi, chưa có trên bản đồ</p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:order-1">
          <p className="hero-fade mono text-red-t">Lỗi 404 · Không tìm thấy trang</p>
          <h1 id="nf-title" className="mega text-[clamp(2.8rem,6vw,5.6rem)] mt-4">
            <span className="hero-line"><span>Lạc đường rồi<span className="text-red">.</span></span></span>
          </h1>
          <p className="hero-fade text-[1.1rem] leading-relaxed text-ink/80 mt-5 max-w-[48ch]">Trang này đã đổi địa chỉ, chưa được viết, hoặc đi ra đảo chưa về. Thổ địa chỉ đường quay lại nhé.</p>
          <div className="hero-fade flex flex-wrap gap-3 mt-8">
            <Link href="/" className="ct-primary pr-1.5"><span>Về trang chủ</span><span className="ct-primary-arr" aria-hidden="true"><ArrowRight size={14} weight="bold" /></span></Link>
            <Link href={ROUTES.guides} className="ct-secondary px-5">Đọc cẩm nang</Link>
          </div>

          <nav className="hero-fade mt-10" aria-label="Gợi ý trang">
            <p className="mono text-ink2">Hoặc đi tiếp tới</p>
            <ul className="nf-ways mt-3">
              {WAYS.map(({ href, label, note, Icon }) => (
                <li key={href}>
                  <Link href={href} className="nf-way group">
                    <span className="nf-way-ico" aria-hidden="true"><Icon size={18} weight="duotone" /></span>
                    <span className="min-w-0"><span className="font-semibold block truncate">{label}</span><span className="text-sm text-ink2">{note}</span></span>
                    <ArrowRight size={16} className="nf-way-arr" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </main>
  );
}

/** Metadata for a page that turned out not to exist (tab title; Next adds noindex itself). */
export const NOT_FOUND_META = { title: 'Không tìm thấy trang | Ultravel' };
