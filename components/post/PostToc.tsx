'use client';

import { useEffect, useRef, useState } from 'react';
import { headerHeight, smoothTo } from '@/lib/motion';
import { pad } from '@/lib/format';

export type TocItem = { id: string; label: string };

/**
 * Sticky table of contents for desktop: the section being read is highlighted, and the
 * header shows how far through the article the reader is.
 */
export function PostToc({ items, articleId }: { items: TocItem[]; articleId: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = headerHeight() + 80;
      let current = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) current = it.id;
      }
      setActive(current);
      const art = document.getElementById(articleId);
      if (art) {
        const r = art.getBoundingClientRect();
        const pct = Math.round(Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height)) * 100);
        // Written directly: as React state this re-rendered the whole list on every scroll frame.
        if (pctRef.current) pctRef.current.textContent = `Đã đọc ${pct}%`;
        if (barRef.current) barRef.current.style.transform = `scaleX(${pct / 100})`;
      }
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    return () => { cancelAnimationFrame(raf); removeEventListener('scroll', queue); removeEventListener('resize', queue); };
  }, [items, articleId]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || headerHeight() + 24;
    smoothTo(Math.max(0, Math.round(el.getBoundingClientRect().top + scrollY - margin)));
    // Shareable address for the section, and keyboard focus moves into it (sections have tabIndex -1).
    history.replaceState(history.state, '', `#${id}`);
    el.focus({ preventScroll: true });
  };

  return (
    <nav className="post-toc soft-card" aria-label="Mục lục bài viết">
      <div className="flex items-center justify-between gap-3">
        <p className=" font-extrabold text-lg tracking-[-0.02em]">Trong bài này</p>
        <span ref={pctRef} className="caption text-ink/70 tabular-nums">Đã đọc 0%</span>
      </div>
      <span className="post-toc-bar" aria-hidden="true"><i ref={barRef} style={{ transform: 'scaleX(0)' }} /></span>
      <ol className="mt-3">
        {items.map((it, i) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? 'true' : undefined}
              onClick={e => { e.preventDefault(); go(it.id); }}
            >
              <span className="caption">{pad(i + 1)}</span>
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
