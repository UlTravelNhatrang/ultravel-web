import Link from 'next/link';
import { Photo } from '@/components/ui/Photo';
import { AsideNote, SectionHeader } from '@/components/ui/Section';
import { FEED, FEED_EXCERPT, TRENDING } from '@/content/home';
import { PHOTOS } from '@/content/photos';
import { SmartLink } from '@/components/ui/SmartLink';
import type { FeedPost } from '@/types/content';
import { isoDate, pad } from '@/lib/format';
import { postHrefForTitle } from '@/lib/posts';
import { legacy, ROUTES } from '@/lib/routes';
import { LeadForm } from './LeadForm';

/** A post's own page, or the original demo while it has none. */
const postHref = (title: string) => postHrefForTitle(title) ?? legacy('post');

/** Lead story: big photo, title with the wave underline that draws in on scroll. */
function FeaturedPost({ post: [title, date, author] }: { post: FeedPost }) {
  return (
    <article className="group grid md:grid-cols-5 gap-6 pb-8 border-b-2 border-ink">
      <SmartLink href={postHref(title)} className="md:col-span-3 block border border-ink">
        <Photo src={PHOTOS.feed[0]} alt={title} width={1000} height={625} className="aspect-[16/10]" />
      </SmartLink>
      <div className="md:col-span-2 flex flex-col justify-end">
        <p className="mono text-ink2">Bài chính / <time dateTime={isoDate(date)}>{date}</time> / {author}</p>
        <h3 className="hd text-3xl md:text-[2.75rem] mt-3 leading-[1.12] [text-wrap:balance]"><SmartLink href={postHref(title)} className="feat-t">{title}</SmartLink></h3>
        <p className="text-ink2 mt-3 leading-relaxed line-clamp-3">{FEED_EXCERPT}</p>
      </div>
    </article>
  );
}

function PostRow({ post: [title, date, author], index }: { post: FeedPost; index: number }) {
  return (
    <article className="group grid grid-cols-[8rem_1fr] sm:grid-cols-[15rem_1fr] xl:grid-cols-[18rem_1fr] gap-4 sm:gap-7 py-6 border-b border-ink items-center">
      <SmartLink href={postHref(title)} className="feed-img block overflow-hidden rounded-[20px]" tabIndex={-1}>
        <Photo src={PHOTOS.feed[index]} alt={title} width={720} height={540} className="aspect-[4/3]" />
      </SmartLink>
      <div className="min-w-0">
        <p className="mono text-ink2 flex flex-wrap items-center gap-2">
          <time className="bg-white/60 rounded-full px-2.5 py-1 text-ink" dateTime={isoDate(date)}>{date}</time><span>{author}</span>
        </p>
        <h3 className="font-display font-bold text-lg md:text-2xl leading-snug tracking-[-0.015em] mt-2.5"><SmartLink href={postHref(title)} className="hover:text-red">{title}</SmartLink></h3>
        <p className="text-sm md:text-[15px] text-ink2 mt-2 line-clamp-2 hidden sm:block">{FEED_EXCERPT}</p>
        <span className="mono font-semibold mt-3 hidden sm:inline-block group-hover:text-red">Đọc bài <span className="arr">→</span></span>
      </div>
    </article>
  );
}

function Trending() {
  return (
    <div>
      <div className="flex justify-between mono pb-2 border-b-2 border-ink"><span className="font-semibold">Đọc nhiều / 7 ngày</span><span className="text-ink2">Top 05</span></div>
      <ol id="trend">
        {TRENDING.map((t, i) => (
          <li key={t} className="flex items-center gap-4 py-3 border-b border-ink">
            <span className={`num text-4xl w-12 leading-none ${i ? '' : 'text-red'}`}>{pad(i + 1)}</span>
            <SmartLink className="font-semibold leading-snug hover:text-red" href={postHref(t)}>{t}</SmartLink>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Latest posts on the left; trending list and the lead form stick on the right. */
export function Feed() {
  const [featured, ...rest] = FEED;
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 pt-20 md:pt-28" aria-labelledby="feedTitle">
      <SectionHeader label="06 — Nhật ký cập nhật" aside={<AsideNote>Sắp xếp theo ngày kiểm tra</AsideNote>} />
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-0 mt-6">
        <div className="lg:col-span-8 lg:pr-10 lg:border-r border-ink">
          <h2 id="feedTitle" className="hd text-4xl md:text-6xl mb-8">Bài viết mới<span className="text-red">.</span></h2>
          <div id="feed">
            <FeaturedPost post={featured} />
            {rest.map((p, i) => <PostRow key={p[0]} post={p} index={i + 1} />)}
          </div>
          <Link href={ROUTES.guides} className="bx mt-8 px-5 py-3 mono text-[11px] font-semibold">Xem tất cả bài viết <span className="arr">→</span></Link>
        </div>
        <aside className="lg:col-span-4 lg:pl-10">
          <div className="lg:sticky space-y-8" style={{ top: 'calc(var(--hh) + 20px)' }}>
            <Trending />
            <LeadForm />
          </div>
        </aside>
      </div>
    </section>
  );
}
