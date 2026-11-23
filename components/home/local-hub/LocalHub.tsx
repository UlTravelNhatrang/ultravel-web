'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AsideNote, SectionHeader } from '@/components/ui/Section';
import { AREAS, GUIDES, PLACES } from '@/content/home';
import { pad } from '@/lib/format';
import { useHour } from '@/lib/use-hour';
import { afterLayout, gsap, headerHeight, motionOK, ScrollTrigger, smoothTo } from '@/lib/motion';
import { ROUTES } from '@/lib/routes';
import { GuideCardItem, PlaceCard } from './HubCards';
import { HubMap } from './HubMap';

const TABS = ['01 Kinh nghiệm', '02 Ăn gì', '03 Uống gì', '04 Chơi gì & giá vé'];
const ALL = AREAS[0];

/**
 * "Nha Trang, Khánh Hòa" hub. On large screens the section pins and scrolling walks
 * through the four tabs (and back up); elsewhere the tabs are plain buttons.
 */
export function LocalHub() {
  const [tab, setTab] = useState(0);
  const [area, setArea] = useState(ALL);
  const [hovered, setHovered] = useState<number | null>(null);
  // Opening hours depend on the visitor's clock: null while prerendering, the real hour once in the browser.
  const hour = useHour();

  const tabRef = useRef(0);
  const pinned = useRef<ScrollTrigger | null>(null);
  const firstRender = useRef(true);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const selectTab = useCallback((i: number) => {
    if (i === tabRef.current) return;
    tabRef.current = i;
    setTab(i);
    setArea(ALL);
    setHovered(null);
  }, []);

  // While pinned, a tab click scrolls to that tab's slice of the pin so scroll and tabs stay in sync.
  const onTabClick = (i: number) => {
    const st = pinned.current;
    if (st) smoothTo(st.start + ((st.end - st.start) * (i + 0.5)) / 4);
    else selectTab(i);
  };

  // New content rises in when the tab or area changes.
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    if (motionOK()) {
      const root = tab ? listRef.current : gridRef.current;
      const cards = root?.querySelectorAll(tab ? '.hc' : '.hub-card');
      if (cards?.length) gsap.fromTo(cards, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.06, overwrite: true });
      const pins = listRef.current?.querySelectorAll('.pin');
      if (tab && pins?.length) gsap.fromTo(pins, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power3.out', stagger: 0.08 });
    }
    if (!pinned.current) ScrollTrigger.refresh();
  }, [tab, area]);

  // Pin on large screens with motion allowed. Built after layout (see afterLayout) so client-side
  // navigation back to the homepage measures the real page.
  useEffect(() => {
    const mm = gsap.matchMedia();
    const cancel = afterLayout(() => mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const stage = stageRef.current!, pinEl = pinRef.current!;
      // Keep the stage as tall as the article grid so switching tabs never changes the pinned height.
      const fit = () => { const g = gridRef.current; if (g?.offsetHeight) stage.style.minHeight = `${Math.max(g.offsetHeight, 320)}px`; };
      fit();
      const st = ScrollTrigger.create({
        trigger: pinEl,
        pin: true,
        anticipatePin: 1,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        // Short windows: if the stage cannot fit under the header, pin it by its bottom edge instead.
        start: () => (pinEl.offsetHeight + headerHeight() > innerHeight ? 'bottom bottom-=8' : `top top+=${headerHeight() - 8}`),
        end: () => `+=${innerHeight * 4}`,
        onRefreshInit: fit,
        onUpdate: self => {
          gsap.set(barRef.current, { scaleX: self.progress });
          const i = Math.min(3, Math.floor(self.progress * 4));
          if (i !== tabRef.current && !window.__flying) selectTab(i);
        },
      });
      pinned.current = st;
      return () => { pinned.current = null; stage.style.minHeight = ''; };
    }));
    return () => { cancel(); mm.revert(); };
  }, [selectTab]);

  const listTab = tab as 1 | 2 | 3;
  const allPlaces = tab ? PLACES[listTab] : [];
  const places = allPlaces.filter(p => area === ALL || p[2] === area);

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 pt-20 md:pt-28" aria-labelledby="hubTitle">
      <SectionHeader label="03 — Thổ địa / Nha Trang" aside={<AsideNote>Khánh Hòa / VN</AsideNote>} />
      <div ref={pinRef} id="hubPin">
        <div className="flex flex-wrap items-end justify-between gap-6 pt-6 mb-8">
          <h2 id="hubTitle" className="hd text-4xl md:text-6xl">Nha Trang,<br />Khánh Hòa<span className="text-red">.</span></h2>
          <div id="tabs" role="tablist" className="snap flex overflow-x-auto max-w-full border border-ink mono text-[11px]">
            {TABS.map((label, i) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={tab === i}
                onClick={() => onTabClick(i)}
                className={`px-4 py-3 whitespace-nowrap hover:bg-paper2 ${i < TABS.length - 1 ? 'border-r border-ink' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="hub-prog hidden lg:flex items-center gap-3 mono text-ink2 -mt-4 mb-5" aria-hidden="true">
          <span>Cuộn để xem tiếp</span>
          <div className="relative flex-1 h-[3px] rounded-full bg-ink/10 overflow-hidden">
            <div ref={barRef} id="hubBar" className="absolute inset-y-0 left-0 w-full bg-red rounded-full origin-left scale-x-0" />
          </div>
          <span id="hubStep">{pad(tab + 1)} / 04</span>
        </div>

        <div ref={stageRef} id="hubStage">
          <div id="hubfilter" className={`${tab ? '' : 'hidden'} flex flex-wrap mb-6 mono text-[11px] border-l border-t border-ink w-max max-w-full`} aria-label="Lọc theo khu vực">
            {AREAS.map(a => (
              <button key={a} type="button" onClick={() => setArea(a)} className={`px-4 py-2.5 border-r border-b border-ink ${a === area ? 'bg-ink text-paper' : 'hover:bg-paper2'}`}>{a}</button>
            ))}
          </div>

          {/* The guide grid stays mounted so the pinned stage can measure its height. */}
          <div ref={gridRef} id="hubgrid" className={`grid-ink grid-cols-2 lg:grid-cols-4 ${tab ? 'hidden' : ''}`}>
            {GUIDES.map((card, k) => <GuideCardItem key={card[0]} card={card} index={k} />)}
          </div>

          <div ref={listRef} id="hublist" className={tab ? '' : 'hidden'}>
            <div className="grid-ink lg:grid-cols-12">
              <HubMap places={places} active={hovered} />
              <div className="card-bare lg:col-span-8 p-0">
                <div id="hubcards" className="grid sm:grid-cols-2 gap-[var(--card-gap)] h-full content-stretch">
                  {places.length ? (
                    places.map((p, i) => (
                      <PlaceCard key={p[0]} place={p} index={i} photoIndex={allPlaces.indexOf(p)} tab={listTab} hour={hour} onHover={setHovered} />
                    ))
                  ) : (
                    <div className="sm:col-span-2 bg-white/55 rounded-[var(--card-r)] p-10 text-center">
                      <p className="mono text-ink2">0 kết quả</p>
                      <p className="hd text-2xl mt-3">Chưa có địa điểm trong khu vực này.</p>
                      <button type="button" className="bx mt-5 px-5 py-3 mono text-[11px] font-semibold" onClick={() => setArea(ALL)}>Xem tất cả khu vực</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link href={ROUTES.places} className="bx mt-6 px-5 py-3 mono text-[11px] font-semibold">Xem tất cả địa điểm ở Nha Trang <span className="arr">→</span></Link>
      </div>
    </section>
  );
}
