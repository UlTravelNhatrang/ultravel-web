'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    /** Smooth-scroll instance, set by <SiteMotion> when motion is allowed. */
    __lenis?: Lenis;
    /** True while the back-to-top glide runs, so pinned sections don't react mid-flight. */
    __flying?: boolean;
    /** Set once animation has booted (the head script uses it as a fallback check). */
    __motion?: boolean;
    /** Lifts the page-change curtain (set by <CurtainController>). */
    __curtainReveal?: () => void;
  }
}

export { gsap, ScrollTrigger };

export const motionOK = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

/** Scroll with Lenis inertia when available, native otherwise. */
export function smoothTo(target: number | HTMLElement, offset = 0) {
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset, duration: 1.4 });
    return;
  }
  const behavior: ScrollBehavior = motionOK() ? 'smooth' : 'auto';
  if (typeof target === 'number') window.scrollTo({ top: target + offset, behavior });
  else target.scrollIntoView({ behavior });
}

/**
 * Run `fn` once the browser has laid out the current page (two frames from now). Use it for anything
 * that creates ScrollTriggers: on a client-side navigation the new page is not measured yet in its
 * mount frame, and the previous page's triggers may still be tearing down. Returns a cancel function.
 */
export function afterLayout(fn: () => void) {
  let id = requestAnimationFrame(() => { id = requestAnimationFrame(fn); });
  return () => cancelAnimationFrame(id);
}

/** Height of the sticky header, for landing anchors just below it. */
export const headerHeight = () => document.querySelector('header')?.offsetHeight ?? 0;
