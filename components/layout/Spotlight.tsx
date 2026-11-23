'use client';

/* eslint-disable @next/next/no-img-element -- two stacked copies of the same logo PNG */
import { useEffect, useRef } from 'react';

/**
 * Footer logo as a ghost that lights up in full colour under the cursor.
 * When the pointer leaves the row, the light goes back to sweeping on its own (CSS animation).
 */
export function Spotlight() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spot = spotRef.current;
    if (!spot || !matchMedia('(hover: hover)').matches) return;
    const zone = spot.parentElement; // the whole footer row steers the light, not just the logo
    if (!zone) return;
    const move = (e: PointerEvent) => {
      const r = spot.getBoundingClientRect();
      spot.classList.add('is-live');
      spot.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
      spot.style.setProperty('--my', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
    };
    const leave = () => {
      spot.classList.remove('is-live');
      spot.style.removeProperty('--mx');
      spot.style.removeProperty('--my');
    };
    zone.addEventListener('pointermove', move);
    zone.addEventListener('pointerleave', leave);
    return () => {
      zone.removeEventListener('pointermove', move);
      zone.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div ref={spotRef} className="spot order-1 md:order-2" aria-hidden="true">
      <img src="/assets/ultravel-wordmark-light.png" alt="" width={1961} height={320} loading="lazy" className="spot-ghost" />
      <img src="/assets/ultravel-wordmark-light.png" alt="" width={1961} height={320} loading="lazy" className="spot-lit" />
      <span className="spot-hint mono">Di chuột để soi đèn</span>
    </div>
  );
}
