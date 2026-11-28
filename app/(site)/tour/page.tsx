import type { Metadata } from 'next';
import { BookingListing } from '@/components/booking/BookingListing';
import { TourCard } from '@/components/cards/Cards';
import { TOURS } from '@/content/catalog';
import { ROUTES } from '@/lib/routes';

const TITLE = 'Tour Nha Trang đã đi thử | Ultravel';
const DESCRIPTION = 'Tour đảo, lặn biển, city tour và trải nghiệm địa phương ở Nha Trang, giá đã kiểm tra.';

export const metadata: Metadata = { title: TITLE, description: DESCRIPTION, alternates: { canonical: ROUTES.tours }, openGraph: { title: TITLE, description: DESCRIPTION } };

export default function Page() {
  return (
    <BookingListing type="tour" count={TOURS.length}>
      {TOURS.map(x => <TourCard key={x.slug} t={x} />)}
    </BookingListing>
  );
}
