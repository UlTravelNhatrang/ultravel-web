'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { BookOpenText, BowlFood, CalendarBlank, MapPin, Megaphone, SuitcaseRolling, type Icon } from '@phosphor-icons/react';
import { todayLabel } from '@/lib/format';
import { placeBlob, smoothTo } from '@/lib/motion';
import { SONG_XANH_CAFE } from '@/content/reviews/song-xanh-cafe';
import { reviewPath } from '@/lib/reviews';
import { postPath } from '@/lib/posts';
import { ROUTES } from '@/lib/routes';
import { LICH_TRINH_3N2D } from '@/content/posts/lich-trinh-nha-trang-3-ngay-2-dem';

type NavItem = { href: string; label: string; Icon: Icon; legacy?: boolean };

const NAV: NavItem[] = [
  { href: ROUTES.guides, label: 'Cẩm nang', Icon: BookOpenText },
  { href: ROUTES.food, label: 'Ẩm thực', Icon: BowlFood },
  { href: ROUTES.places, label: 'Điểm đến', Icon: MapPin },
  { href: ROUTES.itineraries, label: 'Lịch trình', Icon: CalendarBlank },
  { href: ROUTES.services, label: 'Tour & lưu trú', Icon: SuitcaseRolling },
  { href: ROUTES.b2b, label: 'Marketing', Icon: Megaphone },
];

const MOBILE_NAV = [
  { href: ROUTES.guides, label: 'Cẩm nang du lịch' },
  { href: ROUTES.food, label: 'Ẩm thực & đặc sản' },
  { href: ROUTES.places, label: 'Điểm đến & vui chơi' },
  { href: ROUTES.itineraries, label: 'Lịch trình tự túc' },
  { href: ROUTES.services, label: 'Tour & lưu trú' },
];

/** Focus the hero search after gliding to the top (homepage); elsewhere, go home to search. */
function openSearch(goHome: () => void) {
  if (!document.getElementById('q')) { goHome(); return; }
  smoothTo(0);
  setTimeout(() => document.getElementById('q')?.focus({ preventScroll: true }), 350);
}

const TEMPLATES = [
  { href: '/', label: '1. Trang chủ' },
  { href: reviewPath(SONG_XANH_CAFE), label: '2. Review chi tiết' },
  { href: postPath(LICH_TRINH_3N2D), label: '3. Bài viết' },
  { href: ROUTES.b2b, label: '4. B2B' },
];

/** Demo switcher links; the page you are on is underlined. */
function TemplateLinks({ current }: { current?: string }) {
  return TEMPLATES.map(t => (
    <Link key={t.href} href={t.href} className={`inline-block py-1.5 px-1 ${current === t.href ? 'font-semibold underline underline-offset-2' : 'hover:text-red'}`}>{t.label}</Link>
  ));
}

