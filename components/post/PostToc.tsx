'use client';

import { useEffect, useState } from 'react';
import { headerHeight, smoothTo } from '@/lib/motion';
import { pad } from '@/lib/format';

export type TocItem = { id: string; label: string };

/**
 * Sticky table of contents for desktop: the section being read is highlighted, and the
 * header shows how far through the article the reader is.
 */
export function PostToc({ items, articleId }: { items: TocItem[]; articleId: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const [progress, setProgress] = useState(0);

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
        const done = (innerHeight * 0.6 - r.top) / r.height;
        setProgress(Math.round(Math.min(1, Math.max(0, done)) * 100));
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
        <p className="font-display font-extrabold text-lg tracking-[-0.02em]">Trong bài này</p>
        <span className="mono text-ink2 tabular-nums">Đã đọc {progress}%</span>
      </div>
      <span className="post-toc-bar" aria-hidden="true"><i style={{ transform: `scaleX(${progress / 100})` }} /></span>
      <ol className="mt-3">
        {items.map((it, i) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? 'true' : undefined}
              onClick={e => { e.preventDefault(); go(it.id); }}
            >
              <span className="mono">{pad(i + 1)}</span>
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
