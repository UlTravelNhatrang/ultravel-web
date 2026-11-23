import Link from 'next/link';
import type { ComponentProps } from 'react';
import { LEGACY_DEMO } from '@/lib/routes';

/**
 * Client navigation for app routes; a plain <a> for the original demo (a static HTML file that
 * the router must not try to render).
 */
export function SmartLink({ href, ...rest }: Omit<ComponentProps<'a'>, 'href'> & { href: string }) {
  if (href.startsWith(LEGACY_DEMO)) return <a href={href} {...rest} />;
  return <Link href={href} {...rest} />;
}
