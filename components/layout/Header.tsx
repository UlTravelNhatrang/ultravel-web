'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { BookOpenText, CaretDown, ChatCircleDots, Handshake, Megaphone, SuitcaseRolling, type Icon } from '@phosphor-icons/react';
import { REGIONS, destinationPath } from '@/content/destinations';
import { BOOKING_TYPES } from '@/lib/booking';
import { msToVietnamMidnight, todayLabel } from '@/lib/format';
import { specialDay } from '@/content/special-days';
import { placeBlob, smoothTo } from '@/lib/motion';
import { SONG_XANH_CAFE } from '@/content/reviews/song-xanh-cafe';
import { reviewPath } from '@/lib/reviews';
import { postPath } from '@/lib/posts';
import { ROUTES } from '@/lib/routes';
import { LICH_TRINH_3N2D } from '@/content/posts/lich-trinh-nha-trang-3-ngay-2-dem';

type NavItem = { href: string; label: string; Icon: Icon; legacy?: boolean; menu?: 'guides' | 'booking' };

const NAV: NavItem[] = [
  { href: ROUTES.guides, label: 'Cẩm nang du lịch', Icon: BookOpenText, menu: 'guides' },
  { href: ROUTES.tours, label: 'Booking', Icon: SuitcaseRolling, menu: 'booking' },
  { href: ROUTES.b2bContact, label: 'Hợp tác du lịch', Icon: Handshake },
  { href: ROUTES.b2b, label: 'Marketing du lịch', Icon: Megaphone },
];

/** Cẩm nang mega menu: one column per region, destinations link to their archive pages. */
function GuidesMenu() {
  return (
    <div className="nd-mega">
      {REGIONS.map(r => (
        <div key={r.key}>
          <p className="nd-h">{r.label}</p>
          <ul>{r.places.map(d => <li key={d.slug}><Link href={destinationPath(d)} className="nd-link">{d.name}</Link></li>)}</ul>
        </div>
      ))}
    </div>
  );
}

