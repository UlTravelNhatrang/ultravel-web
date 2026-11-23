'use client';

import { useEffect, useRef } from 'react';
import { Photo } from '@/components/ui/Photo';
import { AsideNote, SectionHeader } from '@/components/ui/Section';
import { DESTINATIONS } from '@/content/home';
import { PHOTOS } from '@/content/photos';
import { pad } from '@/lib/format';
import { motionOK } from '@/lib/motion';

const total = DESTINATIONS.length;
/** How long each slide stays before the carousel moves on by itself. */
const AUTOPLAY_MS = 5000;

/** Destination carousel: autoplays, plus drag, swipe, arrow keys or buttons; progress bar and gentle photo parallax. */
export function Destinations() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<HTMLSpanElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current!, track = trackRef.current!, bar = barRef.current!, prev = prevRef.current!, next = nextRef.current!, count = countRef.current!;
    const timer = timerRef.current!, play = playRef.current!;
    const cards = [...track.querySelectorAll<HTMLElement>('.dest-card')];
    const step = () => (cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth * 0.8);
    const behavior = (): ScrollBehavior => (motionOK() ? 'smooth' : 'auto');
    const go = (dir: number) => track.scrollBy({ left: dir * step(), behavior: behavior() });
    const onPrev = () => { go(-1); restart(); }, onNext = () => { go(1); restart(); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); restart(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); restart(); }
    };

    // Autoplay: a timer line fills over AUTOPLAY_MS, then the track moves one card (wrapping at the end).
    // It holds while the pointer or focus is on the carousel, during a drag, off screen, in a hidden tab,
    // or when the visitor pauses it. Off by default for reduced motion.
    const advance = () => {
      if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 2) track.scrollTo({ left: 0, behavior: behavior() });
      else go(1);
    };
    const anim = timer.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: AUTOPLAY_MS, fill: 'both' });
    anim.pause();
    anim.onfinish = () => { advance(); anim.currentTime = 0; sync(); };
    let userPaused = !motionOK(), hovered = false, focused = false, onScreen = false;
    const sync = () => {
      const run = !userPaused && !hovered && !focused && !down && onScreen && !document.hidden;
      if (run && anim.playState !== 'running') anim.play();
      if (!run && anim.playState === 'running') anim.pause();
      play.setAttribute('aria-pressed', String(!userPaused));
      play.textContent = userPaused ? '▶ Tự chạy' : '❚❚ Tạm dừng';
    };
    function restart() { anim.currentTime = 0; sync(); }
    const onPlay = () => { userPaused = !userPaused; if (!userPaused) anim.currentTime = 0; sync(); };
    const onEnter = () => { hovered = true; sync(); }, onLeave = () => { hovered = false; sync(); };
    // Only keyboard focus inside the track holds it; clicking the arrows or pause button doesn't.
    const onFocusIn = (e: FocusEvent) => { const t = e.target as HTMLElement; focused = track.contains(t) && t.matches(':focus-visible'); sync(); };
    const onFocusOut = (e: FocusEvent) => { if (!track.contains(e.relatedTarget as Node)) { focused = false; sync(); } };
    const onVis = () => sync();
    const io = new IntersectionObserver(([en]) => { onScreen = en.isIntersecting; sync(); }, { threshold: 0.35 });

    // Geometry only changes on resize, so it's measured then, not on every scroll frame.
    let geo = { width: 0, scrollW: 0, step: 1, centres: [] as number[] };
    const measure = () => {
      geo = { width: track.clientWidth, scrollW: track.scrollWidth, step: step() || 1, centres: cards.map(c => c.offsetLeft + c.offsetWidth / 2) };
    };
    const parallax = motionOK();

    let raf = 0, left = 0;
    // scrollLeft is read in the scroll event (and on resize), where layout is already clean. The frame
    // callback only writes: by then GSAP's ticker has written styles, so reading there forced a reflow.
    const update = () => {
      raf = 0;
      const { width, scrollW, centres } = geo;
      const max = scrollW - width;
      const p = max > 0 ? left / max : 1;
      const vis = Math.min(1, width / scrollW);
      bar.style.width = `${vis * 100}%`;
      bar.style.transform = `translateX(${(p * (1 - vis)) / vis * 100}%)`;
      prev.disabled = left <= 2;
      next.disabled = left >= max - 2;
      count.textContent = `${pad(Math.min(cards.length, Math.round(left / geo.step) + 1))} / ${pad(cards.length)}`;
      if (!parallax) return;
      const mid = left + width / 2;
      cards.forEach((c, i) => c.style.setProperty('--px', `${Math.max(-1, Math.min(1, (centres[i] - mid) / width)) * -7}%`));
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onScroll = () => { left = track.scrollLeft; queue(); };
    const remeasure = () => { measure(); left = track.scrollLeft; queue(); };

    // Mouse drag (touch already swipes natively).
    let down = false, moved = false, startX = 0, startL = 0;
    const onDown = (e: PointerEvent) => {
      restart(); // any touch or drag starts the wait over
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startL = track.scrollLeft;
      sync();
      // Window listeners only for the length of a drag.
      addEventListener('pointermove', onMove);
      addEventListener('pointerup', onUp, { once: true });
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 6) { moved = true; track.classList.add('dragging'); }
      if (moved) track.scrollLeft = startL - dx;
    };
    const onUp = () => {
      removeEventListener('pointermove', onMove);
      if (!down) return;
      down = false;
      sync();
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
    track.addEventListener('scroll', onScroll, { passive: true });
    track.addEventListener('pointerdown', onDown);
    track.addEventListener('click', onClick, true);
    const onPEnter = (e: PointerEvent) => { if (e.pointerType === 'mouse') onEnter(); };
    const onPLeave = (e: PointerEvent) => { if (e.pointerType === 'mouse') onLeave(); };
    track.addEventListener('pointerenter', onPEnter);
    track.addEventListener('pointerleave', onPLeave);
    section.addEventListener('focusin', onFocusIn);
    section.addEventListener('focusout', onFocusOut);
    play.addEventListener('click', onPlay);
    document.addEventListener('visibilitychange', onVis);
    io.observe(track);
    addEventListener('resize', remeasure);
    const ro = new ResizeObserver(remeasure);
    ro.observe(cards[0]); // its first callback (after layout, so reads are free) does the initial measure
    sync();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      anim.onfinish = null;
      anim.cancel();
      track.removeEventListener('pointerenter', onPEnter);
      track.removeEventListener('pointerleave', onPLeave);
      section.removeEventListener('focusin', onFocusIn);
      section.removeEventListener('focusout', onFocusOut);
      play.removeEventListener('click', onPlay);
      document.removeEventListener('visibilitychange', onVis);
      prev.removeEventListener('click', onPrev);
      next.removeEventListener('click', onNext);
      track.removeEventListener('keydown', onKey);
      track.removeEventListener('scroll', onScroll);
      track.removeEventListener('pointerdown', onDown);
      track.removeEventListener('click', onClick, true);
      removeEventListener('pointermove', onMove);
      removeEventListener('pointerup', onUp);
      removeEventListener('resize', remeasure);
    };
  }, []);

  return (
    <section ref={sectionRef} className="dest-wrap pt-20 md:pt-28 overflow-hidden" aria-roledescription="carousel" aria-labelledby="destTitle">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <SectionHeader label={`04 — Điểm đến / ${pad(total)} thành phố`} aside={<AsideNote>Tự chạy, hoặc kéo, vuốt, dùng phím mũi tên</AsideNote>} />
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
          <a key={city} href="#" draggable={false} aria-roledescription="slide" aria-label={`${city}, ${k + 1} trên ${total}`} className="dest-card group shrink-0 snap-start w-[min(88vw,28rem)] md:w-[34rem] lg:w-[40rem] border border-ink bg-paper flex flex-col">
            <div className="flex justify-between mono px-3 py-2 border-b border-ink"><span>D-{pad(k + 1)}</span><span className="text-ink2">{posts} bài</span></div>
            <Photo src={PHOTOS.dest[k]} alt={`Du lịch ${city}`} width={960} height={600} sizes="(max-width: 767px) 88vw, 640px" className="aspect-[16/10]" />
            <div className="flex items-end justify-between gap-3 px-3 py-3 border-t border-ink">
              <h3 className="hd text-3xl group-hover:text-red">{city}</h3>
              <span className="mono font-semibold pb-1"><span className="arr">→</span></span>
            </div>
          </a>
        ))}
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 mt-6 flex items-center gap-4">
        <span ref={countRef} className="mono" id="destCount">01 / {pad(total)}</span>
        <button ref={playRef} type="button" className="mono text-[11px] inline-flex items-center gap-2 shrink-0 hover:text-red" aria-pressed="true" aria-controls="dest" aria-label="Tự động chuyển điểm đến">
          ❚❚ Tạm dừng
        </button>
        <span className="relative w-12 h-[3px] rounded-full bg-ink/15 overflow-hidden shrink-0" aria-hidden="true">
          <span ref={timerRef} className="absolute inset-0 bg-red origin-left" style={{ transform: 'scaleX(0)' }} />
        </span>
        <div className="relative flex-1 h-[6px] border-y border-ink/0">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-ink" />
          <div ref={barRef} id="destBar" className="absolute left-0 top-0 h-full bg-red" style={{ width: '30%' }} />
        </div>
      </div>
    </section>
  );
}
