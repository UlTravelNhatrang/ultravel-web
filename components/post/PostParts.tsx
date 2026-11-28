import Link from 'next/link';
import { ArrowRight, Hash } from '@phosphor-icons/react/dist/ssr';
import { Photo } from '@/components/ui/Photo';
import { SmartLink } from '@/components/ui/SmartLink';
import { pad } from '@/lib/format';
import { legacy } from '@/lib/routes';
import type { Post } from '@/types/post';
import type { TocItem } from './PostToc';

/** "Read it in 30 seconds": the three takeaways and the quick facts, before the article starts. */
export function Takeaways({ post: p }: { post: Post }) {
  return (
    <section className="post-takeaways" aria-labelledby="tom-tat-t">
      <div>
        <p id="tom-tat-t" className="caption text-[#FF8A00]">Đọc nhanh trong 30 giây</p>
        <ol className="mt-4 grid gap-4">
          {p.takeaways.map((t, i) => (
            <li key={t} className="flex gap-4">
              <span className="num text-2xl leading-none text-[#FF8A00] w-8 shrink-0">{pad(i + 1)}</span>
              <span className="text-[16px] leading-snug text-cloud/90">{t}</span>
            </li>
          ))}
        </ol>
      </div>
      <dl className="post-facts">
        {p.facts.map(f => (
          <div key={f.label}>
            <dt className="caption">{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Table of contents for phones and tablets, folded by default. */
export function MobileToc({ items }: { items: TocItem[] }) {
  return (
    <details className="post-mtoc soft-card lg:hidden">
      <summary><span className="font-semibold">Mục lục</span><span className="caption text-ink/70">{items.length} phần</span></summary>
      <ol>
        {items.map((it, i) => <li key={it.id}><a href={`#${it.id}`}><span className="caption">{pad(i + 1)}</span>{it.label}</a></li>)}
      </ol>
    </details>
  );
}

export function Conclusion({ post: p }: { post: Post }) {
  return (
    <section className="post-conclusion float-in" aria-label="Kết luận">
      <p className="caption text-cloud/75">Tóm lại</p>
      <p className="text-body-lg font-semibold mt-3 [text-wrap:pretty]">{p.conclusion.text}</p>
      <Link href={p.conclusion.cta.href} className="ct-primary is-light mt-7 w-fit">
        <span className="flex-1">{p.conclusion.cta.label}</span>
        <span className="ct-primary-arr" aria-hidden="true"><ArrowRight size={14} weight="bold" /></span>
      </Link>
    </section>
  );
}

export function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Từ khóa">
      {tags.map(t => (
        <li key={t}><span className="tag-chip gap-1"><Hash size={13} className="text-navy" aria-hidden="true" />{t}</span></li>
      ))}
    </ul>
  );
}

export function AuthorCard({ post: p }: { post: Post }) {
  return (
    <section id="tac-gia" className="post-author soft-card" aria-label="Tác giả">
      <span className="post-avatar is-lg" aria-hidden="true">{p.author.initials}</span>
      <div className="min-w-0">
        <p className="caption text-ink/70">Viết bởi</p>
        <p className=" font-extrabold text-xl tracking-[-0.02em] mt-0.5">{p.author.name}</p>
        <p className="text-ink/80 mt-2 leading-relaxed">{p.author.bio}</p>
        <p className="caption text-ink/70 mt-3">{p.author.role} · đi thực tế, tự trả tiền</p>
      </div>
    </section>
  );
}

/** Next reads: three cards. Posts without a page yet still open the original demo. */
export function RelatedPosts({ post: p }: { post: Post }) {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 mt-20 md:mt-28" aria-labelledby="lien-quan-t">
      <div className="flex items-end justify-between gap-4 mb-6">
        <h2 id="lien-quan-t" className="hd text-h2">Đọc tiếp<span className="text-orange">.</span></h2>
        <Link href="/cam-nang" className="text-[15px] font-semibold text-blue hover:text-navy">Tất cả cẩm nang <span className="arr">→</span></Link>
      </div>
      <div className="grid sm:grid-cols-3 gap-[var(--card-gap)]">
        {p.related.map((r, i) => (
          <SmartLink key={i} href={r.href ?? legacy('post')} className="post-rel group float-in">
            <Photo src={r.photo} alt={r.title} width={720} height={540} className="aspect-[4/3]" />
            <span className="p-5 block">
              <span className="caption text-ink/70">{r.kicker}</span>
              <span className=" font-bold text-xl leading-snug tracking-[-0.015em] block mt-2 group-hover:text-navy transition-colors [text-wrap:balance]">{r.title}</span>
            </span>
          </SmartLink>
        ))}
      </div>
    </section>
  );
}
