import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';
import type { RichText } from '@/types/post';

// **bold**, or [text](href). The href may contain balanced parentheses, e.g. a Wikipedia URL.
const TOKEN = /\*\*(.+?)\*\*|\[(.+?)\]\(((?:[^()\s]|\([^()\s]*\))+)\)/g;

/** Same-site path ("/x"), not a protocol-relative URL ("//host/x"). */
const isInternal = (href: string) => /^\/(?!\/)/.test(href);

/** Renders inline text with **bold** and [links](/path). Internal links use client navigation; others open in a new tab. */
export function Rich({ text }: { text: RichText }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [, bold, label, href] = m;
    if (bold) out.push(<strong key={m.index}>{bold}</strong>);
    else if (isInternal(href)) out.push(<Link key={m.index} href={href} className="post-link">{label}</Link>);
    else out.push(<a key={m.index} href={href} className="post-link" target="_blank" rel="noopener noreferrer">{label}</a>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <Fragment>{out}</Fragment>;
}

/** Plain text of a RichText string, for meta descriptions and structured data. */
export const plain = (text: RichText) => text.replace(TOKEN, (_, bold, label) => bold ?? label);
