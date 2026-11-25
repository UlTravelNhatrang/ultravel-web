import Image from 'next/image';
import Link from 'next/link';
import { TOP_DESTINATIONS } from '@/content/catalog';
import { ROUTES } from '@/lib/routes';
import { HomeHead } from './HomeHead';

/** Six destinations in a bento grid: the first one large, counts of guides, hotels and tours on each. */
export function TopDestinations() {
  return (
    <section className="wrap hsec" aria-labelledby="dest-t">
      <HomeHead id="dest-t" eyebrow="Điểm đến" title={<>Nơi thổ địa <em className="it">biết rõ nhất</em></>} link={{ href: ROUTES.places, label: 'Tất cả điểm đến' }} />
      <div className="dgrid">
        {TOP_DESTINATIONS.map((d, i) => (
          <Link key={d.name} href={`${ROUTES.places}?q=${encodeURIComponent(d.name)}`} className="dcard">
            <Image src={d.photo} alt="" fill sizes={i === 0 ? '(max-width: 1023px) 50vw, 50vw' : '(max-width: 1023px) 50vw, 25vw'} />
            <div className="dcard-body">
              <p className="dcard-region">{d.region}</p>
              <h3 className="dcard-name">{d.name}</h3>
              <p className="dcard-counts"><span><b>{d.posts}</b> bài</span><span><b>{d.hotels}</b> khách sạn</span><span><b>{d.tours}</b> tour</span></p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
