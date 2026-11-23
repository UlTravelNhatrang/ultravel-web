'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import type { PageTitle } from '@/lib/page-titles';
import { gsap, motionOK } from '@/lib/motion';
import { LEGACY_DEMO, ROUTES } from '@/lib/routes';

/** Panels sit this far past the viewport edge when hidden, so their curved caps are off-screen too (see .cap). */
const CAP = 90;
/** After the panel has covered, keep the words on screen at least this long, even if the page is ready. */
const MIN_HOLD_MS = 1100;
/** First visit: the loader stays at least this long (and waits for fonts, up to BOOT_MAX_MS). */
const BOOT_MIN_MS = 2200;
const BOOT_MAX_MS = 3600;
/** Never leave the page covered, even if a navigation stalls or fails. */
const SAFETY_MS = 7000;
const EASE = 'power4.inOut';

const TIPS = [
  'Biển Trần Phú đẹp nhất lúc 5 giờ 30 sáng, nước êm và mát.',
  'Đi đảo nên khởi hành trước 8 giờ, biển lặng và nước trong hơn.',
  'Bún chả cá là món sáng quen thuộc của người Nha Trang.',
  'Hỏi giá theo ký trước khi chọn hải sản, nhờ quán cân trước mặt.',
  'Lên Tháp Bà Ponagar nhớ mặc quần dài qua gối.',
  'Chợ Đầm: hỏi giá ở hai ba sạp rồi hãy mua đồ khô.',
  'Ngồi cà phê chân cầu Xóm Bóng lúc chiều để xem thuyền về bến.',
];
const pickTip = () => TIPS[Math.floor(Math.random() * TIPS.length)];

/** Fallback words for pages without an entry in the titles map. */
function fallbackTitle(path: string): PageTitle {
  if (path.startsWith(`${ROUTES.guides}/`)) return { kicker: 'Bài viết', title: 'Cẩm nang' };
  if (path.split('/').filter(Boolean).length === 3) return { kicker: 'Review', title: 'Địa điểm' };
  return { kicker: 'Đang mở', title: 'Ultravel' };
}

/** An internal link click that should get the curtain, or null to let the browser and Next handle it. */
function curtainTarget(e: MouseEvent): URL | null {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
  if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download') || a.dataset.noCurtain !== undefined) return null;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || url.pathname.startsWith(LEGACY_DEMO)) return null;
  // Same page (an anchor or a query change): no curtain, the page stays.
  if (url.pathname === location.pathname) return null;
  return url;
}

/** Put the title in as one masked span per word, so the words can rise in one after another. */
function setTitle(el: HTMLElement, text: string) {
  el.replaceChildren(...text.split(/\s+/).flatMap((word, i) => {
    const outer = document.createElement('span'), inner = document.createElement('span');
    outer.className = 'w';
    inner.textContent = word;
    outer.append(inner);
    return i ? [document.createTextNode(' '), outer] : [outer];
  }));
  return [...el.querySelectorAll<HTMLElement>('.w > span')];
}

/**
 * Runs the curtain: covers the page on an internal link click, navigates once covered, and lifts when
 * the new pathname has rendered and the words have had time to be read. On the first visit of a session
 * it plays as a loader instead. Page entrance animations wait for the `ut:reveal` event (MotionProvider).
 */
