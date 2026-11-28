'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SERVICES } from '@/content/b2b';
import { B2BSection } from './parts';

const total = String(SERVICES.length).padStart(2, '0');
const code = (i: number) => String(i + 1).padStart(2, '0');

/**
 * Services as an index + showcase. Desktop: a tight one-line-per-service index on the left; hovering or
 * picking a row swaps the photo panel on the right. Phones: the same index works as an accordion
 * (the active row opens in place; the photo panel isn't shown).
 */
export function Services() {
  const [active, setActive] = useState(0);
  const s = SERVICES[active];

  return (
    <B2BSection id="dich-vu" label="Dịch vụ" title="Một đội ngũ, đủ 7 mảng marketing du lịch">
      <div className="svc float-in">
        <div className="svc-index">
          <ol>
            {SERVICES.map((x, i) => {
              const on = i === active;
              return (
                <li key={x.key} className={on ? 'is-on' : undefined}>
                  <button
                    type="button"
                    className="svc-row"
                    aria-expanded={on}
                    aria-controls={`svc-more-${x.key} svc-show`}
                    onClick={() => setActive(i)}
                    onPointerEnter={e => { if (e.pointerType === 'mouse') setActive(i); }}
                  >
                    <span className="svc-code caption">S-{code(i)}</span>
                    <span className="svc-name">{x.title}</span>
                    <span className="svc-fit caption">{x.fit}</span>
                    <span className="svc-arr" aria-hidden="true">→</span>
                  </button>
                  {/* Phones: the description opens under its row. */}
                  <div id={`svc-more-${x.key}`} className="svc-more" hidden={!on}>
                    <p>{x.text}</p>
                    <p className="caption text-ink/70 mt-2">Hợp với: {x.fit}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <a href="#lien-he" className="svc-combo group">
            <span className="svc-code caption">S-+</span>
            <span>Không cần đủ 7 mảng? <strong>Ghép combo theo ngân sách</strong></span>
            <span className="svc-arr" aria-hidden="true">→</span>
          </a>
        </div>

        {/* Desktop showcase: every photo is stacked and the active one fades in, so switching never waits on a download. */}
        <div id="svc-show" className="svc-show" aria-live="polite">
          {SERVICES.map((x, i) => (
            <Image key={x.key} src={x.photo} alt="" fill sizes="(min-width: 1024px) 44vw, 100vw" className={`svc-img ${i === active ? 'is-on' : ''}`} />
          ))}
          <span className="svc-big" aria-hidden="true">{code(active)}<small>/{total}</small></span>
          <div className="svc-body" key={s.key}>
            <p className="caption text-cloud/75"><span className="text-[#FF8A00] font-semibold">S-{code(active)}</span> · Hợp với: {s.fit}</p>
            <h3 className="text-h3 mt-2">{s.title}</h3>
            <p className="text-cloud/90 text-base leading-relaxed mt-2 max-w-[42ch]">{s.text}</p>
            <a href="#lien-he" className="svc-cta caption">Tư vấn mảng này <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </B2BSection>
  );
}
