import { Suspense, type ReactNode } from 'react';
import { SiteMotion } from '@/components/motion/SiteMotion';
import { pageTitles } from '@/lib/page-titles';
import { Curtain } from './Curtain';
import { CurtainController } from './CurtainController';
import { Cursor } from './Cursor';
import { Footer } from './Footer';
import { Header } from './Header';

/**
 * Everything around a public page: skip link, header, footer, cursor, smooth scrolling and the
 * page-change curtain. Used by the (site) layout and by the root 404 page.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Cursor />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] bg-ink text-paper px-4 py-2 mono">Bỏ qua đến nội dung</a>
      <Header />
      {children}
      <Footer />
      <SiteMotion />
      <Curtain />
      {/* Reads the pathname (request data on unknown routes), so it sits behind Suspense. */}
      <Suspense fallback={null}><CurtainController titles={pageTitles()} /></Suspense>
    </>
  );
}
