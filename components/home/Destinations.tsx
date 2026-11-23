'use client';

import { useEffect, useRef } from 'react';
import { Photo } from '@/components/ui/Photo';
import { AsideNote, SectionHeader } from '@/components/ui/Section';
import { DESTINATIONS } from '@/content/home';
import { PHOTOS } from '@/content/photos';
import { pad } from '@/lib/format';
import { motionOK } from '@/lib/motion';

const total = DESTINATIONS.length;

/** Destination carousel: drag, swipe, arrow keys or buttons; progress bar and gentle photo parallax. */
export function Destinations() {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = trackRef.current!, bar = barRef.current!, prev = prevRef.current!, next = nextRef.current!, count = countRef.current!;
    const cards = [...track.querySelectorAll<HTMLElement>('.dest-card')];
    const step = () => (cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth * 0.8);
    const behavior = (): ScrollBehavior => (motionOK() ? 'smooth' : 'auto');
    const go = (dir: number) => track.scrollBy({ left: dir * step(), behavior: behavior() });
    const onPrev = () => go(-1), onNext = () => go(1);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? track.scrollLeft / max : 1;
      const vis = Math.min(1, track.clientWidth / track.scrollWidth);
      bar.style.width = `${vis * 100}%`;
      bar.style.transform = `translateX(${(p * (1 - vis)) / vis * 100}%)`;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max - 2;
      count.textContent = `${pad(Math.min(cards.length, Math.round(track.scrollLeft / step()) + 1))} / ${pad(cards.length)}`;
      if (!motionOK()) return;
      const mid = track.scrollLeft + track.clientWidth / 2;
      cards.forEach(c => {
        const off = (c.offsetLeft + c.offsetWidth / 2 - mid) / track.clientWidth;
        c.style.setProperty('--px', `${Math.max(-1, Math.min(1, off)) * -7}%`);
      });
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };

    // Mouse drag (touch already swipes natively).
    let down = false, moved = false, startX = 0, startL = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startL = track.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 6) { moved = true; track.classList.add('dragging'); }
      if (moved) track.scrollLeft = startL - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      if (moved) {
        track.classList.remove('dragging');
        track.scrollTo({ left: Math.round(track.scrollLeft / step()) * step(), behavior: behavior() });
      }
    };
    // A drag should not also open the card under the pointer.
    const onClick = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } };

    prev.addEventListener('click', onPrev);
    next.addEventListener('click', onNext);
    track.addEventListener('keydown', onKey);
    track.addEventListener('scroll', queue, { passive: true });
    track.addEventListener('pointerdown', onDown);
    track.addEventListener('click', onClick, true);
    addEventListener('pointermove', onMove);
    addEventListener('pointerup', onUp);
    addEventListener('resize', queue);
    const ro = new ResizeObserver(queue);
    ro.observe(cards[0]);
    update();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      prev.removeEventListener('click', onPrev);
      next.removeEventListener('click', onNext);
      track.removeEventListener('keydown', onKey);
      track.removeEventListener('scroll', queue);
      track.removeEventListener('pointerdown', onDown);
      track.removeEventListener('click', onClick, true);
      removeEventListener('pointermove', onMove);
      removeEventListener('pointerup', onUp);
      removeEventListener('resize', queue);
    };
  }, []);

  return (
    <section className="dest-wrap pt-20 md:pt-28 overflow-hidden" aria-roledescription="carousel" aria-labelledby="destTitle">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <SectionHeader label={`04 — Điểm đến / ${pad(total)} thành phố`} aside={<AsideNote>Kéo, vuốt hoặc dùng phím mũi tên</AsideNote>} />
        <div className="flex flex-wrap items-end justify-between gap-6 mt-6 mb-8">
          <h2 id="destTitle" className="hd text-4xl md:text-6xl">Khám phá<br />điểm đến<span className="text-red">.</span></h2>
          <div className="flex border border-ink">
            <button ref={prevRef} id="destPrev" type="button" className="car-btn w-14 h-14 grid place-items-center mono text-[13px] border-r border-ink hover:bg-ink hover:text-paper" aria-label="Điểm đến trước" aria-controls="dest">←</button>
            <button ref={nextRef} id="destNext" type="button" className="car-btn w-14 h-14 grid place-items-center mono text-[13px] hover:bg-ink hover:text-paper" aria-label="Điểm đến tiếp theo" aria-controls="dest">→</button>
          </div>
        </div>
      </div>

      <div ref={trackRef} id="dest" data-cursor="Kéo" className="snap flex gap-4 overflow-x-auto snap-x snap-mandatory w-full" tabIndex={0} aria-label="Danh sách điểm đến, dùng phím mũi tên để chuyển">
        {DESTINATIONS.map(([city, posts], k) => (
          <a key={city} href="#" draggable={false} aria-roledescription="slide" aria-label={`${city}, ${k + 1} trên ${total}`} className="dest-card group shrink-0 snap-start w-[min(78vw,19rem)] lg:w-[22rem] border border-ink bg-paper flex flex-col">
            <div className="flex justify-between mono px-3 py-2 border-b border-ink"><span>D-{pad(k + 1)}</span><span className="text-ink2">{posts} bài</span></div>
            <Photo src={PHOTOS.dest[k]} alt={`Du lịch ${city}`} width={640} height={760} className="aspect-[4/5]" />
            <div className="flex items-end justify-between gap-3 px-3 py-3 border-t border-ink">
              <h3 className="hd text-3xl group-hover:text-red">{city}</h3>
              <span className="mono font-semibold pb-1"><span className="arr">→</span></span>
            </div>
          </a>
        ))}
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 mt-6 flex items-center gap-4">
        <span ref={countRef} className="mono" id="destCount">01 / {pad(total)}</span>
        <div className="relative flex-1 h-[6px] border-y border-ink/0">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-ink" />
          <div ref={barRef} id="destBar" className="absolute left-0 top-0 h-full bg-red" style={{ width: '30%' }} />
        </div>
      </div>
    </section>
  );
}