/** Booking menu: the three listing pages. */
function BookingMenu() {
  return (
    <ul className="nd-list">
      {BOOKING_TYPES.map(b => (
        <li key={b.key}><Link href={b.href} className="nd-item"><b>{b.label}</b><span>{b.intro.split('.')[0]}.</span></Link></li>
      ))}
    </ul>
  );
}

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
    <Link key={t.href} href={t.href} className={`inline-block py-1.5 px-1 ${current === t.href ? 'font-semibold underline underline-offset-2' : 'hover:text-blue'}`}>{t.label}</Link>
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
  const eventRef = useRef<HTMLSpanElement>(null);

  // Today's date in Nha Trang, plus the special day if there is one; rolls over at Vietnam midnight.
  useEffect(() => {
    let timer = 0;
    const paint = () => {
      const today = todayLabel(), event = specialDay(today);
      if (todayRef.current) todayRef.current.textContent = today;
      if (eventRef.current) { eventRef.current.textContent = event ? ` · ${event}` : ''; eventRef.current.hidden = !event; }
      timer = window.setTimeout(paint, msToVietnamMidnight());
    };
    paint();
    return () => clearTimeout(timer);
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
    <header ref={headerRef} className="sticky top-0 z-40 bg-cloud/75 backdrop-blur-xl border-b border-navy" style={{ top: 'env(safe-area-inset-top,0px)' }}>
      {/* Telemetry strip */}
      <div className="border-b border-navy">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-7 flex items-center gap-6 caption text-[12px] md:text-[12px] overflow-hidden whitespace-nowrap">
          <span className="text-navy font-semibold inline-flex items-center gap-1.5"><i className="live text-orange" />Trực tiếp</span>
          <span>Nha Trang 12°15&apos;N 109°11&apos;E</span>
          <span className="hidden sm:inline-flex items-center gap-2">29°C / Nắng nhẹ</span>
          <span className="hidden md:inline">Ngày <span ref={todayRef} suppressHydrationWarning>21.11.2026</span><span ref={eventRef} className="text-navy font-semibold" hidden suppressHydrationWarning /></span>
          <span className="hidden lg:inline-flex items-center gap-2 ml-auto">
            <a href="#" className="hover:text-blue">Về chúng tôi</a>
            <span aria-hidden="true" className="text-ink/40">|</span>
            <a href="#" className="hover:text-blue">Chính sách</a>
          </span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-[72px] md:h-[80px] flex items-center gap-4">
        {/* Clear space (guideline 02): at least the height of the U on every side of the wordmark. */}
        <Link href="/" className="logo flex items-center shrink-0 ml-2 md:ml-1 mr-6" aria-label="Ultravel.vn, trang chủ">
          <Image src="/assets/ultravel-wordmark.svg" alt="Ultravel.vn" width={1743} height={272} preload className="logo-wm h-6 md:h-7 w-auto" />
        </Link>

        <nav ref={navRef} id="dnav" aria-label="Menu chính" className="hidden xl:flex relative items-center mx-auto p-1.5 rounded-[12px]">
          <span ref={blobRef} className="nav-blob" aria-hidden="true" />
          {NAV.map(({ href, label, Icon, legacy: isLegacy, menu }) =>
            isLegacy ? (
              <a key={label} className="nl orig" href={href}><Icon className="ico" size={17} aria-hidden="true" />{label}</a>
            ) : menu ? (
              // Dropdown opens on hover and on keyboard focus (CSS :focus-within); Escape closes it.
              <div key={label} className={`nd ${menu === 'guides' ? '' : 'is-anchored'}`} onKeyDown={e => { if (e.key === 'Escape') (document.activeElement as HTMLElement | null)?.blur(); }}>
                <Link className="nl" href={href} aria-haspopup="true"><Icon className="ico" size={17} aria-hidden="true" />{label}<CaretDown className="nd-caret" size={12} weight="bold" aria-hidden="true" /></Link>
                <div className={`nd-panel ${menu === 'guides' ? 'is-mega' : ''}`}>
                  {menu === 'guides' ? <GuidesMenu /> : <BookingMenu />}
                </div>
              </div>
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
          <Link href={ROUTES.b2bContact} className="contact-btn hidden sm:inline-flex">
            <span className="contact-btn-ico" aria-hidden="true"><ChatCircleDots size={18} weight="fill" /><i className="contact-btn-dot" /></span>
            <span className="contact-btn-txt"><b>Liên hệ</b><small>Phản hồi trong 15 phút</small></span>
          </Link>
          <button type="button" onClick={() => setMenuOpen(o => !o)} className="xl:hidden burger-pill caption" aria-label="Mở menu" aria-expanded={menuOpen}>
            {menuOpen ? 'Đóng' : 'Menu'}
          </button>
        </div>
      </div>

      <nav id="mnav" className={`${menuOpen ? '' : 'hidden'} xl:hidden border-t border-navy text-[15px] font-medium grid`}>
        {NAV.map(l => l.menu ? (
          <details key={l.href} className="mnav-group border-b border-navy">
            <summary className="px-4 py-3 flex items-center justify-between cursor-pointer">{l.label}<CaretDown size={14} weight="bold" aria-hidden="true" /></summary>
            <div className="px-4 pb-4">
              <Link href={l.href} className="block py-2 font-semibold text-blue">{l.menu === 'guides' ? 'Tất cả cẩm nang' : 'Tất cả dịch vụ'} →</Link>
              {l.menu === 'guides' ? REGIONS.map(r => (
                <div key={r.key} className="mt-3">
                  <p className="caption font-semibold text-ink/70 uppercase">{r.label}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">{r.places.map(d => <Link key={d.slug} href={destinationPath(d)} className="py-1">{d.name}</Link>)}</div>
                </div>
              )) : BOOKING_TYPES.map(b => <Link key={b.key} href={b.href} className="block py-2">{b.label}</Link>)}
            </div>
          </details>
        ) : <Link key={l.href} className="px-4 py-3 border-b border-navy" href={l.href}>{l.label}</Link>)}
      </nav>

      {/* Template switcher (only for reviewing the demo) */}
      <div className="border-t border-navy bg-white/30 caption text-[12px] px-4 py-0.5 flex flex-wrap items-center gap-x-3 justify-center">
        <span className="text-ink/70">Xem mẫu:</span>
        {/* The pathname is request data on unknown routes, so it sits behind Suspense. */}
        <Suspense fallback={<TemplateLinks />}><CurrentTemplateLinks /></Suspense>
      </div>
    </header>
  );
}
