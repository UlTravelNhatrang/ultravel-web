import Link from 'next/link';
import type { ReactNode } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { BOOKING_TYPES, type BookingKey } from '@/lib/booking';

/** Listing page shell for one Booking type: title, switcher to the other types, and the card grid. */
export function BookingListing({ type, count, children }: { type: BookingKey; count: number; children: ReactNode }) {
  const t = BOOKING_TYPES.find(x => x.key === type)!;
  return (
    <main id="main" className="overflow-x-clip w-full max-w-full">
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 pt-6 md:pt-8">
        <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Booking', href: BOOKING_TYPES[0].href }, { label: t.label }]} />
        <p className="hhead-eyebrow mt-8">Booking</p>
        <h1 className="mega text-h1 mt-3">{t.title}<span className="text-orange">.</span></h1>
        <p className="text-body-lg text-ink/80 mt-4 max-w-[60ch]">{t.intro}</p>
        <nav className="rtabs mt-8" aria-label="Loại dịch vụ">
          {BOOKING_TYPES.map(x => (
            <Link key={x.key} href={x.href} aria-current={x.key === type ? 'page' : undefined} className={`inline-grid place-items-center h-[38px] px-4 rounded-[8px] text-[15px] font-semibold ${x.key === type ? 'bg-navy text-white' : 'text-navy/75 hover:text-navy'}`}>{x.label}</Link>
          ))}
        </nav>
      </section>
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 mt-8 mb-24 md:mb-32" aria-label={t.label}>
        <p className="caption text-ink/70 mb-4">{count} {t.label.toLowerCase()} đã được đi thử</p>
        <div className="grid gap-[14px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
      </section>
    </main>
  );
}
