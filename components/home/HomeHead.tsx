import Link from 'next/link';
import type { ReactNode } from 'react';

/** Section heading: small eyebrow, title (put the accent phrase in <em className="it">), optional link right.
 *  Without a title, the eyebrow itself is the section's heading. */
export function HomeHead({ id, eyebrow, title, link }: { id: string; eyebrow: string; title?: ReactNode; link?: { href: string; label: string } }) {
  return (
    <div className="hhead">
      <div>
        {title ? (
          <>
            <p className="hhead-eyebrow">{eyebrow}</p>
            <h2 id={id} className="hhead-title">{title}</h2>
          </>
        ) : (
          <h2 id={id} className="hhead-eyebrow">{eyebrow}</h2>
        )}
      </div>
      {link && <Link href={link.href} className="hhead-link">{link.label} <span aria-hidden="true">→</span></Link>}
    </div>
  );
}
