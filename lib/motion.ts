/**
 * Tiny motion helpers. The site no longer ships an animation library or smooth-scroll hijacking:
 * movement is plain CSS transitions and native scrolling, so the main thread stays free.
 */

export const motionOK = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

/** Native scroll to a y position or an element; smooth unless the visitor prefers reduced motion. */
export function smoothTo(target: number | HTMLElement, offset = 0) {
  const behavior: ScrollBehavior = motionOK() ? 'smooth' : 'auto';
  if (typeof target === 'number') window.scrollTo({ top: target + offset, behavior });
  else target.scrollIntoView({ behavior });
}

/** Height of the sticky header, for landing anchors just below it. */
export const headerHeight = () => document.querySelector('header')?.offsetHeight ?? 0;

/** Place a sliding highlight under `el` (CSS transitions do the movement). */
export function placeBlob(blob: HTMLElement, x: number, width: number) {
  blob.style.transform = `translateX(${x}px)`;
  blob.style.width = `${width}px`;
  blob.style.opacity = '1';
}
