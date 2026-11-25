import type { Metadata } from 'next';
import { NOT_FOUND_META, NotFoundView } from '@/components/layout/NotFoundView';

export const metadata: Metadata = NOT_FOUND_META;

/** A review or post that doesn't exist (notFound() in a page): the (site) layout already gives the shell. */
export default function NotFound() {
  return (
    <>
      <NotFoundView />
    </>
  );
}
