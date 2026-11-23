import type { Metadata, Viewport } from 'next';
import { Archivo, Be_Vietnam_Pro, IBM_Plex_Mono } from 'next/font/google';
import Script from 'next/script';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const archivo = Archivo({ subsets: ['latin', 'latin-ext', 'vietnamese'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
const vietnam = Be_Vietnam_Pro({ subsets: ['latin', 'latin-ext', 'vietnamese'], weight: ['400', '500', '600', '700'], variable: '--font-vietnam', display: 'swap' });
// Glyphs Plex lacks (→ ↑ ★ ●) must fall through to the system monospace (Consolas on Windows), not Next's Arial-based fallback.
const plex = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500', '600'],
  variable: '--font-plex',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'Menlo', 'monospace'],
});

export const metadata: Metadata = {
  // Makes relative canonical and Open Graph image paths absolute in the rendered tags.
  metadataBase: new URL(SITE_URL),
  title: 'Ultravel | Cẩm nang du lịch Nha Trang từ thổ địa',
  description: 'Cẩm nang du lịch Nha Trang thực tế: ăn gì, chơi đâu, giá vé bao nhiêu. Đi thực tế và ghi rõ ngày cập nhật.',
  icons: {
    icon: [
      { url: '/assets/ultravel-icon-64.png', sizes: '64x64', type: 'image/png' },
      { url: '/assets/ultravel-icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/assets/ultravel-icon-180.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light',
};

// Hero type starts masked only when motion is allowed; the fallback reveals it if animation never boots.
// js-motion: hide what the entrance animations will reveal. boot: first page of the browser session gets the
// curtain loader (components/layout/Curtain). Both are removed if the app hasn't started, so nothing stays hidden.
const MOTION_FLAG = `(function(){var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: no-preference)').matches)return;d.classList.add('js-motion');try{if(!sessionStorage.getItem('ut-boot')){sessionStorage.setItem('ut-boot','1');d.classList.add('boot')}}catch(e){}setTimeout(function(){if(!window.__motion)d.classList.remove('js-motion')},3000);setTimeout(function(){if(!window.__curtainReveal)d.classList.remove('boot')},4000)})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${archivo.variable} ${vietnam.variable} ${plex.variable}`} suppressHydrationWarning>
      <body>
        <Script id="motion-flag" strategy="beforeInteractive">{MOTION_FLAG}</Script>
        {children}
      </body>
    </html>
  );
}
