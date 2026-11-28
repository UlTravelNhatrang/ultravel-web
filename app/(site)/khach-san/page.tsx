import type { Metadata } from 'next';
import { BookingListing } from '@/components/booking/BookingListing';
import { HotelCard } from '@/components/cards/Cards';
import { HOTELS } from '@/content/catalog';
import { ROUTES } from '@/lib/routes';

const TITLE = 'Khách sạn Nha Trang đã đi thử | Ultravel';
const DESCRIPTION = 'Khách sạn, homestay và căn hộ ở Nha Trang, giá phòng đã kiểm tra.';

export const metadata: Metadata = { title: TITLE, description: DESCRIPTION, alternates: { canonical: ROUTES.hotels }, openGraph: { title: TITLE, description: DESCRIPTION } };

export default function Page() {
  return (
    <BookingListing type="hotel" count={HOTELS.length}>
      {HOTELS.map(h => <HotelCard key={h.slug} h={h} />)}
    </BookingListing>
  );
}
