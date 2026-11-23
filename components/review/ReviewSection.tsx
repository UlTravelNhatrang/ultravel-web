import type { ReactNode } from 'react';

/** One body section of the review: anchor target for the section tabs, titled with the orange full stop. */
export function ReviewSection({ id, title, aside, children }: { id: string; title: ReactNode; aside?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="rv-sec" aria-labelledby={`${id}-title`}>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <h2 id={`${id}-title`} className="hd text-3xl md:text-[2.6rem]">{title}<span className="text-red">.</span></h2>
        {aside}
      </div>
      {children}
    </section>
  );
}
