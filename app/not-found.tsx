import type { Metadata } from 'next';
import { NOT_FOUND_META, NotFoundView } from '@/components/layout/NotFoundView';
import { SiteShell } from '@/components/layout/SiteShell';

export const metadata: Metadata = NOT_FOUND_META;

/** Unknown URLs: rendered inside the root layout only, so it brings the site shell itself. */
export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundView />
    </SiteShell>
  );
}
