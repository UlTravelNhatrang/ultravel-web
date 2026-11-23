'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Arrow, AsideLink, Section, SectionHeader, SectionTitle } from '@/components/ui/Section';
import { TOURS } from '@/content/home';
import { pad } from '@/lib/format';
import { gsap } from '@/lib/motion';
import { ROUTES } from '@/lib/routes';

const HIDE = 'inset(50% 50% 50% 50% round 26px)';
const SHOW = 'inset(0% 0% 0% 0% round 26px)';

/** Tour list. On desktop a spec card trails the cursor, leans with its speed and wipes to each row's photo. */
export function Tours() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!, fl = floatRef.current!;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
      const frame = fl.querySelector<HTMLElement>('.tf-frame')!;
      const tag = fl.querySelector<HTMLElement>('.tf-tag')!, detail = fl.querySelector<HTMLElement>('.tf-detail')!;
      const cap = fl.querySelector<HTMLElement>('.tf-cap')!, code = fl.querySelector<HTMLElement>('.tf-code')!;
      const slides = [...fl.querySelectorAll<HTMLElement>('.tf-slide')];
      const rows = [...wrap.querySelectorAll<HTMLElement>('.tour-row')];

      gsap.set(slides, { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(fl, { yPercent: -50, autoAlpha: 1 });
      const xTo = gsap.quickTo(fl, 'x', { duration: 0.6, ease: 'power3' });
      const yTo = gsap.quickTo(fl, 'y', { duration: 0.6, ease: 'power3' });
      const rTo = gsap.quickTo(fl, 'rotation', { duration: 0.5, ease: 'power2' });
      let current = -1, z = 1, open = false, lastX = 0;

      // The tilt follows horizontal speed; it only ticks while the preview is open.
      const tilt = () => { const x = gsap.getProperty(fl, 'x') as number; rTo(gsap.utils.clamp(-7, 7, (x - lastX) * 0.4)); lastX = x; };
      const pos = (e: PointerEvent) => { const r = wrap.getBoundingClientRect(); return [e.clientX - r.left + 40, e.clientY - r.top] as const; };
      const move = (e: PointerEvent) => { const [x, y] = pos(e); xTo(x); yTo(y); };
      const caption = (k: number) => {
        tag.textContent = TOURS[k][2];
        detail.textContent = TOURS[k][3];
        code.textContent = `T-${pad(k + 1)}`;
        gsap.fromTo(cap, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', overwrite: true });
      };
      const show = (k: number) => {
        if (k === current) return;
        const slide = slides[k], img = slide.querySelector('img'), down = k > current;
        slide.style.zIndex = String(++z);
        if (current < 0) gsap.set(slide, { clipPath: SHOW });
        else {
          gsap.fromTo(slide, { clipPath: down ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' }, { clipPath: SHOW, duration: 0.9, ease: 'expo.out', overwrite: true });
          gsap.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 0.8, ease: 'expo.out', overwrite: true });
        }
        current = k;
        caption(k);
      };
      const enter = (e: PointerEvent) => {
        if (!open) { const [x, y] = pos(e); gsap.set(fl, { x, y, rotation: 0 }); lastX = x; }
        show(Number((e.currentTarget as HTMLElement).dataset.k));
        if (!open) { open = true; gsap.ticker.add(tilt); gsap.to(frame, { clipPath: SHOW, duration: 0.9, ease: 'expo.out', overwrite: true }); }
      };
      const leave = () => {
        open = false;
        current = -1;
        gsap.ticker.remove(tilt);
        gsap.to(frame, { clipPath: HIDE, duration: 0.5, ease: 'power3.inOut', overwrite: true });
      };

      wrap.addEventListener('pointermove', move);
      wrap.addEventListener('pointerleave', leave);
      rows.forEach(r => r.addEventListener('pointerenter', enter));
      return () => {
        gsap.ticker.remove(tilt);
        wrap.removeEventListener('pointermove', move);
        wrap.removeEventListener('pointerleave', leave);
        rows.forEach(r => r.removeEventListener('pointerenter', enter));
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <Section labelledBy="tourTitle">
      <SectionHeader label="07 — Tour & combo" aside={<AsideLink href={ROUTES.services}>Xem tất cả <Arrow /></AsideLink>} />
      <SectionTitle id="tourTitle">Tour chọn lọc</SectionTitle>
      <div ref={wrapRef} id="toursWrap" className="relative">
        <div className="hidden md:grid grid-cols-[5rem_1fr_9rem_10rem_4rem] gap-6 mono text-ink2 pb-2 border-b-2 border-ink">
          <span>Mã</span><span>Tour</span><span>Thời gian</span><span className="text-right">Giá từ</span><span />
        </div>
        <div id="tours">
          {TOURS.map(([title, price, duration, , photo], k) => (
            <Link key={title} href={ROUTES.services} data-k={k} className="tour-row group grid grid-cols-[4.5rem_1fr] md:grid-cols-[5rem_1fr_9rem_10rem_4rem] gap-x-4 md:gap-6 gap-y-1 items-center py-5 md:py-6 border-b border-ink">
              <div className="ht md:hidden w-[4.5rem] h-[4.5rem] row-span-2"><Image className="absolute inset-0 w-full h-full object-cover" src={photo} alt="" width={72} height={72} sizes="72px" /></div>
              <span className="mono hidden md:block">T-{pad(k + 1)}</span>
              <h3 className="hd text-xl md:text-4xl group-hover:text-red">{title}</h3>
              <span className="mono text-ink2 hidden md:block">{duration}</span>
              <p className="mono font-semibold md:text-right text-[12px] md:text-[13px]"><span className="md:hidden text-ink2">T-{pad(k + 1)} / {duration} / </span>{price}</p>
              <span className="mono font-semibold hidden md:block text-right"><span className="arr">→</span></span>
            </Link>
          ))}
        </div>

        <div ref={floatRef} id="tourFloat" className="hidden md:block pointer-events-none absolute left-0 top-0 w-[17rem] lg:w-[20rem] z-20" aria-hidden="true">
          <div className="tf-frame relative bg-paper border-2 border-ink">
            <div className="relative aspect-[4/5] ht">
              <div className="tf-slides absolute inset-0 z-0">
                {TOURS.map(t => (
                  <div key={t[0]} className="tf-slide absolute inset-0 overflow-hidden"><Image className="w-full h-full object-cover" src={t[4]} alt="" width={320} height={400} sizes="320px" /></div>
                ))}
              </div>
              <span className="absolute top-2 left-2 z-[3] mono bg-paper px-2 py-1 tf-code" />
            </div>
            <div className="tf-cap border-t-2 border-ink px-3 py-2.5 flex items-start justify-between gap-3">
              <div className="min-w-0"><p className="tf-tag mono text-red font-semibold" /><p className="tf-detail text-[14px] font-medium leading-snug mt-1" /></div>
              <span className="mono font-semibold shrink-0 text-lg leading-none">→</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
