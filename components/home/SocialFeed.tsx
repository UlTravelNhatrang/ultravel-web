import Image from 'next/image';
import { Heart, ChatCircle } from '@phosphor-icons/react/dist/ssr';
import { Carousel } from '@/components/ui/Carousel';
import { SOCIAL_POSTS } from '@/content/social-posts';
import { SOCIAL_LINKS } from '@/content/social-links';
import { HomeHead } from './HomeHead';

const iconOf = (name: string) => SOCIAL_LINKS.find(s => s.name === name);
// Each platform's own colour on its badge. TikTok's cyan can't carry white text, so it uses its black.
const badgeBg = (name: string) => (name === 'TikTok' ? '#000000' : iconOf(name)?.brand);

/** Posts shared from Ultravel's social channels: square cards, photo on the top half, the post on the bottom half. */
export function SocialFeed() {
  return (
    <section className="wrap hsec" aria-labelledby="social-t">
      <HomeHead id="social-t" eyebrow="Từ mạng xã hội" title={<>Ultravel trên <em className="it">mạng xã hội</em></>} />
      <Carousel label="Bài viết từ mạng xã hội">
        {SOCIAL_POSTS.map(p => {
          const ic = iconOf(p.platform);
          return (
            <a key={p.id} href={p.href} target="_blank" rel="noopener noreferrer" className="sp-card group" aria-label={`${p.platform}: ${p.text}`}>
              <div className="sp-img">
                <Image src={p.photo} alt="" fill sizes="(max-width: 639px) 78vw, 300px" />
                <span className="sp-badge" style={{ background: badgeBg(p.platform) }}>
                  {ic && <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true"><path fill="currentColor" d={ic.path} /></svg>}
                  {p.platform}
                </span>
              </div>
              <div className="sp-body">
                <p className="sp-head"><b>@ultravel.vn</b><span>{p.date}</span></p>
                <p className="sp-text">{p.text}</p>
                <p className="sp-stats">
                  <span><Heart size={15} weight="fill" aria-hidden="true" />{p.likes}</span>
                  <span><ChatCircle size={15} weight="fill" aria-hidden="true" />{p.comments}</span>
                  <span className="sp-open">Xem bài <span className="arr" aria-hidden="true">→</span></span>
                </p>
              </div>
            </a>
          );
        })}
      </Carousel>
    </section>
  );
}
