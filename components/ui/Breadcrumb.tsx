import Link from 'next/link';

export type Crumb = { label: string; href?: string };

/** Breadcrumb trail. The last crumb is the current page and is not a link. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="caption text-ink/70">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="text-ink/30">/</span>}
            {c.href ? <Link href={c.href} className="hover:text-blue">{c.label}</Link> : <span aria-current="page" className="text-navy font-semibold">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
