'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { PHOTOS } from '@/content/photos';

const SLIDES = [
  { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Nha_Trang_skyline.jpg/1280px-Nha_Trang_skyline.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', caption: 'Vịnh Nha Trang nhìn về trung tâm' },
  { src: PHOTOS.hub[1], caption: 'Hòn Nội, vịnh Nha Trang' },
  { src: PHOTOS.hub[2], caption: 'Thuyền đánh cá gần Hòn Đỏ' },
  { src: PHOTOS.hub[3], caption: 'Bờ biển Nha Trang tháng 11' },
];
const INTERVAL = 6000;

/**
 * Hero photos as a cross-fading slideshow. Advances every 6 s; pauses while hovered, focused or in a
 * background tab, and never auto-plays for people who prefer reduced motion. Arrows and dots switch by hand.
 */
export function HeroSlides() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const go = (i: number) => setIndex((i + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => { if (!document.hidden) setIndex(i => (i + 1) % SLIDES.length); }, INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused]);

  // Pause while the pointer or keyboard focus is anywhere in the hero (the text and search included).
  useEffect(() => {
    const hero = rootRef.current?.closest('.hh-wrap');
    if (!hero) return;
    const on = () => setPaused(true), off = () => setPaused(false);
    const blur = (e: Event) => { if (!hero.contains((e as FocusEvent).relatedTarget as Node | null)) off(); };
    hero.addEventListener('pointerenter', on); hero.addEventListener('pointerleave', off);
    hero.addEventListener('focusin', on); hero.addEventListener('focusout', blur);
    return () => {
      hero.removeEventListener('pointerenter', on); hero.removeEventListener('pointerleave', off);
      hero.removeEventListener('focusin', on); hero.removeEventListener('focusout', blur);
    };
  }, []);

  return (
    <div ref={rootRef} className="hh-slides" aria-roledescription="carousel" aria-label="Ảnh Nha Trang">
      {SLIDES.map((s, i) => (
        <div key={s.src} className={`hh-slide ${i === index ? 'is-on' : ''}`} aria-hidden={i !== index}>
          <Image src={s.src} alt={s.caption} fill preload={i === 0} fetchPriority={i === 0 ? 'high' : 'auto'} sizes="(max-width: 1440px) 100vw, 1440px" className="hh-img" />
        </div>
      ))}
      <div className="hh-ctrl">
        <p className="hh-cap" aria-live="polite">{SLIDES[index].caption}</p>
        <button type="button" className="hh-arrow" onClick={() => go(index - 1)} aria-label="Ảnh trước"><CaretLeft size={16} weight="bold" /></button>
        <div className="hh-dots">
          {SLIDES.map((s, i) => (
            <button key={s.src} type="button" className={`hh-dot ${i === index ? 'is-on' : ''}`} onClick={() => go(i)} aria-label={`Ảnh ${i + 1}: ${s.caption}`} aria-current={i === index} />
          ))}
        </div>
        <button type="button" className="hh-arrow" onClick={() => go(index + 1)} aria-label="Ảnh tiếp"><CaretRight size={16} weight="bold" /></button>
      </div>
    </div>
  );
}
