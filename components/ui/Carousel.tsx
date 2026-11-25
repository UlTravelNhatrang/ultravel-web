'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { motionOK } from '@/lib/motion';

type Props = {
  /** Accessible name of the slide list. */
  label: string;
  /** Each child is one slide (give it a fixed width). */
  children: ReactNode;
  /** Move on by itself every N ms; omitted = manual only. Never runs for reduced motion. */
  autoplayMs?: number;
  className?: string;
};

/**
 * Horizontal slider: native touch swipe, mouse drag with momentum, arrow buttons and arrow keys,
 * optional autoplay. Snapping is turned off while dragging and while a release glide runs, so the
 * browser never yanks the track mid-way; the glide always lands exactly on a slide.
 */
export function Carousel({ label, children, autoplayMs, className = '' }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const track = trackRef.current!, prev = prevRef.current!, next = nextRef.current!;
    const slides = () => [...track.children] as HTMLElement[];
    const step = () => { const s = slides(); return s.length > 1 ? s[1].offsetLeft - s[0].offsetLeft : track.clientWidth; };
    const max = () => track.scrollWidth - track.clientWidth;

    let glide = 0;
    const stopGlide = () => { cancelAnimationFrame(glide); glide = 0; };
    const glideTo = (target: number) => {
      stopGlide();
      track.classList.add('is-moving');
      const from = track.scrollLeft, dist = target - from;
      if (!motionOK() || Math.abs(dist) < 1) { track.scrollLeft = target; track.classList.remove('is-moving'); return; }
      const dur = Math.min(650, 320 + Math.abs(dist) * 0.35), t0 = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / dur);
        track.scrollLeft = from + dist * (1 - Math.pow(1 - k, 3));
        if (k < 1) glide = requestAnimationFrame(tick);
        else { glide = 0; track.classList.remove('is-moving'); }
      };
      glide = requestAnimationFrame(tick);
    };
    const go = (dir: number) => {
      const st = step() || 1, i = Math.round(track.scrollLeft / st) + dir;
      // Past the end wraps to the start (autoplay and the next button at the end).
      glideTo(i * st > max() + 2 ? 0 : Math.max(0, Math.min(max(), i * st)));
    };

    // Buttons enabled/disabled from the scroll position (read in the scroll event, written in a frame).
    let raf = 0;
    const paint = () => { raf = 0; const l = track.scrollLeft; prev.disabled = l <= 2; next.disabled = max() <= 2; };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };

    // Autoplay, held while the visitor is on or near it.
    let timer = 0, hovered = false, focused = false, down = false, onScreen = false;
    const canRun = () => !!autoplayMs && motionOK() && !hovered && !focused && !down && onScreen && !document.hidden;
    const arm = () => { clearTimeout(timer); if (canRun()) timer = window.setTimeout(() => { go(1); arm(); }, autoplayMs); };

    const onPrev = () => { go(-1); arm(); }, onNext = () => { go(1); arm(); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); onNext(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); onPrev(); }
    };

    // Mouse drag with momentum (touch scrolls natively).
    let moved = false, startX = 0, startL = 0, samples: { x: number; t: number }[] = [];
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      stopGlide();
      down = true; moved = false; startX = e.clientX; startL = track.scrollLeft; samples = [{ x: e.clientX, t: e.timeStamp }];
      arm();
      addEventListener('pointermove', onMove);
      addEventListener('pointerup', onUp, { once: true });
    };
    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 4) { moved = true; track.classList.add('is-moving', 'is-dragging'); }
      if (!moved) return;
      track.scrollLeft = startL - dx;
      samples.push({ x: e.clientX, t: e.timeStamp });
      if (samples.length > 6) samples.shift();
    };
    const onUp = (e: PointerEvent) => {
      removeEventListener('pointermove', onMove);
      down = false;
      track.classList.remove('is-dragging');
      if (!moved) { track.classList.remove('is-moving'); arm(); return; }
      const recent = samples.filter(s => e.timeStamp - s.t < 100), first = recent[0] ?? samples[0];
      const v = recent.length > 1 ? (first.x - e.clientX) / Math.max(1, e.timeStamp - first.t) : 0;
      const st = step() || 1, from = Math.round(startL / st), dragged = track.scrollLeft - startL;
      let i = Math.round((track.scrollLeft + v * 260) / st);
      if ((dragged > 40 || v > 0.3) && i <= from) i = from + 1;
      if ((dragged < -40 || v < -0.3) && i >= from) i = from - 1;
      glideTo(Math.max(0, Math.min(max(), i * st)));
      arm();
    };
    // A drag must not also open the slide under the pointer.
    const onClick = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } };

    const onEnter = (e: PointerEvent) => { if (e.pointerType === 'mouse') { hovered = true; arm(); } };
    const onLeave = (e: PointerEvent) => { if (e.pointerType === 'mouse') { hovered = false; arm(); } };
    const onFocusIn = (e: FocusEvent) => { focused = (e.target as HTMLElement).matches(':focus-visible'); arm(); };
    const onFocusOut = (e: FocusEvent) => { if (!track.contains(e.relatedTarget as Node)) { focused = false; arm(); } };
    const onVis = () => arm();
    const io = new IntersectionObserver(([en]) => { onScreen = en.isIntersecting; arm(); }, { threshold: 0.4 });
    const ro = new ResizeObserver(onScroll);

    prev.addEventListener('click', onPrev);
    next.addEventListener('click', onNext);
    track.addEventListener('keydown', onKey);
    track.addEventListener('scroll', onScroll, { passive: true });
    track.addEventListener('pointerdown', onDown);
    track.addEventListener('click', onClick, true);
    track.addEventListener('pointerenter', onEnter);
    track.addEventListener('pointerleave', onLeave);
    track.addEventListener('focusin', onFocusIn);
    track.addEventListener('focusout', onFocusOut);
    document.addEventListener('visibilitychange', onVis);
    io.observe(track);
    ro.observe(track);

    return () => {
      stopGlide(); cancelAnimationFrame(raf); clearTimeout(timer);
      io.disconnect(); ro.disconnect();
      prev.removeEventListener('click', onPrev);
      next.removeEventListener('click', onNext);
      track.removeEventListener('keydown', onKey);
      track.removeEventListener('scroll', onScroll);
      track.removeEventListener('pointerdown', onDown);
      track.removeEventListener('click', onClick, true);
      track.removeEventListener('pointerenter', onEnter);
      track.removeEventListener('pointerleave', onLeave);
      track.removeEventListener('focusin', onFocusIn);
      track.removeEventListener('focusout', onFocusOut);
      document.removeEventListener('visibilitychange', onVis);
      removeEventListener('pointermove', onMove);
      removeEventListener('pointerup', onUp);
    };
  }, [autoplayMs]);

  return (
    <div className={`car ${className}`}>
      <div className="car-ctrl">
        <button ref={prevRef} type="button" className="car-arrow" aria-label="Trước">←</button>
        <button ref={nextRef} type="button" className="car-arrow" aria-label="Tiếp theo">→</button>
      </div>
      <div ref={trackRef} className="car-track" role="group" aria-roledescription="carousel" aria-label={label} tabIndex={0}>
        {children}
      </div>
    </div>
  );
}
