/** Cẩm nang du lịch archive: destinations grouped by region, as listed in the menu. */
export type Destination = { slug: string; name: string; region: string };
export type Region = { key: string; label: string; places: Destination[] };

/** "Hà Nội" -> "ha-noi" (đ -> d, tone marks removed). */
export const slugify = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const group = (key: string, label: string, names: string[]): Region => ({ key, label, places: names.map(name => ({ slug: slugify(name), name, region: label })) });

export const REGIONS: Region[] = [
  group('mien-bac', 'Miền Bắc', ['Hà Nội', 'Hạ Long', 'Ninh Bình', 'Sa Pa', 'Hà Giang', 'Hải Phòng', 'Cao Bằng', 'Mộc Châu']),
  group('mien-trung', 'Miền Trung', ['Đà Nẵng', 'Nha Trang', 'Hội An', 'Huế', 'Quy Nhơn', 'Phan Thiết', 'Quảng Bình', 'Phú Yên']),
  group('mien-nam', 'Miền Nam', ['TP. Hồ Chí Minh', 'Phú Quốc', 'Cần Thơ', 'Vũng Tàu', 'Côn Đảo', 'Tây Ninh', 'Bến Tre']),
  group('tay-nguyen', 'Tây Nguyên', ['Đà Lạt', 'Buôn Ma Thuột', 'Gia Lai', 'Kon Tum', 'Măng Đen']),
  group('nuoc-ngoai', 'Du lịch nước ngoài', ['Thái Lan', 'Nhật Bản', 'Hàn Quốc', 'Trung Quốc', 'Singapore', 'Đài Loan', 'Malaysia', 'Bali']),
];

export const DESTINATIONS: Destination[] = REGIONS.flatMap(r => r.places);
export const getDestination = (slug: string) => DESTINATIONS.find(d => d.slug === slug);
export const destinationPath = (d: Destination) => `/cam-nang/diem-den/${d.slug}`;
