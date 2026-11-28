'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from '@phosphor-icons/react';
import { copyText } from '@/lib/clipboard';
import { barcodeStyle } from '@/lib/barcode';
import type { Review } from '@/types/review';

/** Tear-off coupon for this place. Tap copies the code. */
export function VoucherCoupon({ voucher, compact = false }: { voucher: NonNullable<Review['voucher']>; compact?: boolean }) {
  // null until tapped; true = copied, false = the browser refused (the code is shown so it can be noted down).
  const [copied, setCopied] = useState<boolean | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    copyText(voucher.code).then(ok => {
      setCopied(ok);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), 2200);
    });
  };

  if (compact) {
    return (
      // A tear-off ticket: offer on top, perforation with side notches, code stub below.
      <button type="button" onClick={copy} className={`vticket-btn ${copied ? 'is-copied' : ''}`} aria-label={`${voucher.title}. Sao chép mã ${voucher.code}`}>
        <span className="vticket">
          <span className="vticket-top">
            <span className="flex items-center justify-between gap-3">
              <span className="caption text-[12px] tracking-[.12em] opacity-75">VOUCHER ULTRAVEL</span>
              <span className="caption text-[12px] opacity-75">HSD {voucher.expires}</span>
            </span>
            <span className=" font-extrabold text-[1.6rem] leading-[1.05] tracking-[-0.03em] block mt-2">{voucher.title}</span>
            <span className="text-[13px] leading-snug block mt-1.5 opacity-80">{voucher.terms}</span>
          </span>
          <span className="vticket-stub">
            <span>
              <span className="caption text-[12px] opacity-70 block">Mã ưu đãi</span>
              <span className="num text-[2rem] leading-none tracking-[.06em] block mt-1">{voucher.code}</span>
            </span>
            <span className="vticket-copy caption" aria-live="polite">
              {copied ? <><Check size={14} weight="bold" aria-hidden="true" />Đã chép</> : copied === false ? 'Không chép được' : <><Copy size={14} aria-hidden="true" />Chạm để chép</>}
            </span>
          </span>
        </span>
      </button>
    );
  }

  return (
    <div className="coupon grid sm:grid-cols-[1fr_auto] border border-navy my-12 float-in">
      <div className="p-5 md:px-8 md:py-6">
        <p className="caption text-ink/70">Ưu đãi chỉ có trên Ultravel</p>
        <p className="hd text-h3 mt-1">{voucher.title}</p>
        <p className="text-sm text-ink/70 mt-2">{voucher.terms} HSD {voucher.expires}.</p>
      </div>
      <div className="border-t sm:border-t-0 sm:border-l border-dashed border-navy px-6 md:px-8 py-5 flex flex-col justify-center min-w-[15rem]">
        <p className="caption text-ink/70">Mã ưu đãi</p>
        <p className="num text-4xl text-navy mt-1">{voucher.code}</p>
        <div className="barcode mt-2" style={barcodeStyle(voucher.code)} aria-hidden="true" />
        <button type="button" onClick={copy} className={`caption font-semibold mt-3 text-left ${copied ? 'text-blue' : 'text-blue hover:text-navy'}`}>
          {copied ? 'Đã chép mã' : copied === false ? `Không chép được, hãy ghi lại mã ${voucher.code}` : 'Sao chép mã'} <span className="arr">→</span>
        </button>
      </div>
    </div>
  );
}