export function CurtainController({ titles }: { titles: Record<string, PageTitle> }) {
  const router = useRouter();
  const pathname = usePathname();
  const covering = useRef(false);
  const coveredAt = useRef(0);
  const lastPath = useRef(pathname);
  const safety = useRef<ReturnType<typeof setTimeout>>(undefined);
  const titlesRef = useRef(titles);

  useEffect(() => {
    const root = document.getElementById('curtain');
    if (!root) return;
    const html = document.documentElement;
    const q = <T extends Element = HTMLElement>(s: string) => root.querySelector<T>(s)!;
    const a = q('.curtain-a'), b = q('.curtain-b'), logo = q('.curtain-logo');
    const kicker = q('.curtain-kicker'), kickerText = q('[data-curtain-kicker]'), title = q('[data-curtain-title]');
    const tip = q('.curtain-tip'), tipText = q('[data-curtain-tip]'), bar = q('.curtain-bar > i'), count = q('[data-curtain-count]');
    const wave = q<SVGPathElement>('.curtain-wave path');
    let barTween: gsap.core.Tween | null = null;

    const hidden = { yPercent: 100, y: CAP };
    const fill = (t: PageTitle) => {
      kickerText.textContent = t.kicker;
      tipText.textContent = pickTip();
      gsap.set(title, { opacity: 1 });
      return setTitle(title, t.title);
    };

    /** Words, wave, tip and the slow progress line, once the panel is in place. */
    const wordsIn = (words: HTMLElement[], at = 0) => {
      const tl = gsap.timeline({ delay: at });
      tl.fromTo(logo, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0)
        .fromTo(kicker, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.05)
        .fromTo(words, { yPercent: 115, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 1, ease: 'expo.out', stagger: 0.08 }, 0.12)
        .fromTo(wave, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 0.45)
        .fromTo(tip, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.6);
      return tl;
    };

    const reveal = () => {
      clearTimeout(safety.current);
      barTween?.kill();
      const words = [...title.querySelectorAll<HTMLElement>('.w > span')];
      gsap.timeline({
        onComplete: () => {
          gsap.set(root, { visibility: 'hidden' });
          gsap.set([a, b], hidden);
          html.classList.remove('boot');
          covering.current = false;
        },
      })
        .to(bar, { scaleX: 1, duration: 0.35, ease: 'power2.out' })
        .to(words, { yPercent: -115, duration: 0.55, ease: 'power3.in', stagger: 0.05 }, 0.2)
        .to([kicker, tip, logo], { opacity: 0, y: -12, duration: 0.4, ease: 'power2.in' }, 0.2)
        .to(b, { yPercent: -100, y: -CAP, duration: 1.05, ease: EASE }, 0.55)
        .to(a, { yPercent: -100, y: -CAP, duration: 1.05, ease: EASE }, 0.68)
        // The page's own entrance starts while the panels are still lifting.
        .add(() => { delete html.dataset.curtain; dispatchEvent(new Event('ut:reveal')); }, 0.95);
    };
    window.__curtainReveal = reveal;

    if (html.classList.contains('boot')) {
      // First visit: already covering the page. Greet, count up, then lift.
      html.dataset.curtain = 'on';
      covering.current = true;
      gsap.set(root, { visibility: 'visible' });
      gsap.set([a, b], { yPercent: 0, y: 0 });
      const words = fill({ kicker: 'Xin chào', title: 'Nha Trang' });
      wordsIn(words, 0.15);
      const o = { v: 0 };
      const started = performance.now();
      const fonts = Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise(r => setTimeout(r, BOOT_MAX_MS))]);
      gsap.to(o, {
        v: 100, duration: BOOT_MIN_MS / 1000, ease: 'power1.inOut',
        onUpdate: () => { count.textContent = String(Math.round(o.v)).padStart(2, '0'); gsap.set(bar, { scaleX: o.v / 100 }); },
      });
      fonts.then(() => setTimeout(reveal, Math.max(0, BOOT_MIN_MS + 150 - (performance.now() - started))));
    } else {
      gsap.set([a, b], hidden);
    }

    const cover = (t: PageTitle) => {
      covering.current = true;
      html.dataset.curtain = 'on';
      count.textContent = '';
      const words = fill(t);
      gsap.set(root, { visibility: 'visible' });
      gsap.set([logo, kicker, tip], { opacity: 0 });
      gsap.set(words, { yPercent: 115 });
      gsap.set(bar, { scaleX: 0 });
      gsap.set(wave, { strokeDashoffset: 1 });
      const tl = gsap.timeline()
        .fromTo(a, hidden, { yPercent: 0, y: 0, duration: 0.95, ease: EASE })
        .fromTo(b, hidden, { yPercent: 0, y: 0, duration: 0.95, ease: EASE }, 0.14);
      wordsIn(words, 0.75);
      // The line creeps forward while the page loads, and completes on reveal.
      barTween = gsap.to(bar, { scaleX: 0.85, duration: 2.4, ease: 'power1.out', delay: 0.8 });
      return tl.then(() => { coveredAt.current = performance.now(); });
    };

    // Capture phase, so this runs before Next's <Link> (which skips clicks already handled).
    const onClick = (e: MouseEvent) => {
      if (!motionOK() || covering.current) return;
      const url = curtainTarget(e);
      if (!url) return;
      e.preventDefault();
      cover(titlesRef.current[url.pathname] ?? fallbackTitle(url.pathname)).then(() => {
        router.push(url.pathname + url.search + url.hash);
        safety.current = setTimeout(reveal, SAFETY_MS);
      });
    };
    addEventListener('click', onClick, true);
    return () => {
      removeEventListener('click', onClick, true);
      clearTimeout(safety.current);
      window.__curtainReveal = undefined;
    };
  }, [router]);

  // The new page has committed: let it paint and the words be read, then lift.
  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    if (!covering.current || document.documentElement.classList.contains('boot')) return;
    const wait = Math.max(150, coveredAt.current + MIN_HOLD_MS - performance.now());
    const t = setTimeout(() => window.__curtainReveal?.(), wait);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
