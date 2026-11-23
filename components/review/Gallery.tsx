'use client';

/* eslint-disable @next/next/no-img-element -- the lightbox shows the full photo at its own size */

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react';
import type { Review } from '@/types/review';

/**
 * Bento of 1 large + 4 small photos (a swipe row on phones). Any photo opens a full-screen viewer
 * with arrow keys, swipe and Esc.
 */
export function Gallery({ photos, total }: { photos: Review['photos']; total: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const shown = photos.slice(0, 5);

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 mt-[var(--card-gap)]" aria-label="Ảnh">
      <div className="gallery">
        {shown.map((p, i) => (
          <button key={p.src} type="button" onClick={() => setOpen(i)} className={`gallery-cell ${i === 0 ? 'hero-img is-big' : ''}`} data-cursor="Xem ảnh" aria-label={`Xem ảnh: ${p.alt}`}>
            <Image src={p.src} alt={p.alt} width={i ? 600 : 1200} height={i ? 450 : 900} sizes={i ? '(max-width: 767px) 50vw, 25vw' : '(max-width: 767px) 100vw, 50vw'} preload={!i} loading={i ? 'lazy' : 'eager'} fetchPriority={i ? undefined : 'high'} draggable={false} />
            {i === shown.length - 1 && <span className="gallery-more mono">Xem {total} ảnh</span>}
          </button>
        ))}
      </div>
      {open !== null && <Lightbox photos={photos} start={open} total={total} onClose={() => setOpen(null)} />}
    </section>
  );
}

function Lightbox({ photos, start, total, onClose }: { photos: Review['photos']; start: number; total: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const go = useCallback((d: number) => setI(v => (v + d + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    window.__lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    addEventListener('keydown', onKey);
    return () => {
      removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      window.__lenis?.start();
      previous?.focus();
    };
  }, [go, onClose]);

  const p = photos[i];
  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Ảnh của quán"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="lightbox-bar mono">
        <span>{i + 1} / {photos.length} <span className="opacity-60">(xem trước {photos.length} trên {total} ảnh)</span></span>
        <button ref={closeRef} type="button" onClick={onClose} className="lb-btn" aria-label="Đóng"><X size={20} /></button>
      </div>
      <figure className="lightbox-figure">
        <img key={p.src} src={p.src} alt={p.alt} />
        <figcaption className="mono">{p.alt}</figcaption>
      </figure>
      <button type="button" className="lb-btn lb-prev" onClick={() => go(-1)} aria-label="Ảnh trước"><ArrowLeft size={20} /></button>
      <button type="button" className="lb-btn lb-next" onClick={() => go(1)} aria-label="Ảnh tiếp theo"><ArrowRight size={20} /></button>
    </div>
  );
}
