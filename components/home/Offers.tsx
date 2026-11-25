'use client';

import { useEffect, useRef, useState } from 'react';
import { Carousel } from '@/components/ui/Carousel';
import { OFFERS } from '@/content/catalog';
import { copyText } from '@/lib/clipboard';
import { HomeHead } from './HomeHead';

const COPIED_MS = 2000;

/** Compact vouchers right under the search: a sliding strip, tap a code to copy it. */
export function Offers() {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (code: string) => {
    if (!(await copyText(code))) return;
    setCopied(code);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), COPIED_MS);
  };

  return (
    <section className="wrap hsec !pt-16" aria-labelledby="offers-t">
      <HomeHead id="offers-t" eyebrow="Ưu đãi" title={<>Mã giảm giá <em className="it">tháng này</em></>} />
      <Carousel label="Mã giảm giá" autoplayMs={4500}>
        {OFFERS.map(o => {
          const done = copied === o.code;
          return (
            <article key={o.code} className="offer">
              <div className="offer-l"><p className="offer-d">{o.discount}</p></div>
              <div className="offer-r">
                <h3 className="offer-t">{o.title}</h3>
                <p className="offer-n">{o.note}</p>
                <div className="offer-f">
                  <button type="button" className={`offer-code ${done ? 'is-done' : ''}`} onClick={() => copy(o.code)} aria-label={`Sao chép mã ${o.code}`}>
                    {done ? 'Đã chép ✓' : o.code}
                  </button>
                  <span className="offer-exp">HSD {o.expires}</span>
                </div>
              </div>
            </article>
          );
        })}
      </Carousel>
      <p className="sr-only" aria-live="polite">{copied ? `Đã sao chép mã ${copied}` : ''}</p>
    </section>
  );
}
