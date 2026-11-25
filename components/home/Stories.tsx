import Image from 'next/image';
import Link from 'next/link';
import { STORIES, type Story } from '@/content/catalog';
import { postHrefForTitle } from '@/lib/posts';
import { ROUTES } from '@/lib/routes';
import { HomeHead } from './HomeHead';

const hrefOf = (s: Story) => s.href ?? postHrefForTitle(s.title) ?? ROUTES.guides;

function Meta({ s }: { s: Story }) {
  return (
    <p className="st-meta">
      <span className="st-cat">{s.category}</span>
      <span>{s.date}</span>
      <span aria-hidden="true">·</span>
      <span>{s.read} phút đọc</span>
    </p>
  );
}

/** "Cẩm nang, mẹo & hướng dẫn": one featured post on the left, a list of four on the right. */
export function Stories() {
  const [feat, ...rest] = STORIES;
  return (
    <section className="wrap hsec" aria-labelledby="stories-t">
      <HomeHead id="stories-t" eyebrow="Cẩm nang" title={<>Mẹo, lịch trình <em className="it">& hướng dẫn</em></>} link={{ href: ROUTES.guides, label: 'Tất cả bài viết' }} />
      <div className="stories">
        <Link href={hrefOf(feat)} className="st-feat">
          <div className="st-feat-img"><Image src={feat.photo} alt="" fill sizes="(max-width: 1023px) 100vw, 55vw" /></div>
          <div className="st-feat-body">
            <Meta s={feat} />
            <h3 className="st-feat-t">{feat.title}</h3>
            <p className="st-ex">{feat.excerpt}</p>
          </div>
        </Link>
        <div className="st-list">
          {rest.map(s => (
            <Link key={s.title} href={hrefOf(s)} className="st-item">
              <div className="st-thumb"><Image src={s.photo} alt="" fill sizes="150px" /></div>
              <div>
                <Meta s={s} />
                <h3 className="st-item-t">{s.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
