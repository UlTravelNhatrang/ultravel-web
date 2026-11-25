'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

/**
 * Footer logo as a ghost that lights up in full colour under the cursor.
 * When the pointer leaves the row, the light rests where the sweep starts (no idle animation).
 */
export function Spotlight() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spot = spotRef.current;
    if (!spot || !matchMedia('(hover: hover)').matches) return;
    const zone = spot.parentElement; // the whole footer row steers the light, not just the logo
    if (!zone) return;
    // Pointer events can fire several times a frame: keep the last position, write once per frame.
    let rect: DOMRect | null = null, raf = 0, px = 0, py = 0;
    const paint = () => {
      raf = 0;
      if (!rect) { rect = spot.getBoundingClientRect(); spot.classList.add('is-live'); }
      spot.style.setProperty('--mx', `${(((px - rect.left) / rect.width) * 100).toFixed(1)}%`);
      spot.style.setProperty('--my', `${(((py - rect.top) / rect.height) * 100).toFixed(1)}%`);
    };
    const move = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    // The page can scroll under a still pointer: measure again on the next paint.
    const stale = () => { rect = null; };
    const leave = () => {
      cancelAnimationFrame(raf); raf = 0; rect = null;
      spot.classList.remove('is-live');
      spot.style.removeProperty('--mx');
      spot.style.removeProperty('--my');
    };
    zone.addEventListener('pointermove', move);
    zone.addEventListener('pointerleave', leave);
    addEventListener('scroll', stale, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      zone.removeEventListener('pointermove', move);
      zone.removeEventListener('pointerleave', leave);
      removeEventListener('scroll', stale);
    };
  }, []);

  return (
    <div ref={spotRef} className="spot order-1 md:order-2" aria-hidden="true">
      {/* Same sizes on both, so the browser fetches the file once. */}
      <Image src="/assets/ultravel-wordmark-light.png" alt="" width={1961} height={320} sizes="(max-width: 767px) 92vw, 50vw" className="spot-ghost" />
      <Image src="/assets/ultravel-wordmark-light.png" alt="" width={1961} height={320} sizes="(max-width: 767px) 92vw, 50vw" className="spot-lit" />
      <span className="spot-hint mono">Di chuột để soi đèn</span>
    </div>
  );
}
