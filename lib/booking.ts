import { ROUTES } from './routes';

/** Booking listing pages, in menu order. */
export const BOOKING_TYPES = [
  { key: 'tour', label: 'Tour', href: ROUTES.tours, title: 'Tour Nha Trang', intro: 'Tour đảo, lặn biển, city tour và trải nghiệm địa phương. Giá và lịch trình do thổ địa đi thử.' },
  { key: 'hotel', label: 'Khách sạn', href: ROUTES.hotels, title: 'Khách sạn Nha Trang', intro: 'Khách sạn, homestay và căn hộ gần biển hoặc trung tâm, kèm giá phòng đã kiểm tra.' },
  { key: 'resort', label: 'Resort', href: ROUTES.resorts, title: 'Resort Nha Trang', intro: 'Resort trên đảo, ven vịnh và Bãi Dài Cam Ranh cho kỳ nghỉ dài ngày.' },
] as const;
export type BookingKey = (typeof BOOKING_TYPES)[number]['key'];
