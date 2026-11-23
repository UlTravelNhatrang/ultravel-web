import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock } from '@phosphor-icons/react/dist/ssr';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Photo } from '@/components/ui/Photo';
import { GUIDES } from '@/content/home';
import { isoDate } from '@/lib/format';
import { POSTS, postHrefForTitle, postPath } from '@/lib/posts';
import { ROUTES } from '@/lib/routes';
import { absUrl, breadcrumbLd } from '@/lib/site';

const TITLE = 'Cẩm nang du lịch Nha Trang từ thổ địa | Ultravel';
const DESCRIPTION = 'Lịch trình, chi phí, di chuyển và mẹo thực tế cho chuyến đi Nha Trang. Thổ địa Ultravel đi thử và ghi rõ ngày cập nhật.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: ROUTES.guides },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

// Newest first by update date (dd.mm.yyyy).
const posts = [...POSTS].sort((a, b) => isoDate(b.updatedAt).localeCompare(isoDate(a.updatedAt)));
// Planned guides from the homepage list that don't have a page yet: shown as "coming soon", not as links.
const upcoming = GUIDES.filter(([title]) => !postHrefForTitle(title));

const JSON_LD = [
  breadcrumbLd([{ name: 'Trang chủ', path: '/' }, { name: 'Cẩm nang', path: ROUTES.guides }]),
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Cẩm nang du lịch Nha Trang',
    url: absUrl(ROUTES.guides),
    hasPart: posts.map(p => ({ '@type': 'Article', headline: p.title, url: absUrl(postPath(p)) })),
  },
];

export default function GuidesPage() {
  return (
    <>
      <main id="main" className="overflow-x-clip w-full max-w-full">
        <section className="max-w-[1440px] mx-auto px-4 md:px-6 pt-6 md:pt-8">
          <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Cẩm nang' }]} />
          <div className="grid lg:grid-cols-12 gap-6 mt-6 md:mt-8 items-end">
            <h1 className="mega text-[clamp(2.6rem,6vw,5.6rem)] lg:col-span-8">
              <span className="hero-line"><span>Cẩm nang Nha Trang<span className="text-red">.</span></span></span>
            </h1>
            <p className="hero-fade lg:col-span-4 text-[1.05rem] leading-relaxed text-ink/80">Lịch trình, chi phí và mẹo thực tế. Mỗi bài do thổ địa đi thử, ghi rõ ngày cập nhật.</p>
          </div>
        </section>

        <section className="max-w-[1440px] mx-auto px-4 md:px-6 mt-10 md:mt-14" aria-label="Bài viết">
          <div className="grid md:grid-cols-2 gap-[var(--card-gap)]">
            {posts.map((p, i) => (
              <Link key={p.slug} href={postPath(p)} className={`post-rel group float-in ${i === 0 ? 'md:col-span-2 md:grid md:grid-cols-2' : ''}`}>
                <Photo src={p.cover.src} alt={p.cover.alt} width={1200} height={800} className={i === 0 ? 'aspect-[16/10] md:aspect-auto md:h-full md:min-h-[22rem]' : 'aspect-[16/10]'} />
                <span className="p-6 md:p-8 flex flex-col justify-center">
                  <span className="mono text-ink2 inline-flex items-center gap-2">
                    Cập nhật <time dateTime={isoDate(p.updatedAt)}>{p.updatedAt}</time> · <Clock size={13} aria-hidden="true" />{p.readMinutes} phút
                  </span>
                  <span className={`font-display font-extrabold tracking-[-0.025em] leading-[1.1] mt-3 block group-hover:text-red-t transition-colors [text-wrap:balance] ${i === 0 ? 'text-[clamp(1.8rem,3vw,2.6rem)]' : 'text-2xl'}`}>{p.title}</span>
                  <span className="text-ink/75 leading-relaxed mt-3 line-clamp-3">{p.sapo}</span>
                  <span className="mono font-semibold mt-5">Đọc bài <span className="arr">→</span></span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {upcoming.length > 0 && (
          <section className="max-w-[1440px] mx-auto px-4 md:px-6 mt-16 md:mt-20 mb-24 md:mb-32" aria-labelledby="sap-dang-t">
            <h2 id="sap-dang-t" className="hd text-3xl md:text-[2.6rem]">Sắp đăng<span className="text-red">.</span></h2>
            <p className="text-ink2 mt-2">Thổ địa đang đi thực tế cho các bài này.</p>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[var(--card-gap)] mt-6">
              {upcoming.map(([title, kicker]) => (
                <li key={title} className="soft-card p-5">
                  <span className="mono text-ink2">{kicker}</span>
                  <p className="font-display font-bold text-lg leading-snug tracking-[-0.01em] mt-2">{title}</p>
                  <span className="b2b-sample mono mt-4 !text-ink2 !bg-ink/5">Sắp đăng</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, '\\u003c') }} />
      </main>
      <MotionProvider />
    </>
  );
}
