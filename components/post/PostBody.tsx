import Link from 'next/link';
import { Info, Lightbulb, Star } from '@phosphor-icons/react/dist/ssr';
import { Photo } from '@/components/ui/Photo';
import { pad } from '@/lib/format';
import { getReviewBySlug, reviewPath } from '@/lib/reviews';
import type { Post, PostBlock } from '@/types/post';
import { Rich } from '@/components/ui/Rich';

function PlaceCard({ slug, note }: { slug: string; note: string }) {
  const r = getReviewBySlug(slug);
  const photo = r?.photos[0];
  if (!r) return null;
  return (
    <Link href={reviewPath(r)} className="post-place group">
      {photo ? <Photo src={photo.src} alt={photo.alt} width={480} height={360} sizes="(max-width: 767px) 40vw, 240px" className="post-place-img" /> : <span className="post-place-img bg-white" aria-hidden="true" />}
      <span className="p-4 md:p-5 min-w-0 flex flex-col justify-center">
        <span className="caption text-ink/70 text-[12px]">{note}</span>
        <span className=" font-extrabold text-xl tracking-[-0.02em] mt-1 group-hover:text-navy transition-colors">{r.name}</span>
        <span className="text-sm text-ink/70 mt-1 flex flex-wrap items-center gap-x-2">
          <span className="inline-flex items-center gap-1 text-navy font-semibold"><Star size={14} weight="fill" className="text-orange" aria-hidden="true" />{r.rating.toFixed(1).replace('.', ',')}</span>
          · {r.kind} · Ultravel chấm {r.score.total.toFixed(1).replace('.', ',')}/5
        </span>
        <span className="caption font-semibold mt-3">Xem review chi tiết <span className="arr">→</span></span>
      </span>
    </Link>
  );
}

function Block({ block: b }: { block: PostBlock }) {
  switch (b.type) {
    case 'p':
      return <p><Rich text={b.text} /></p>;
    case 'list': {
      const Tag = b.ordered ? 'ol' : 'ul';
      return <Tag className="post-list">{b.items.map((t, i) => <li key={i}><Rich text={t} /></li>)}</Tag>;
    }
    case 'figure':
      return (
        <figure className="post-figure float-in">
          <Photo src={b.src} alt={b.alt} width={1280} height={800} className="aspect-[16/10]" />
          <figcaption className="caption">{b.caption}</figcaption>
        </figure>
      );
    case 'tip':
      return (
        <aside className="post-callout is-tip">
          <span className="post-callout-ico" aria-hidden="true"><Lightbulb size={18} weight="fill" /></span>
          <div><p className="post-callout-t caption">Mẹo thổ địa</p><p><Rich text={b.text} /></p></div>
        </aside>
      );
    case 'note':
      return (
        <aside className="post-callout is-note">
          <span className="post-callout-ico" aria-hidden="true"><Info size={18} weight="bold" /></span>
          <div><p className="post-callout-t caption">Lưu ý</p><p><Rich text={b.text} /></p></div>
        </aside>
      );
    case 'table':
      return (
        <div className="post-table">
          <table>
            <caption className="sr-only">{b.caption}</caption>
            <thead><tr>{b.head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
            <tbody>{b.rows.map((row, r) => <tr key={r}>{row.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i} data-label={b.head[i]}>{c}</td>))}</tr>)}</tbody>
          </table>
        </div>
      );
    case 'timeline':
      return (
        <ol className="post-timeline">
          {b.items.map((it, i) => (
            <li key={i}>
              <span className="post-time caption">{it.time}</span>
              <div>
                <p className=" font-bold text-[1.1rem] tracking-[-0.01em]">{it.title}</p>
                <p className="text-ink/80 mt-1"><Rich text={it.text} /></p>
              </div>
            </li>
          ))}
        </ol>
      );
    case 'place':
      return <PlaceCard slug={b.review} note={b.note} />;
  }
}

/** The article: numbered sections, each a heading and its blocks. */
export function PostBody({ post: p }: { post: Post }) {
  return (
    <div className="post-body">
      {p.sections.map((s, i) => (
        // tabIndex -1: the contents list moves keyboard focus here after scrolling.
        <section key={s.id} id={s.id} className="post-sec" aria-labelledby={`${s.id}-t`} tabIndex={-1}>
          <h2 id={`${s.id}-t`} className="post-h2">
            <span className="caption" aria-hidden="true">{pad(i + 1)}</span>
            {s.title}
          </h2>
          {s.blocks.map((b, k) => <Block key={k} block={b} />)}
        </section>
      ))}
    </div>
  );
}
