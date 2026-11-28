import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

/**
 * Everything around a public page: skip link, header and footer. Used by the (site) layout and by the
 * root 404 page. No cursor, smooth-scroll or page-transition scripts: native scrolling and CSS only.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] bg-navy text-cloud px-4 py-2 caption">Bỏ qua đến nội dung</a>
      <Header />
      {children}
      <Footer />
    </>
  );
}
