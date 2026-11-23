import type { Metadata } from 'next';
import { NOT_FOUND_META } from '@/components/layout/NotFoundView';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { LeadForm } from '@/components/home/LeadForm';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { PostBody } from '@/components/post/PostBody';
import { PostHero } from '@/components/post/PostHero';
import { AuthorCard, Conclusion, MobileToc, RelatedPosts, Tags, Takeaways } from '@/components/post/PostParts';
import { PostToc } from '@/components/post/PostToc';
import { ReadingProgress } from '@/components/post/ReadingProgress';
import { plain } from '@/components/ui/Rich';
import { FaqBoard } from '@/components/ui/FaqBoard';
import { isoDate } from '@/lib/format';
import { CATEGORY_PATH, getPost, POSTS, postPath } from '@/lib/posts';
import { absUrl, breadcrumbLd } from '@/lib/site';
import type { Post } from '@/types/post';

type Props = PageProps<'/cam-nang/[slug]'>;

const ARTICLE_ID = 'bai-viet';

export function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }));
}

async function load(params: Props['params']) {
  return getPost((await params).slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await load(params);
  if (!p) return NOT_FOUND_META;
  const title = `${p.title} | Ultravel`;
  return {
    title,
    description: p.sapo,
    alternates: { canonical: postPath(p) },
    openGraph: { type: 'article', title, description: p.sapo, images: [p.cover.src], publishedTime: isoDate(p.publishedAt), modifiedTime: isoDate(p.updatedAt) },
  };
}

/** Structured data: the article, its breadcrumb and the FAQ. */
function jsonLd(p: Post) {
  const cat = CATEGORY_PATH[p.category];
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: p.title,
      description: p.sapo,
      image: [p.cover.src],
      datePublished: isoDate(p.publishedAt),
      dateModified: isoDate(p.updatedAt),
      author: { '@type': 'Person', name: p.author.name },
      publisher: { '@type': 'Organization', name: 'Ultravel', url: absUrl('/'), logo: { '@type': 'ImageObject', url: absUrl('/assets/ultravel-icon-512.png') } },
      mainEntityOfPage: absUrl(postPath(p)),
    },
    breadcrumbLd([{ name: 'Trang chủ', path: '/' }, { name: cat.label, path: cat.href }, { name: p.shortTitle, path: postPath(p) }]),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: p.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
    },
  ];
}

function PostSkeleton() {
  return (
    <main id="main" className="max-w-[1440px] mx-auto px-4 md:px-6 pt-8 grid gap-6" aria-busy="true" aria-label="Đang tải bài viết">
      <div className="h-4 w-60 rounded-full bg-ink/10" />
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 grid gap-4 content-end">
          <div className="h-16 rounded-2xl bg-ink/10 animate-pulse" />
          <div className="h-16 w-4/5 rounded-2xl bg-ink/10 animate-pulse" />
          <div className="h-24 rounded-2xl bg-ink/5 animate-pulse" />
        </div>
        <div className="lg:col-span-5 aspect-[4/5] max-h-[34rem] rounded-[var(--card-r)] bg-ink/10 animate-pulse" />
      </div>
    </main>
  );
}

// The URL (which post) is read inside Suspense so the route's shell stays shared across posts.
export default function PostPage({ params }: Props) {
  return (
    <Suspense fallback={<PostSkeleton />}>
      <PostContent params={params} />
    </Suspense>
  );
}

async function PostContent({ params }: Pick<Props, 'params'>) {
  const p = await load(params);
  if (!p) notFound();
  const toc = [...p.sections.map(s => ({ id: s.id, label: s.title })), { id: 'hoi-dap', label: 'Câu hỏi thường gặp' }];

  return (
    <>
      <main id="main" className="overflow-x-clip w-full max-w-full">
        <PostHero post={p} />

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 mt-12 md:mt-16 grid lg:grid-cols-12 gap-10 lg:gap-12">
          <article id={ARTICLE_ID} className="lg:col-span-8 min-w-0 grid grid-cols-[minmax(0,1fr)] gap-10 content-start">
            <Takeaways post={p} />
            <MobileToc items={toc} />
            <PostBody post={p} />
            <Conclusion post={p} />
            <section id="hoi-dap" className="post-sec" aria-labelledby="hoi-dap-t" tabIndex={-1}>
              <h2 id="hoi-dap-t" className="post-h2"><span className="mono" aria-hidden="true">?</span>Câu hỏi thường gặp</h2>
              <FaqBoard items={p.faq} byline={`${p.author.name} · ${p.author.role}`} />
            </section>
            <Tags tags={p.tags} />
            <AuthorCard post={p} />
          </article>

          {/* On phones this column follows the article and only the lead form shows (the contents list sits at the top). */}
          <aside className="lg:col-span-4" aria-label="Mục lục và tư vấn">
            <div className="lg:sticky grid gap-[var(--card-gap)]" style={{ top: 'calc(var(--hh) + 20px)' }}>
              <div className="hidden lg:block"><PostToc items={toc} articleId={ARTICLE_ID} /></div>
              <LeadForm />
            </div>
          </aside>
        </div>

        <RelatedPosts post={p} />
        <div className="mb-24 md:mb-32" />
        {/* Kept at the end: Next scrolls to a new page's first element, and a <script> has no position. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(p)).replace(/</g, '\\u003c') }} />
      </main>
      <ReadingProgress articleId={ARTICLE_ID} />
      <MotionProvider />
    </>
  );
}
