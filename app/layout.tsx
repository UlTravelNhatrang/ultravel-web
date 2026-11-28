import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { SITE_URL } from '@/lib/site';
import './globals.css';

// Brand guideline 04: Inter is the one typeface, for UI, headings, body and captions.
// 'latin' covers ASCII and à-ý; 'vietnamese' adds ă đ ĩ ơ ư and the stacked tone marks.
const inter = Inter({ subsets: ['latin', 'vietnamese'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  // Makes relative canonical and Open Graph image paths absolute in the rendered tags.
  metadataBase: new URL(SITE_URL),
  title: 'Ultravel | Cẩm nang du lịch Nha Trang từ thổ địa',
  description: 'Cẩm nang du lịch Nha Trang thực tế: ăn gì, chơi đâu, giá vé bao nhiêu. Đi thực tế và ghi rõ ngày cập nhật.',
  // App icon U (guideline 02 and 08): favicon.ico plus PNG 16, 32, 48, 192 and 512 px; 180 px for Apple.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/assets/ultravel-icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/ultravel-icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/ultravel-icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/assets/ultravel-icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/assets/ultravel-icon-512.png', sizes: '512x512', type: 'image/png' },
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
    <html lang="vi" data-scroll-behavior="smooth" className={inter.variable} suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
