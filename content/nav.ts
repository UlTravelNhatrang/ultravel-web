import { ROUTES } from '@/lib/routes';

// Main menu. Editable content: add a destination to a region, or a type to Booking, and the
// desktop mega menu and the phone menu both pick it up.

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; links: NavLink[] };
export type NavEntry = { label: string; href: string; groups?: NavGroup[] };

/** Destination guides land on the guide archive filtered by place (until each place has its own hub). */
const guide = (name: string): NavLink => ({ label: name, href: `${ROUTES.guides}?noi=${encodeURIComponent(name)}` });

export const GUIDE_REGIONS: NavGroup[] = [
  { title: 'Miền Bắc', links: ['Hà Nội', 'Hạ Long', 'Ninh Bình', 'Sa Pa', 'Hà Giang', 'Hải Phòng', 'Cao Bằng', 'Mộc Châu'].map(guide) },
  { title: 'Miền Trung', links: ['Đà Nẵng', 'Nha Trang', 'Hội An', 'Huế', 'Quy Nhơn', 'Phan Thiết', 'Quảng Bình', 'Phú Yên'].map(guide) },
  { title: 'Miền Nam', links: ['TP. Hồ Chí Minh', 'Phú Quốc', 'Cần Thơ', 'Vũng Tàu', 'Côn Đảo', 'Tây Ninh', 'Bến Tre'].map(guide) },
  { title: 'Tây Nguyên', links: ['Đà Lạt', 'Buôn Ma Thuột', 'Gia Lai', 'Kon Tum', 'Măng Đen'].map(guide) },
  { title: 'Du lịch nước ngoài', links: ['Thái Lan', 'Nhật Bản', 'Hàn Quốc', 'Trung Quốc', 'Singapore', 'Đài Loan', 'Malaysia', 'Bali'].map(guide) },
];

export const BOOKING: NavGroup[] = [
  {
    title: 'Đặt dịch vụ',
    links: [
      { label: 'Tour', href: ROUTES.tours },
      { label: 'Khách sạn', href: ROUTES.hotels },
      { label: 'Resort', href: ROUTES.resorts },
      { label: 'Nhà hàng', href: ROUTES.restaurants },
    ],
  },
];

export const MAIN_NAV: NavEntry[] = [
  { label: 'Cẩm nang du lịch', href: ROUTES.guides, groups: GUIDE_REGIONS },
  { label: 'Booking', href: ROUTES.hotels, groups: BOOKING },
  { label: 'Hợp tác du lịch', href: ROUTES.partner },
  { label: 'Marketing du lịch', href: ROUTES.b2b },
];
