import { PHOTOS } from './photos';

// Sample catalogue shared by the home page and (later) the hotel, tour and listing pages.
// Every name, price and rating here is placeholder data: replace with real data before launch.

export type Offer = { code: string; discount: string; title: string; note: string; expires: string };
export type Hotel = { slug: string; name: string; area: string; kind: string; stars: number; rating: number; reviews: number; price: number; oldPrice?: number; badge?: string; photo: string };
export type TourItem = { slug: string; title: string; area: string; duration: string; group: string; rating: number; reviews: number; price: number; oldPrice?: number; badge?: string; photo: string };
export type Eatery = { slug: string; name: string; kind: string; area: string; price: string; rating: number; reviews: number; open: string; photo: string };
export type TopDestination = { name: string; region: string; photo: string; posts: number; hotels: number; tours: number };
export type Story = { title: string; category: string; date: string; read: number; excerpt: string; photo: string; href?: string };
export type Testimonial = { name: string; from: string; trip: string; quote: string };

export const OFFERS: Offer[] = [
  { code: 'ULTRAVEL15', discount: '-15%', title: 'Vé VinWonders', note: 'Áp dụng vé ngày, mọi độ tuổi', expires: '31.12' },
  { code: 'NT200', discount: '-200K', title: 'Combo 3N2Đ', note: 'Khách sạn 4 sao + xe sân bay', expires: '31.12' },
  { code: 'DAO10', discount: '-10%', title: 'Tour 4 đảo', note: 'Cano cao tốc, ăn trưa trên đảo', expires: '15.12' },
  { code: 'BUN50', discount: '-50K', title: 'Tắm bùn khoáng', note: 'Gói hồ khoáng + massage chân', expires: '20.12' },
  { code: 'STAY12', discount: '-12%', title: 'Khách sạn Trần Phú', note: 'Từ 2 đêm, view biển', expires: '31.01' },
  { code: 'CAFE1', discount: '+1', title: 'Ly cà phê đối tác', note: 'Mua 1 tặng 1 tại 12 quán', expires: '30.11' },
  { code: 'SEA100', discount: '-100K', title: 'Lặn ngắm san hô', note: 'Hòn Mun, có hướng dẫn viên', expires: '15.01' },
  { code: 'CAR8', discount: '-8%', title: 'Xe đưa đón sân bay', note: 'Cam Ranh ⇄ trung tâm, 4–16 chỗ', expires: '31.12' },
];

export const HOTELS: Hotel[] = [
  { slug: 'sea-pearl-tran-phu', name: 'Sea Pearl Trần Phú', area: 'Trần Phú, trung tâm', kind: 'Khách sạn', stars: 4, rating: 4.6, reviews: 312, price: 1_250_000, oldPrice: 1_450_000, badge: '-14%', photo: PHOTOS.hub[0] },
  { slug: 'hon-tam-eco-resort', name: 'Hòn Tằm Eco Resort', area: 'Đảo Hòn Tằm', kind: 'Resort', stars: 5, rating: 4.8, reviews: 186, price: 3_900_000, badge: 'Được yêu thích', photo: PHOTOS.place3[1] },
  { slug: 'vinh-hai-homestay', name: 'Vĩnh Hải Garden Homestay', area: 'Vĩnh Hải', kind: 'Homestay', stars: 3, rating: 4.5, reviews: 98, price: 520_000, photo: PHOTOS.place2[0] },
  { slug: 'champa-boutique', name: 'Champa Boutique', area: 'Gần Tháp Bà', kind: 'Khách sạn', stars: 4, rating: 4.4, reviews: 141, price: 980_000, oldPrice: 1_100_000, badge: '-11%', photo: PHOTOS.tour[0] },
];

export const TOURS: TourItem[] = [
  { slug: 'tour-4-dao-cano', title: 'Tour 4 đảo cano cao tốc', area: 'Vịnh Nha Trang', duration: '1 ngày', group: 'Tối đa 15 khách', rating: 4.7, reviews: 420, price: 450_000, oldPrice: 500_000, badge: '-10%', photo: PHOTOS.tour[1] },
  { slug: 'vinwonders-xe-dua-don', title: 'VinWonders + xe đưa đón', area: 'Hòn Tre', duration: '1 ngày', group: 'Tự do', rating: 4.6, reviews: 268, price: 890_000, badge: 'Bán chạy', photo: PHOTOS.tour[2] },
  { slug: 'lan-ngam-san-ho-hon-mun', title: 'Lặn ngắm san hô Hòn Mun', area: 'Hòn Mun', duration: 'Nửa ngày', group: 'Nhóm nhỏ 8 khách', rating: 4.8, reviews: 152, price: 600_000, photo: PHOTOS.place3[2] },
  { slug: 'city-tour-thap-ba', title: 'City tour Tháp Bà – chợ Đầm', area: 'Trung tâm', duration: 'Nửa ngày', group: 'Tối đa 12 khách', rating: 4.5, reviews: 87, price: 350_000, photo: PHOTOS.tour[3] },
];

