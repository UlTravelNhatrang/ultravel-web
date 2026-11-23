'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ShareNetwork } from '@phosphor-icons/react';
import { copyText } from '@/lib/clipboard';

const LABEL = { idle: 'Chia sẻ', ok: 'Đã chép liên kết', fail: 'Không chép được' } as const;

/** Native share sheet where available (phones), otherwise copies the link and says whether that worked. */
export function ShareButton({ title }: { title: string }) {
  const [state, setState] = useState<keyof typeof LABEL>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const share = async () => {
    const url = location.href.split('#')[0];
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch { /* closed the sheet */ }
      return;
    }
    setState((await copyText(url)) ? 'ok' : 'fail');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 2000);
  };

  return (
    <button type="button" onClick={share} className={`act-btn ${state === 'ok' ? 'is-on' : ''}`}>
      {state === 'ok' ? <Check size={16} weight="bold" aria-hidden="true" /> : <ShareNetwork size={16} aria-hidden="true" />}
      <span aria-live="polite">{LABEL[state]}</span>
    </button>
  );
}
