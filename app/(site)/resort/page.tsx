import type { Metadata } from 'next';
import { BookingListing } from '@/components/booking/BookingListing';
import { HotelCard } from '@/components/cards/Cards';
import { RESORTS } from '@/content/catalog';
import { ROUTES } from '@/lib/routes';

const TITLE = 'Resort Nha Trang đã đi thử | Ultravel';
const DESCRIPTION = 'Resort trên đảo, ven vịnh và Bãi Dài Cam Ranh, giá đã kiểm tra.';

export const metadata: Metadata = { title: TITLE, description: DESCRIPTION, alternates: { canonical: ROUTES.resorts }, openGraph: { title: TITLE, description: DESCRIPTION } };

export default function Page() {
  return (
    <BookingListing type="resort" count={RESORTS.length}>
      {RESORTS.map(h => <HotelCard key={h.slug} h={h} />)}
    </BookingListing>
  );
}
