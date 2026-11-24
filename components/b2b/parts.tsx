import type { ReactNode } from 'react';

/** A B2B page section: anchor for the tabs, small label, big title with the orange full stop. */
export function B2BSection({ id, label, title, aside, className = '', children }: { id: string; label: string; title: ReactNode; aside?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={`rv-sec ${className}`} aria-labelledby={`${id}-t`}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 mb-8">
        <div>
          <p className="mono text-red-t">{label}</p>
          <h2 id={`${id}-t`} className="hd text-[clamp(2rem,4vw,3.4rem)] mt-2 [text-wrap:balance]">{title}<span className="text-red">.</span></h2>
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}

/** Small badge for figures that are illustrations, not results yet. */
export function SampleTag({ className = '' }: { className?: string }) {
  return <span className={`b2b-sample mono ${className}`}>Số liệu mẫu</span>;
}
