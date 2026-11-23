'use client';

import { useEffect, useRef, useState } from 'react';
import { AsideNote, Section, SectionHeader, SectionTitle } from '@/components/ui/Section';
import { VOUCHERS } from '@/content/home';
import { barcodeStyle } from '@/lib/barcode';
import { copyText } from '@/lib/clipboard';
import { pad } from '@/lib/format';
import { gsap, motionOK } from '@/lib/motion';

const COPIED_MS = 2200;

export function Vouchers() {
  const [copied, setCopied] = useState<string | null>(null);
  const stubs = useRef<(HTMLParagraphElement | null)[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Only confirm when the copy really worked; the code stays visible on the ticket either way.
  const copy = async (code: string, k: number) => {
    if (!(await copyText(code))) return;
    setCopied(code);
    if (motionOK()) gsap.fromTo(stubs.current[k], { x: -6 }, { x: 0, duration: 0.3, ease: 'power3.out' });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), COPIED_MS);
  };

  return (
    <Section labelledBy="vcTitle">
      <SectionHeader label="02 — Ưu đãi tháng 11" aside={<AsideNote>04 mã / Bấm để sao chép</AsideNote>} />
      <SectionTitle id="vcTitle">Mã giảm giá</SectionTitle>
      <div id="vouchers" className="grid-ink sm:grid-cols-2 lg:grid-cols-4">
        {VOUCHERS.map(([discount, title, code, expires], k) => {
          const done = copied === code;
          return (
            <div key={code} className="ticket flex flex-col">
              <div className="flex justify-between mono px-4 pt-3 text-ink2"><span>V-{pad(k + 1)}</span><span>HSD {expires}</span></div>
              <div className="px-4 pt-4 pb-5 flex-1">
                <p ref={el => { stubs.current[k] = el; }} className="stub num text-6xl md:text-7xl text-red leading-none">{discount}</p>
                <p className="hd text-xl mt-4">{title}</p>
                <div className="barcode mt-4" style={barcodeStyle(code)} aria-hidden="true" />
              </div>
              <button
                type="button"
                onClick={() => copy(code, k)}
                className={`cp border-t border-ink px-4 py-3 mono text-[12px] font-semibold text-left flex justify-between hover:bg-ink hover:text-paper ${done ? 'bg-red text-ink' : ''}`}
                aria-label={`Sao chép mã ${code}`}
              >
                <span>{done ? 'Đã chép' : 'Sao chép'}: {code}</span><span>{done ? '[X]' : '[ ]'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
