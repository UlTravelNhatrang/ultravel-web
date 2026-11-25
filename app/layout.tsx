import type { Metadata, Viewport } from 'next';
import { Be_Vietnam_Pro, IBM_Plex_Mono, Lora } from 'next/font/google';
import { SITE_URL } from '@/lib/site';
import './globals.css';

// Vietnamese text needs only 'latin' (ASCII and à-ý) plus 'vietnamese' (ă đ ĩ ơ ư and the stacked tones).
// Be Vietnam Pro is drawn for Vietnamese, so stacked tone marks stay clear even in heavy display sizes:
// it sets body and headings. Lora italic is the accent for the second phrase of a heading.
const vietnam = Be_Vietnam_Pro({ subsets: ['latin', 'vietnamese'], weight: ['400', '500', '600', '700', '800'], variable: '--font-vietnam', display: 'swap' });
const lora = Lora({ subsets: ['latin', 'vietnamese'], style: ['italic'], weight: ['500', '600'], variable: '--font-serif', display: 'swap' });
// Glyphs Plex lacks (→ ↑ ★ ●) must fall through to the system monospace (Consolas on Windows), not Next's Arial-based fallback.
const plex = IBM_Plex_Mono({
  subsets: ['latin', 'vietnamese'],
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" className={`${vietnam.variable} ${lora.variable} ${plex.variable}`} suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
