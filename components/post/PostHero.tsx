import { Clock } from '@phosphor-icons/react/dist/ssr';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Photo } from '@/components/ui/Photo';
import { isoDate } from '@/lib/format';
import { CATEGORY_PATH } from '@/lib/posts';
import type { Post } from '@/types/post';
import { ShareButton } from './ShareButton';

/** Top of a post: breadcrumb, headline and standfirst on the left, cover photo on the right. */
export function PostHero({ post: p }: { post: Post }) {
  const cat = CATEGORY_PATH[p.category];
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 pt-6 md:pt-8">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: cat.label, href: cat.href }, { label: p.shortTitle }]} />

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-6 md:mt-8 items-end">
        <div className="lg:col-span-7">
          <p className="hero-fade flex flex-wrap items-center gap-2">
            <a href={cat.href} className="post-kicker">{cat.label}</a>
            <span className="caption text-ink/70 inline-flex items-center gap-1.5"><Clock size={14} aria-hidden="true" />{p.readMinutes} phút đọc</span>
          </p>
          <h1 className="mega text-h1 mt-5 [text-wrap:balance]">
            <span className="hero-line"><span>{p.title}<span className="text-orange">.</span></span></span>
          </h1>
          <p className="hero-fade post-sapo mt-6">{p.sapo}</p>

          <div className="hero-fade flex flex-wrap items-center gap-x-5 gap-y-4 mt-8">
            <a href="#tac-gia" className="flex items-center gap-3 group">
              <span className="post-avatar" aria-hidden="true">{p.author.initials}</span>
              <span className="leading-tight">
                <span className="font-semibold block group-hover:text-navy">{p.author.name}</span>
                <span className="text-sm text-ink/70">{p.author.role}</span>
              </span>
            </a>
            <span className="hidden sm:block w-px h-9 bg-navy/15" aria-hidden="true" />
            <p className="caption text-ink/70 leading-relaxed">
              Cập nhật <time dateTime={isoDate(p.updatedAt)} className="text-navy font-semibold">{p.updatedAt}</time><br />
              Đăng <time dateTime={isoDate(p.publishedAt)}>{p.publishedAt}</time>
            </p>
            <div className="sm:ml-auto"><ShareButton title={p.title} /></div>
          </div>
        </div>

        <figure className="lg:col-span-5 relative">
          <div className="hero-img post-cover">
            <Photo src={p.cover.src} alt={p.cover.alt} width={1200} height={1400} priority className="absolute inset-0" />
          </div>
          <figcaption className="post-cover-cap caption">{p.cover.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
