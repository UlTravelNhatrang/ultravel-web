'use client';

import { useEffect, useRef, useState } from 'react';
import { headerHeight, motionOK, placeBlob, smoothTo } from '@/lib/motion';

export type SectionLink = { id: string; label: string };

/**
 * Sticky pill tabs for a long page (review body, B2B page). The white bubble follows the section being read,
 * and a click glides to that section just below the header and this bar.
 */
export function SectionNav({ sections }: { sections: SectionLink[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const navRef = useRef<HTMLElement>(null);
  const blobRef = useRef<HTMLSpanElement>(null);

  // Scroll-spy: the active section is the last one whose top has passed under the bars.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = headerHeight() + (navRef.current?.offsetHeight ?? 0) + 40;
      let current = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    return () => { cancelAnimationFrame(raf); removeEventListener('scroll', queue); removeEventListener('resize', queue); };
  }, [sections]);

  // Glide the bubble under the active tab and keep that tab in view on narrow screens.
  useEffect(() => {
    const nav = navRef.current, blob = blobRef.current;
    const tab = nav?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!nav || !blob || !tab) return;
    placeBlob(blob, tab.offsetLeft, tab.offsetWidth);
    const left = tab.offsetLeft - nav.clientWidth / 2 + tab.offsetWidth / 2;
    nav.scrollTo({ left, behavior: motionOK() ? 'smooth' : 'auto' });
  }, [active]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + scrollY - headerHeight() - (navRef.current?.offsetHeight ?? 0) - 16;
    smoothTo(Math.max(0, Math.round(y)));
  };

  return (
    <div className="rv-nav-wrap">
      <nav ref={navRef} className="rv-nav snap" aria-label="Mục trong trang">
        <span ref={blobRef} className="rv-nav-blob" aria-hidden="true" />
        {sections.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            data-id={s.id}
            aria-current={active === s.id ? 'true' : undefined}
            onClick={e => { e.preventDefault(); e.stopPropagation(); go(s.id); }}
            className="rv-tab"
          >
            {s.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