export const EATERIES: Eatery[] = [
  { slug: 'song-xanh-cafe', name: 'Sóng Xanh Cafe', kind: 'Cà phê view biển', area: 'Trần Phú', price: '35–80k', rating: 4.5, reviews: 128, open: '06:30–22:00', photo: PHOTOS.place2[3] },
  { slug: 'oc-toi-tran-phu', name: 'Ốc Tối Trần Phú', kind: 'Quán ốc', area: 'Trung tâm', price: '80–200k', rating: 4.4, reviews: 214, open: '16:00–01:00', photo: PHOTOS.place1[0] },
  { slug: 'hai-san-vinh-hai', name: 'Hải sản Vĩnh Hải', kind: 'Hải sản', area: 'Vĩnh Hải', price: '200–400k', rating: 4.6, reviews: 176, open: '10:00–22:00', photo: PHOTOS.place1[2] },
  { slug: 'bun-cha-ca-nam-beo', name: 'Bún chả cá Năm Beo', kind: 'Ăn sáng', area: 'Phước Tiến', price: '35–50k', rating: 4.5, reviews: 302, open: '06:00–11:00', photo: PHOTOS.place1[3] },
];

export const TOP_DESTINATIONS: TopDestination[] = [
  { name: 'Nha Trang', region: 'Khánh Hòa', photo: PHOTOS.dest[0], posts: 128, hotels: 46, tours: 32 },
  { name: 'Đà Lạt', region: 'Lâm Đồng', photo: PHOTOS.dest[1], posts: 86, hotels: 38, tours: 21 },
  { name: 'Phú Quốc', region: 'Kiên Giang', photo: PHOTOS.dest[2], posts: 74, hotels: 41, tours: 18 },
  { name: 'Quy Nhơn', region: 'Bình Định', photo: PHOTOS.dest[3], posts: 41, hotels: 19, tours: 9 },
  { name: 'Đà Nẵng', region: 'Miền Trung', photo: PHOTOS.dest[4], posts: 63, hotels: 35, tours: 24 },
];

export const STORIES: Story[] = [
  { title: 'Lịch trình Nha Trang 3 ngày 2 đêm tự túc cho lần đầu', category: 'Lịch trình', date: '12.11.2026', read: 8, excerpt: 'Ba ngày đủ để tắm biển, ra đảo, ăn hải sản và ngắm thành phố từ trên cao mà không phải chạy sô.', photo: PHOTOS.feed[0] },
  { title: 'Ăn gì ở Nha Trang: 15 món nhất định phải thử', category: 'Ẩm thực', date: '10.11.2026', read: 6, excerpt: 'Từ bún sứa, nem nướng Ninh Hòa đến bánh căn: thổ địa chỉ quán và giá đã kiểm tra.', photo: PHOTOS.feed[1] },
  { title: 'Di chuyển từ sân bay Cam Ranh vào trung tâm', category: 'Mẹo', date: '09.11.2026', read: 4, excerpt: 'Taxi, xe buýt, shuttle: giá thực tế và nên chọn gì theo giờ bay.', photo: PHOTOS.hub[3] },
  { title: 'Kinh nghiệm đi Đà Lạt 4N3Đ mùa khô', category: 'Lịch trình', date: '08.11.2026', read: 7, excerpt: 'Lịch trình nhẹ nhàng, chỗ ở theo ngân sách và những điểm nên tránh cuối tuần.', photo: PHOTOS.feed[2] },
  { title: 'Cách mua vé VinWonders rẻ nhất', category: 'Mẹo', date: '05.11.2026', read: 3, excerpt: 'So sánh giá vé tại quầy, đại lý và combo kèm xe đưa đón.', photo: PHOTOS.feed[3] },
];

export const TESTIMONIALS: Testimonial[] = [
  { name: 'Thu Hà', from: 'Hà Nội', trip: 'Lịch trình 3N2Đ', quote: 'Lịch trình chi tiết đến từng giờ, giá ghi đúng như ngoài thực tế. Cả nhà đi theo mà không bị hớ món nào.' },
  { name: 'Minh Khang', from: 'TP.HCM', trip: 'Tour 4 đảo', quote: 'Đặt tour qua Zalo, thổ địa trả lời trong 10 phút và gợi ý tránh giờ đông. Cano đúng giờ, bữa trưa ngon.' },
  { name: 'Lan Phương', from: 'Đà Nẵng', trip: 'Khách sạn Trần Phú', quote: 'Mã giảm giá dùng được ngay, phòng view biển như ảnh. Sẽ quay lại Nha Trang với Ultravel.' },
];

/** "1.250.000đ" */
export const vnd = (n: number) => `${n.toLocaleString('vi-VN')}đ`;
