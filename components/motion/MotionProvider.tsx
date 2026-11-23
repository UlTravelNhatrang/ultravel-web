'use client';

import { useEffect } from 'react';
import { afterLayout, gsap, ScrollTrigger } from '@/lib/motion';

const $$ = <T extends Element = HTMLElement>(sel: string) => [...document.querySelectorAll<T>(sel)];

/** Cards that float up as they enter the viewport. */
const FLOAT = '#vouchers .ticket, #hubgrid .hub-card, #food .food-cell, #feed article, #social > a, .dest-card, .float-in';

/** Hero entrance: lines rise out of their masks, the photo opens like a shutter, counters tick up. */
function heroIntro() {
  // Every page can opt in with the same class names; anything a page doesn't have is skipped.
  const has = (sel: string) => !!document.querySelector(sel);
  const tl = gsap.timeline();
  if (has('.hero-line')) tl.to('.hero-line > span', { y: 0, yPercent: 0, duration: 1.4, ease: 'expo.out', stagger: 0.12 }, 0.1);
  if (has('.hero-img')) {
    tl.to('.hero-img', { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'expo.out' }, 0.15);
    if (has('.hero-img img')) tl.from('.hero-img img', { scale: 1.25, duration: 2.2, ease: 'expo.out' }, 0.15);
  }
  if (has('.hero-fade')) tl.fromTo('.hero-fade', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12 }, 0.6);
  if (has('.lede .q')) tl.fromTo('.lede .q', { opacity: 0, y: 18, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(2.2)', stagger: 0.12 }, 0.75);
  if (has('.lede-a mark')) tl.fromTo('.lede-a mark', { backgroundSize: '24px 0px' }, { backgroundSize: '24px 6px', duration: 0.6, ease: 'power2.out' }, 1.4);
  $$('.count').forEach(el => {
    const o = { v: 0 }, to = Number(el.dataset.to);
    tl.to(o, { v: to, duration: 1.2, ease: 'power2.out', onUpdate: () => { el.textContent = String(Math.round(o.v)); } }, 0.6);
  });
  // Under the page-change curtain the entrance would play unseen: hold it until the curtain lifts.
  if (document.documentElement.dataset.curtain) {
    tl.pause();
    const play = () => tl.play();
    addEventListener('ut:reveal', play, { once: true });
    return () => removeEventListener('ut:reveal', play);
  }
  return () => {};
}

/**
 * Section strips, floating cards, titles and the method statement.
 *
 * No `once: true` on purpose: a "once" trigger kills itself when it fires. After a client-side navigation
 * (document already loaded) every new trigger refreshes as it is created, so triggers already in view
 * would fire and shrink ScrollTrigger's list mid-refresh (crash: "reading 'end'"). The default
 * toggleActions ("play none none none") already play a tween once and never reverse it.
 */
function scrollReveals() {
  const decode = (el: Element) => gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
  const firstTime = (el: HTMLElement) => (el.dataset.revealed ? false : (el.dataset.revealed = '1', true));

  // Each section: the orange rule draws across, then the label surfaces.
  $$('.unit').forEach(u => {
    const rule = u.querySelector('.rule'), label = u.querySelector('.dec');
    gsap.timeline({ scrollTrigger: { trigger: u, start: 'top 85%' } })
      .fromTo(rule, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'power2.inOut' })
      .to(rule, { opacity: 0, duration: 1.2, ease: 'sine.inOut' }, '+=.4')
      .add(() => { if (label) decode(label); }, 0.1);
  });
  $$('.dec').filter(el => !el.closest('.unit')).forEach(el =>
    ScrollTrigger.create({ trigger: el, start: 'top 85%', onEnter: () => { if (firstTime(el)) decode(el); } }));

  if ($$(FLOAT).length) {
    ScrollTrigger.batch(FLOAT, {
      start: 'top 92%',
      // Each card floats in the first time only; entering again later is ignored.
      onEnter: batch => {
        const fresh = (batch as HTMLElement[]).filter(firstTime);
        if (fresh.length) gsap.fromTo(fresh, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.3, ease: 'expo.out', stagger: 0.09, clearProps: 'transform,opacity' });
      },
    });
    gsap.set(FLOAT, { opacity: 0 });
  }

  $$('h2.hd').forEach(h => gsap.fromTo(h, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 90%' } }));

  // Numbers that count up when they scroll into view: <span data-count="4.5" data-decimals="1">.
  $$('[data-count]').forEach(el => {
    const to = Number(el.dataset.count), dp = Number(el.dataset.decimals ?? 0), o = { v: 0 };
    gsap.to(o, { v: to, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%' }, onUpdate: () => { el.textContent = o.v.toFixed(dp).replace('.', ','); } });
  });

  // Score bars fill from the left when they scroll into view.
  $$('.meter > i').forEach(bar => gsap.from(bar, { scaleX: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: bar, start: 'top 92%' } }));

  // Method statement: words darken as you read down; the brand gets its marker and wave.
  if (document.querySelector('.why-statement')) {
    gsap.fromTo('.why-statement .w', { opacity: 0.12 }, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: '.why-statement', start: 'top 78%', end: 'bottom 45%', scrub: true } });
  }

  // The brand word ("Ultravel" in the method statement and in headings): marker swash, wave, then the ®.
  $$('.brand-word').forEach(b => {
    gsap.timeline({ scrollTrigger: { trigger: b, start: b.closest('.why-statement') ? 'top 62%' : 'top 85%' } })
      .fromTo(b.querySelector('.brand-bg'), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'expo.out' })
      // autoRound off: GSAP rounds px values by default, which made the 1 to 0 draw jump in a single step.
      .fromTo(b.querySelector('.brand-wave path'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', autoRound: false }, 0.25)
      .fromTo(b.querySelector('sup'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(3)' }, 0.7);
  });
}

/** Featured post title: the wave underline draws in once the post scrolls into view. */
function featuredUnderline() {
  const el = document.querySelector('.feat-t');
  if (!el) return () => {};
  const io = new IntersectionObserver((entries, ob) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); ob.disconnect(); } }), { rootMargin: '0px 0px -20% 0px' });
  io.observe(el);
  return () => io.disconnect();
}

/**
 * Per-page motion: hero entrance and scroll reveals. Renders nothing; mount it at the end of each page.
 * Site-wide motion (smooth scroll, anchors, cursor) lives in <SiteMotion> in the shared layout;
 * section-specific motion (hub pin, tours card, carousel) lives in those components.
 */
export function MotionProvider() {
  useEffect(() => {
    window.__motion = true;
    const stopUnderline = featuredUnderline();

    // Built after layout: see afterLayout() for why ScrollTriggers must not be created in the mount frame.
    let mm: gsap.MatchMedia | null = null;
    let disposed = false;
    const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
    const start = () => {
      mm = gsap.matchMedia();
      mm.add({ motion: '(prefers-reduced-motion: no-preference)' }, ctx => {
        if (!(ctx.conditions as { motion: boolean }).motion) { document.documentElement.classList.remove('js-motion'); return; }
        const stopHero = heroIntro();
        scrollReveals();
        return stopHero;
      });
      // Re-measure once, after fonts and images have both settled (each refresh re-lays-out every trigger).
      const loaded = document.readyState === 'complete' ? Promise.resolve() : new Promise(r => addEventListener('load', r, { once: true }));
      Promise.all([document.fonts?.ready, loaded]).then(refresh);
    };
    const cancel = afterLayout(start);

    return () => {
      disposed = true;
      cancel();
      mm?.revert();
      stopUnderline();
    };
  }, []);

  return null;
}