function CurrentTemplateLinks() {
  return <TemplateLinks current={usePathname()} />;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const search = () => openSearch(() => router.push('/#q'));
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const blobRef = useRef<HTMLSpanElement>(null);
  const todayRef = useRef<HTMLSpanElement>(null);

  // Date and header height are browser-only facts.
  useEffect(() => {
    if (todayRef.current) todayRef.current.textContent = todayLabel();
  }, []);

  // --hh tracks the header's real height (resize, fonts, menu) without a window resize listener.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const ro = new ResizeObserver(() => document.documentElement.style.setProperty('--hh', `${header.offsetHeight}px`));
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  // A white bubble glides under whichever nav link you point at (CSS transition on transform/width).
  useEffect(() => {
    const nav = navRef.current, blob = blobRef.current;
    if (!nav || !blob) return;
    const links = [...nav.querySelectorAll<HTMLAnchorElement>('.nl')];
    const go = (el: HTMLElement) => placeBlob(blob, el.offsetLeft, el.offsetWidth);
    const hide = () => { blob.style.opacity = '0'; };
    const handlers = links.map(a => [a, () => go(a)] as const);
    handlers.forEach(([a, fn]) => { a.addEventListener('pointerenter', fn); a.addEventListener('focus', fn); });
    const onFocusOut = (e: FocusEvent) => { if (!nav.contains(e.relatedTarget as Node)) hide(); };
    nav.addEventListener('pointerleave', hide);
    nav.addEventListener('focusout', onFocusOut);
    return () => {
      handlers.forEach(([a, fn]) => { a.removeEventListener('pointerenter', fn); a.removeEventListener('focus', fn); });
      nav.removeEventListener('pointerleave', hide);
      nav.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  // "/" jumps to search, like most search-first sites.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === '/' && !t.closest('input,textarea,select,[contenteditable]')) {
        e.preventDefault();
        openSearch(() => router.push('/#q'));
      }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [router]);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-paper/75 backdrop-blur-xl border-b border-ink" style={{ top: 'env(safe-area-inset-top,0px)' }}>
      {/* Telemetry strip */}
      <div className="border-b border-ink">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-7 flex items-center gap-6 mono text-[10px] md:text-[11px] overflow-hidden whitespace-nowrap">
          <span className="text-red font-semibold inline-flex items-center gap-1.5"><i className="live" />Trực tiếp</span>
          <span>Nha Trang 12°15&apos;N 109°11&apos;E</span>
          <span className="hidden sm:inline-flex items-center gap-2">29°C / Nắng nhẹ</span>
          <span className="hidden md:inline">Cập nhật <span ref={todayRef} suppressHydrationWarning>21.11.2026</span></span>
          <span className="hidden lg:inline ml-auto">Rev 11.26 / Cẩm nang thực địa</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-[68px] flex items-center gap-4">
        <Link href="/" className="logo flex items-center gap-3 shrink-0" aria-label="Ultravel.vn, trang chủ">
          <Image src="/assets/ultravel-wordmark.png" alt="Ultravel.vn" width={981} height={160} sizes="200px" preload className="logo-wm h-[28px] md:h-[32px] w-auto" />
          <span className="hidden 2xl:block mono text-[10px] leading-[1.35] text-ink2 pl-3 border-l border-ink">Cẩm nang<br />từ thổ địa</span>
        </Link>

        <nav ref={navRef} id="dnav" aria-label="Menu chính" className="hidden xl:flex relative items-center mx-auto p-1.5 rounded-full">
          <span ref={blobRef} className="nav-blob" aria-hidden="true" />
          {NAV.map(({ href, label, Icon, legacy: isLegacy }) =>
            isLegacy ? (
              <a key={label} className="nl orig" href={href}><Icon className="ico" size={17} aria-hidden="true" />{label}</a>
            ) : (
              <Link key={label} className="nl" href={href}><Icon className="ico" size={17} aria-hidden="true" />{label}</Link>
            ),
          )}
        </nav>

        <div className="ml-auto xl:ml-0 flex items-center gap-2 shrink-0">
          <button type="button" onClick={search} className="search-pill" aria-label="Tìm kiếm (phím /)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 21 21" /></svg>
            <span className="hidden 2xl:inline">Tìm kiếm</span><kbd className="hidden 2xl:grid">/</kbd>
          </button>
          <Link href={ROUTES.b2bContact} className="cta-pill hidden sm:inline-flex">
            <span>Hợp tác<span className="hidden 2xl:inline"> truyền thông</span></span><span className="cta-dot" aria-hidden="true">→</span>
          </Link>
          <button type="button" onClick={() => setMenuOpen(o => !o)} className="xl:hidden burger-pill mono" aria-label="Mở menu" aria-expanded={menuOpen}>
            {menuOpen ? 'Đóng' : 'Menu'}
          </button>
        </div>
      </div>

      <nav id="mnav" className={`${menuOpen ? '' : 'hidden'} xl:hidden border-t border-ink mono text-[12px] grid`}>
        {MOBILE_NAV.map(l => <Link key={l.href} className="px-4 py-3 border-b border-ink" href={l.href}>{l.label}</Link>)}
        <Link className="px-4 py-3 border-b border-ink" href={ROUTES.b2b}>Marketing du lịch</Link>
        <Link href={ROUTES.b2bContact} className="px-4 py-3 bg-red text-ink font-semibold">Hợp tác truyền thông</Link>
      </nav>

      {/* Template switcher (only for reviewing the demo) */}
      <div className="border-t border-ink bg-white/30 mono text-[10px] px-4 py-0.5 flex flex-wrap items-center gap-x-3 justify-center">
        <span className="text-ink2">Xem mẫu:</span>
        {/* The pathname is request data on unknown routes, so it sits behind Suspense. */}
        <Suspense fallback={<TemplateLinks />}><CurrentTemplateLinks /></Suspense>
      </div>
    </header>
  );
}
