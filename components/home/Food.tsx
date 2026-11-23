import Link from 'next/link';
import { Photo } from '@/components/ui/Photo';
import { Arrow, AsideLink, Section, SectionHeader, SectionTitle } from '@/components/ui/Section';
import { FOOD, FOOD_SPANS } from '@/content/home';
import { PHOTOS } from '@/content/photos';
import { pad } from '@/lib/format';
import { ROUTES } from '@/lib/routes';

/** Dishes and gifts as a bento grid: one big feature cell, five smaller ones. */
export function Food() {
  return (
    <Section labelledBy="foodTitle">
      <SectionHeader label="05 — Ẩm thực / Đặc sản" aside={<AsideLink href={ROUTES.food} label="Xem tất cả món ăn và đặc sản">Xem tất cả <Arrow /></AsideLink>} />
      <SectionTitle id="foodTitle" className="mt-6 mb-8 max-w-[24ch]">Món phải thử &amp; đặc sản làm quà</SectionTitle>
      <div id="food" className="grid-ink grid-cols-2 lg:grid-cols-6 lg:grid-rows-[repeat(2,17rem)] grid-flow-dense">
        {FOOD.map(([name, category], k) => {
          const feature = k === 0;
          return (
            <Link key={name} href={ROUTES.food} data-cursor="Xem" className={`food-cell group relative lg:h-auto ${FOOD_SPANS[k]}`}>
              <Photo src={PHOTOS.food[k]} alt={name} width={feature ? 1000 : 700} height={feature ? 1000 : 500} className="absolute inset-0" />
              <div className="absolute left-0 bottom-0 z-[2] bg-paper border-t border-r border-ink px-3 py-2.5 max-w-[85%] group-hover:bg-red group-hover:text-ink group-hover:border-red">
                <p className="mono">F-{pad(k + 1)} / {category}</p>
                <h3 className={`hd ${feature ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl'} mt-1`}>{name}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
