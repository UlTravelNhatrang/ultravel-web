import Link from 'next/link';
import type { ReactNode } from 'react';

/** Standard page section: centred 1440px column with the shared top spacing. */
export function Section({ id, labelledBy, className = '', children }: { id?: string; labelledBy?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`max-w-[1440px] mx-auto px-4 md:px-6 pt-20 md:pt-28 ${className}`}>
      {children}
    </section>
  );
}

/** The strip that opens every section: hairline, an orange rule that draws in, the section label and an aside. */
export function SectionHeader({ label, aside }: { label: string; aside?: ReactNode }) {
  return (
    <div className="unit">
      <span className="rule" />
      <span className="caption dec">{label}</span>
      {aside}
    </div>
  );
}

export function AsideNote({ children }: { children: ReactNode }) {
  return <span className="caption text-ink/70">{children}</span>;
}

/** `label` names the destination for screen readers when the visible text is generic ("Xem tất cả"). */
export function AsideLink({ href, label, children }: { href: string; label?: string; children: ReactNode }) {
  return (
    <Link href={href} aria-label={label} className="text-[15px] font-semibold text-blue hover:text-navy">
      {children}
    </Link>
  );
}

/** Big section heading that ends in the brand-orange full stop. */
export function SectionTitle({ id, className = 'mt-6 mb-8', children }: { id: string; className?: string; children: ReactNode }) {
  return (
    <h2 id={id} className={`hd text-h2 ${className}`}>
      {children}
      <span className="text-orange">.</span>
    </h2>
  );
}

/** Arrow that nudges right when its link or card is hovered. */
export function Arrow({ children = '→' }: { children?: ReactNode }) {
  return <span className="arr">{children}</span>;
}
