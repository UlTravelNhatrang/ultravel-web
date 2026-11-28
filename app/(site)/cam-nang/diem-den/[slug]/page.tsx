import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Clock } from '@phosphor-icons/react/dist/ssr';
import { NOT_FOUND_META } from '@/components/layout/NotFoundView';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Photo } from '@/components/ui/Photo';
import { DESTINATIONS, REGIONS, destinationPath, getDestination, type Destination } from '@/content/destinations';
import { isoDate } from '@/lib/format';
import { POSTS, postPath } from '@/lib/posts';
import { ROUTES } from '@/lib/routes';
import { breadcrumbLd } from '@/lib/site';

type Props = PageProps<'/cam-nang/diem-den/[slug]'>;

export function generateStaticParams() {
  return DESTINATIONS.map(d => ({ slug: d.slug }));
}

/** Posts written for a destination. Every post so far is about Nha Trang. */
const postsFor = (d: Destination) => (d.slug === 'nha-trang' ? POSTS : []);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = getDestination((await params).slug);
  if (!d) return NOT_FOUND_META;
  const title = `Cẩm nang du lịch ${d.name} | Ultravel`;
  const description = `Lịch trình, chi phí, ăn gì, chơi đâu ở ${d.name}. Bài viết do người đi thực tế, ghi rõ ngày cập nhật.`;
  return { title, description, alternates: { canonical: destinationPath(d) }, openGraph: { title, description } };
}

/** Archive of guides for one destination, with the other places in its region below. */
export default function DestinationPage({ params }: Props) {
  // Params are request data under Cache Components, so the page body sits behind Suspense (same as the post page).
  return (
    <Suspense fallback={<main id="main" className="max-w-[1440px] mx-auto px-4 md:px-6 pt-8 min-h-[60vh]"><div className="h-4 w-60 rounded-full bg-navy/10" /></main>}>
      <DestinationContent params={params} />
    </Suspense>
  );
}

async function DestinationContent({ params }: Pick<Props, 'params'>) {
  const d = getDestination((await params).slug);
  if (!d) notFound();
  const posts = postsFor(d);
  const region = REGIONS.find(r => r.label === d.region)!;
  const crumbs = [{ name: 'Trang chủ', path: '/' }, { name: 'Cẩm nang', path: ROUTES.guides }, { name: d.name, path: destinationPath(d) }];

  return (
    <main id="main" className="overflow-x-clip w-full max-w-full">
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 pt-6 md:pt-8">
        <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Cẩm nang', href: ROUTES.guides }, { label: d.name }]} />
        <p className="hhead-eyebrow mt-8">{d.region}</p>
        <h1 className="mega text-h1 mt-3">Cẩm nang du lịch {d.name}<span className="text-orange">.</span></h1>
        <p className="text-body-lg text-ink/80 mt-4 max-w-[60ch]">Lịch trình, chi phí, ăn gì và chơi đâu ở {d.name}. Mỗi bài ghi rõ ngày cập nhật.</p>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 md:px-6 mt-10 md:mt-12" aria-label={`Bài viết về ${d.name}`}>
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[var(--card-gap)]">
            {posts.map(p => (
              <Link key={p.slug} href={postPath(p)} className="post-rel group">
                <Photo src={p.cover.src} alt={p.cover.alt} width={1200} height={800} className="aspect-[16/10]" />
                <span className="p-6 flex flex-col">
                  <span className="caption text-ink/70 inline-flex items-center gap-2">
                    Cập nhật <time dateTime={isoDate(p.updatedAt)}>{p.updatedAt}</time> · <Clock size={13} aria-hidden="true" />{p.readMinutes} phút
                  </span>
                  <span className="text-h3 text-navy mt-3 group-hover:text-blue transition-colors">{p.title}</span>
                  <span className="text-ink/75 leading-relaxed mt-3 line-clamp-3">{p.sapo}</span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="soft-card p-8 md:p-10 max-w-[44rem]">
            <h2 className="text-h3">Bài viết về {d.name} đang được chuẩn bị</h2>
            <p className="text-ink/75 mt-3">Ultravel chỉ đăng khi đã đi thực tế và kiểm tra giá. Trong lúc chờ, bạn có thể đọc cẩm nang Nha Trang hoặc nhắn thổ địa để hỏi trực tiếp.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href={ROUTES.guides} className="btn btn-primary">Đọc cẩm nang Nha Trang <span className="arr" aria-hidden="true">→</span></Link>
              <Link href={ROUTES.b2bContact} className="btn btn-secondary">Hỏi thổ địa</Link>
            </div>
          </div>
        )}
      </section>

      <section className="max-w-[1440px] mx-auto px-4 md:px-6 mt-14 md:mt-16 mb-24 md:mb-32" aria-labelledby="cung-vung-t">
        <h2 id="cung-vung-t" className="text-h2">Điểm đến khác ở {region.label.toLowerCase()}<span className="text-orange">.</span></h2>
        <ul className="flex flex-wrap gap-2 mt-5">
          {region.places.filter(x => x.slug !== d.slug).map(x => (
            <li key={x.slug}><Link href={destinationPath(x)} className="tag-chip !text-[15px] !px-4 !py-2 hover:!bg-navy hover:!text-white">{x.name}</Link></li>
          ))}
        </ul>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)).replace(/</g, '\\u003c') }} />
    </main>
  );
}
