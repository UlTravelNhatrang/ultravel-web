'use client';

import { useEffect, useRef } from 'react';

/** Thin orange bar under the header that fills as the article is read. */
export function ReadingProgress({ articleId }: { articleId: string }) {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const art = document.getElementById(articleId);
      if (!art || !bar.current) return;
      const r = art.getBoundingClientRect();
      const done = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
      bar.current.style.transform = `scaleX(${done})`;
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    return () => { cancelAnimationFrame(raf); removeEventListener('scroll', queue); removeEventListener('resize', queue); };
  }, [articleId]);

  return <span className="read-progress" aria-hidden="true"><i ref={bar} /></span>;
}
