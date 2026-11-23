'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import { gsap, headerHeight, motionOK, ScrollTrigger, smoothTo } from '@/lib/motion';

/**
 * Smooth wheel scrolling with inertia; in-page anchors and back-to-top glide instead of jumping.
 * Lenis only smooths the wheel, so touch devices (already smooth natively) skip it and save its per-frame
 * work; their anchors and back-to-top use native smooth scrolling through smoothTo().
 */
function setupSmoothScroll(wheel: boolean) {
  const lenis = wheel ? new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, wheelMultiplier: 0.9 }) : null;
  const raf = (time: number) => lenis?.raf(time * 1000);
  if (lenis) {
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
  }

  const onClick = (e: MouseEvent) => {
    // A component that handled the click itself (e.g. the review section tabs) has already prevented the default.
    if (e.defaultPrevented) return;
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    const href = a?.getAttribute('href');
    if (!a || !href || href.length < 2) return;
    if (a.classList.contains('totop') && lenis) {
      // Long trip home: ease in, cruise, ease out; a longer distance gets a little more time.
      e.preventDefault();
      a.classList.add('go');
      window.__flying = true;
      lenis.scrollTo(0, {
        duration: Math.min(2.6, Math.max(1.2, scrollY / 5200)),
        easing: t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
        lock: true,
        force: true,
        onComplete: () => { a.classList.remove('go'); window.__flying = false; ScrollTrigger.update(); },
      });
      return;
    }
    const el = document.querySelector<HTMLElement>(href);
    if (!el) return;
    e.preventDefault();
    // Land just below the sticky header, or at the element's own scroll-margin when it sets one
    // (review sections reserve room for their sticky tab bar). Lenis gets a pixel value: given an
    // element it would apply scroll-margin a second time and land short.
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || headerHeight() + 12;
    smoothTo(Math.max(0, Math.round(el.getBoundingClientRect().top + scrollY - margin)));
  };
  // Clicking a link to another page cancels any glide still running, so it can't carry over.
  const onNavigate = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
    const href = a?.getAttribute('href');
    if (lenis && a && href && !href.startsWith('#') && a.origin === location.origin && lenis.isScrolling) lenis.scrollTo(scrollY, { immediate: true, force: true });
  };
  document.addEventListener('click', onClick);
  document.addEventListener('click', onNavigate, true);

  return () => {
    document.removeEventListener('click', onClick);
    document.removeEventListener('click', onNavigate, true);
    if (lenis) {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = undefined;
    }
  };
}

/** Soft bubble cursor that swells over links and shows a tag over [data-cursor] areas. */
function customCursor() {
  const root = document.getElementById('cur');
  if (!root) return () => {};
  const cx = root.querySelector<HTMLElement>('.cur-x')!, tag = root.querySelector<HTMLElement>('.cur-tag')!;
  document.documentElement.classList.add('has-cursor');
  root.classList.add('is-out');
  const xX = gsap.quickTo(cx, 'x', { duration: 0.25, ease: 'power3' }), xY = gsap.quickTo(cx, 'y', { duration: 0.25, ease: 'power3' });
  const tX = gsap.quickTo(tag, 'x', { duration: 0.6, ease: 'power3' }), tY = gsap.quickTo(tag, 'y', { duration: 0.6, ease: 'power3' });
  let first = true, lastTarget: Element | null = null;
  const state = (el: Element) => {
    if (el === lastTarget) return;
    lastTarget = el;
    const labelled = el.closest<HTMLElement>('[data-cursor]');
    root.classList.toggle('is-text', !!el.closest('input,textarea,select'));
    if (labelled) tag.textContent = labelled.dataset.cursor ?? '';
    root.classList.toggle('is-label', !!labelled);
    root.classList.toggle('is-link', !labelled && !!el.closest('a,button,label,summary,[role=tab]'));
  };
  const move = (e: PointerEvent) => {
    if (first) { gsap.set([cx, tag], { x: e.clientX, y: e.clientY }); first = false; }
    xX(e.clientX); xY(e.clientY); tX(e.clientX); tY(e.clientY);
    root.classList.remove('is-out');
    state(e.target as Element);
  };
  const down = () => root.classList.add('is-down');
  const up = () => root.classList.remove('is-down');
  const out = (e: PointerEvent) => { if (!e.relatedTarget) root.classList.add('is-out'); };
  addEventListener('pointermove', move, { passive: true });
  addEventListener('pointerdown', down);
  addEventListener('pointerup', up);
  document.addEventListener('pointerout', out);
  return () => {
    document.documentElement.classList.remove('has-cursor');
    removeEventListener('pointermove', move);
    removeEventListener('pointerdown', down);
    removeEventListener('pointerup', up);
    document.removeEventListener('pointerout', out);
  };
}

/**
 * Site-wide motion that must survive page changes: one Lenis instance (so Next's scroll restoration and
 * scroll-to-top work with it, instead of fighting a fresh instance per page) and the custom cursor.
 */
export function SiteMotion() {
  useEffect(() => {
    if (!motionOK()) return;
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const stopScroll = setupSmoothScroll(fine);
    const stopCursor = fine ? customCursor() : () => {};
    return () => { stopCursor(); stopScroll(); };
  }, []);
  return null;
}
