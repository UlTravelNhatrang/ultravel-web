'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { Crosshair, Stack, TrendUp } from '@phosphor-icons/react';
import { Photo } from '@/components/ui/Photo';
import { INDUSTRIES, SERVICE_LABEL } from '@/content/b2b';

/** One tab per industry: goal, the services we'd start with, and the KPIs we report on. */
export function Industries() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const ind = INDUSTRIES[active];

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + INDUSTRIES.length) % INDUSTRIES.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Chọn ngành" className="b2b-tabs" onKeyDown={onKey}>
        {INDUSTRIES.map((x, i) => (
          <button
            key={x.key}
            ref={el => { tabs.current[i] = el; }}
            type="button"
            role="tab"
            id={`ind-tab-${x.key}`}
            aria-selected={i === active}
            aria-controls="ind-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className="b2b-tab"
          >
            {x.label}
          </button>
        ))}
      </div>

      <div id="ind-panel" role="tabpanel" aria-labelledby={`ind-tab-${ind.key}`} className="b2b-ind soft-card mt-[var(--card-gap)]" key={ind.key}>
        <Photo src={ind.photo} alt={ind.label} width={900} height={700} className="b2b-ind-img" />
        <div className="grid sm:grid-cols-3 gap-px bg-navy/10 rounded-[14px] overflow-hidden self-center">
          <div className="b2b-ind-cell">
            <p className="caption text-ink/70 flex items-center gap-1.5"><Crosshair size={14} aria-hidden="true" />Mục tiêu</p>
            <p className=" font-bold text-lg leading-snug tracking-[-0.01em] mt-2">{ind.goal}</p>
          </div>
          <div className="b2b-ind-cell">
            <p className="caption text-ink/70 flex items-center gap-1.5"><Stack size={14} aria-hidden="true" />Bắt đầu với</p>
            <ul className="flex flex-wrap gap-1.5 mt-2.5">{ind.plan.map(k => <li key={k} className="tag-chip !text-[13px]">{SERVICE_LABEL[k]}</li>)}</ul>
          </div>
          <div className="b2b-ind-cell">
            <p className="caption text-ink/70 flex items-center gap-1.5"><TrendUp size={14} aria-hidden="true" />KPI theo dõi</p>
            <p className="font-medium leading-snug mt-2">{ind.kpi}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
