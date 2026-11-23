import { SiteShell } from '@/components/layout/SiteShell';

/** Shell shared by every public page: skip link, header, footer, cursor, smooth scrolling, page-change curtain. */
export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return <SiteShell>{children}</SiteShell>;
}
