'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { MAIN_NAV, type NavEntry } from '@/content/nav';
import { placeBlob } from '@/lib/motion';
import { ROUTES } from '@/lib/routes';
import { dayLabel, specialDay } from '@/lib/special-days';

// Today's date in the visitor's timezone, re-read every minute so it rolls over at midnight.
// null while prerendering and hydrating (the date is a browser-only fact).
const subscribe = (cb: () => void) => { const t = setInterval(cb, 60_000); return () => clearInterval(t); };
const useToday = () => useSyncExternalStore(subscribe, () => dayLabel(new Date()), () => null);

/** "Ngày 24.11.2026 · Ngày Văn hóa Việt Nam" (the event only on a special day). */
function TodayStrip() {
  const today = useToday();
  if (!today) return <span className="hidden md:inline" aria-hidden="true">&nbsp;</span>;
  const [d, m, y] = today.split('.').map(Number);
  const event = specialDay(new Date(y, m - 1, d));
  return (
    <span className="hidden md:inline-flex items-center gap-2">
      <span>Ngày {today}</span>
      {event && <span className="today-event">{event}</span>}
    </span>
  );
}

/** Desktop dropdown: destinations by region (guides) or booking types, in columns. */
function MegaPanel({ item, onPick }: { item: NavEntry; onPick: () => void }) {
  const groups = item.groups!;
  return (
    <div className="mega-panel" data-cols={groups.length}>
      <div className="mega-inner">
        {groups.map(g => (
          <div key={g.title} className="mega-col">
            <p className="mega-t">{g.title}</p>
            <ul>
              {g.links.map(l => <li key={l.label}><Link href={l.href} onClick={onPick}>{l.label}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <Link href={item.href} className="mega-all" onClick={onPick}>Xem tất cả {item.label.toLowerCase()} <span aria-hidden="true">→</span></Link>
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  // Closes the open dropdown after a pick (hover would otherwise keep it up under the pointer).
  const [closedKey, setClosedKey] = useState<string | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const blobRef = useRef<HTMLSpanElement>(null);

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

  // Escape closes an open dropdown.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const open = navRef.current?.querySelector<HTMLElement>('.nav-item:focus-within');
      if (open) { setClosedKey(open.dataset.key ?? null); open.querySelector<HTMLElement>('.nl')?.focus(); }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  const isOn = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href.split('?')[0].replace(/\/$/, '') + '/'));

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-paper/75 backdrop-blur-xl border-b border-ink" style={{ top: 'env(safe-area-inset-top,0px)' }}>
      {/* Top strip: live location, today's date (and the special day, if any), company links */}
      <div className="border-b border-ink">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-7 flex items-center gap-6 mono text-[10px] md:text-[11px] overflow-hidden whitespace-nowrap">
          <span className="text-red font-semibold inline-flex items-center gap-1.5"><i className="live" />Trực tiếp</span>
          <span className="hidden sm:inline">Nha Trang 12°15&apos;N 109°11&apos;E</span>
          <span className="hidden sm:inline-flex items-center gap-2">29°C / Nắng nhẹ</span>
          <TodayStrip />
          <span className="ml-auto inline-flex items-center gap-2">
            <Link href={ROUTES.about} className="hover:text-red">Về chúng tôi</Link>
            <span aria-hidden="true" className="text-ink/30">|</span>
            <Link href={ROUTES.policy} className="hover:text-red">Chính sách</Link>
          </span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-[68px] flex items-center gap-4">
        <Link href="/" className="logo flex items-center shrink-0" aria-label="Ultravel.vn, trang chủ">
          <Image src="/assets/ultravel-wordmark.png" alt="Ultravel.vn" width={981} height={160} sizes="200px" preload className="logo-wm h-[28px] md:h-[32px] w-auto" />
        </Link>

        <nav ref={navRef} id="dnav" aria-label="Menu chính" className="hidden xl:flex relative items-center mx-auto p-1.5 rounded-full">
          <span ref={blobRef} className="nav-blob" aria-hidden="true" />
          {MAIN_NAV.map(item => (
            <div
              key={item.label}
              data-key={item.label}
              className={`nav-item ${item.groups ? 'has-mega' : ''} ${closedKey === item.label ? 'is-closed' : ''}`}
              onPointerLeave={() => closedKey === item.label && setClosedKey(null)}
              onBlur={e => { if (closedKey === item.label && !e.currentTarget.contains(e.relatedTarget as Node)) setClosedKey(null); }}
            >
              <Link className={`nl ${isOn(item.href) ? 'on' : ''}`} href={item.href} aria-haspopup={item.groups ? 'true' : undefined}>
                {item.label}
                {item.groups && <CaretDown className="ico" size={13} weight="bold" aria-hidden="true" />}
              </Link>
              {item.groups && <MegaPanel item={item} onPick={() => setClosedKey(item.label)} />}
            </div>
          ))}
        </nav>

        <div className="ml-auto xl:ml-0 flex items-center gap-2 shrink-0">
          <Link href={ROUTES.contact} className="cta-pill hidden sm:inline-flex">
            <span>Liên hệ</span><span className="cta-dot" aria-hidden="true">→</span>
          </Link>
          <button type="button" onClick={() => setMenuOpen(o => !o)} className="xl:hidden burger-pill mono" aria-label="Mở menu" aria-expanded={menuOpen} aria-controls="mnav">
            {menuOpen ? 'Đóng' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Phone and tablet menu: dropdown entries fold open in place */}
      <nav id="mnav" aria-label="Menu" className={`${menuOpen ? '' : 'hidden'} xl:hidden border-t border-ink max-h-[calc(100dvh-110px)] overflow-y-auto`}>
        {MAIN_NAV.map(item =>
          item.groups ? (
            <details key={item.label} className="mnav-group border-b border-ink">
              <summary className="px-4 py-3 font-semibold flex items-center justify-between">{item.label}<CaretDown size={14} weight="bold" aria-hidden="true" /></summary>
              <div className="px-4 pb-4 grid gap-4 sm:grid-cols-2">
                {item.groups.map(g => (
                  <div key={g.title}>
                    <p className="mega-t">{g.title}</p>
                    <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-[14px]">
                      {g.links.map(l => <li key={l.label}><Link href={l.href} onClick={() => setMenuOpen(false)} className="hover:text-red">{l.label}</Link></li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          ) : (
            <Link key={item.label} className="block px-4 py-3 border-b border-ink font-semibold" href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>
          ),
        )}
        <Link href={ROUTES.contact} className="block px-4 py-3 bg-red text-ink font-semibold" onClick={() => setMenuOpen(false)}>Liên hệ</Link>
      </nav>
    </header>
  );
}
