import Image from 'next/image';
import { Carousel } from '@/components/ui/Carousel';
import { SOCIAL_LINKS } from '@/content/social-links';
import { SOCIAL_POSTS } from '@/content/social-posts';
import { HomeHead } from './HomeHead';

const iconOf = (network: string) => SOCIAL_LINKS.find(s => s.name === network);

/** Posts shared from Ultravel's social channels: square cards (photo half, caption half) in a sliding row. */
export function SocialFeed() {
  return (
    <section className="wrap hsec" aria-labelledby="social-t">
      <HomeHead id="social-t" eyebrow="Từ mạng xã hội" title={<>Ultravel <em className="it">trên mạng xã hội</em></>} />
      <Carousel label="Bài viết từ mạng xã hội">
        {SOCIAL_POSTS.map(p => {
          const ico = iconOf(p.network);
          return (
            <a key={p.id} href={p.href} target="_blank" rel="noopener noreferrer" className="soc-card">
              <span className="soc-card-img"><Image src={p.photo} alt="" fill sizes="(max-width: 639px) 75vw, 300px" /></span>
              <span className="soc-card-body">
                <span className="soc-card-net">
                  {ico && <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={ico.path} /></svg>}
                  {p.network}<span className="soc-card-date">{p.date}</span>
                </span>
                <span className="soc-card-cap">{p.caption}</span>
                <span className="soc-card-stat">{p.stat}<span className="sr-only"> (mở {p.network} trong tab mới)</span></span>
              </span>
            </a>
          );
        })}
      </Carousel>
    </section>
  );
}
