'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { HERO_SLIDES } from '@/content/hero-slides';
import { motionOK } from '@/lib/motion';
import { SearchTabs } from './SearchTabs';

const AUTOPLAY_MS = 6500;

/**
 * Full-bleed photo hero that cross-fades between the CMS slides (content/hero-slides), with the
 * tabbed search card overlapping its bottom edge. Autoplay pauses on hover, keyboard focus and
 * for reduced motion.
 */
export function HomeHero() {
  const slides = HERO_SLIDES;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  // The first slide paints immediately (it is the LCP); only later slides fade their copy in.
  const [moved, setMoved] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const many = slides.length > 1;

  useEffect(() => {
    if (!many || paused || !motionOK()) return;
    const t = setTimeout(() => { setMoved(true); setI(n => (n + 1) % slides.length); }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [i, paused, many, slides.length]);

  const go = (n: number) => { setMoved(true); setI((n + slides.length) % slides.length); };
  const s = slides[i];

  return (
    <section className="hh-wrap" aria-labelledby="hh-title" aria-roledescription={many ? 'carousel' : undefined}>
      <div
        ref={rootRef}
        className="hh"
        onPointerEnter={e => e.pointerType === 'mouse' && setPaused(true)}
        onPointerLeave={e => e.pointerType === 'mouse' && setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={e => { if (!rootRef.current?.contains(e.relatedTarget as Node)) setPaused(false); }}
      >
        {slides.map((x, k) => (
          <Image
            key={x.id}
            src={x.image}
            alt={k === i ? x.alt : ''}
            aria-hidden={k !== i}
            fill
            preload={k === 0}
            fetchPriority={k === 0 ? 'high' : 'low'}
            sizes="(max-width: 1440px) 100vw, 1440px"
            className={`hh-img ${k === i ? 'is-on' : ''}`}
          />
        ))}
        {/* key: the copy re-runs its fade-in when the slide changes */}
        <div key={s.id} className={`hh-copy ${moved ? 'is-swap' : ''}`}>
          <p className="hh-eyebrow">{s.eyebrow}</p>
          <h1 id="hh-title" className="hh-title">{s.title}{s.accent && <> <em className="it">{s.accent}</em></>}</h1>
          <p className="hh-sub">{s.sub}</p>
          {s.cta && <Link href={s.cta.href} className="hh-cta">{s.cta.label} <span aria-hidden="true">→</span></Link>}
        </div>
        {many && (
          <div className="hh-ctrl">
            <button type="button" className="hh-arrow" onClick={() => go(i - 1)} aria-label="Ảnh trước">←</button>
            <div className="hh-dots">
              {slides.map((x, k) => (
                <button key={x.id} type="button" className={k === i ? 'is-on' : ''} onClick={() => go(k)} aria-label={`Ảnh ${k + 1} / ${slides.length}`} aria-current={k === i ? 'true' : undefined} />
              ))}
            </div>
            <button type="button" className="hh-arrow" onClick={() => go(i + 1)} aria-label="Ảnh tiếp theo">→</button>
          </div>
        )}
      </div>
      <div className="hh-search"><SearchTabs /></div>
    </section>
  );
}
