import Image from 'next/image';
import { ChatCircleDots } from '@phosphor-icons/react/dist/ssr';
import type { FaqItem } from '@/types/content';
import { Rich } from './Rich';
import { ZaloIcon } from './ZaloIcon';

export type FaqAsk = { title: string; text: string; href: string; label: string };

/**
 * "Ask a local" Q&A board: numbered questions, each answer arrives as a chat reply
 * (typing dots, then the text). A native <details> list, so it works without JavaScript
 * and search engines read every answer. Styles: `.faq*` in styles/components.css.
 */
export function FaqBoard({ items, byline, ask }: { items: FaqItem[]; byline: string; ask?: FaqAsk }) {
  return (
    <div className="faq-board soft-card">
      {items.map((f, i) => (
        <details key={f.q} className="faq" open={i === 0}>
          <summary>
            <span className="faq-n mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span className="faq-q">{f.q}</span>
            <span className="faq-icon" aria-hidden="true" />
          </summary>
          <div className="faq-a">
            <Image src="/assets/ultravel-icon-64.png" alt="" width={36} height={36} className="faq-avatar" />
            <div className="min-w-0">
              <p className="mono text-[10px] text-ink2 mb-1.5">{byline}</p>
              <div className="faq-bubble">
                <span className="faq-typing" aria-hidden="true"><i /><i /><i /></span>
                <p><Rich text={f.a} /></p>
              </div>
            </div>
          </div>
        </details>
      ))}

      {ask && (
        <div className="faq-ask">
          <div>
            <p className="font-display font-extrabold text-lg tracking-[-0.02em]">{ask.title}</p>
            <p className="text-sm text-ink2 mt-0.5">{ask.text}</p>
          </div>
          <a href={ask.href} target={ask.href.startsWith('http') ? '_blank' : undefined} rel={ask.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="faq-ask-btn">
            {ask.href.includes('zalo.me') ? <span className="ct-zalo"><ZaloIcon size={20} /></span> : <ChatCircleDots size={18} weight="fill" aria-hidden="true" />}
            {ask.label}
          </a>
        </div>
      )}
    </div>
  );
}
