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

// Cycles through a photo pool so long lists never run out of pictures. Pools hold Nha Trang photos only.
const pick = (pool: readonly string[], i: number) => pool[i % pool.length];
const STAY_PHOTOS = [...PHOTOS.hub, ...PHOTOS.place2, ...PHOTOS.tour];
const RESORT_PHOTOS = [...PHOTOS.place3, ...PHOTOS.hub, ...PHOTOS.tour];
const TOUR_PHOTOS = [...PHOTOS.tour, ...PHOTOS.place3, ...PHOTOS.hub];
const FOOD_PHOTOS = [...PHOTOS.food, ...PHOTOS.place1, ...PHOTOS.place2, ...PHOTOS.feed];

export const HOTELS: Hotel[] = ([
  ['sea-pearl-tran-phu', 'Sea Pearl Trần Phú', 'Trần Phú, trung tâm', 'Khách sạn', 4, 4.6, 312, 1_250_000, 1_450_000, '-14%'],
  ['champa-boutique', 'Champa Boutique', 'Gần Tháp Bà', 'Khách sạn', 4, 4.4, 141, 980_000, 1_100_000, '-11%'],
  ['vinh-hai-homestay', 'Vĩnh Hải Garden Homestay', 'Vĩnh Hải', 'Homestay', 3, 4.5, 98, 520_000],
  ['bien-xanh-hotel', 'Biển Xanh Hotel', 'Hùng Vương', 'Khách sạn', 3, 4.3, 207, 690_000],
  ['ocean-view-loc-tho', 'Ocean View Lộc Thọ', 'Lộc Thọ', 'Khách sạn', 4, 4.5, 264, 1_150_000, 1_300_000, '-12%'],
  ['nha-trang-central', 'Nha Trang Central', 'Biệt Thự', 'Khách sạn', 3, 4.2, 175, 620_000],
  ['hoa-sua-homestay', 'Hoa Sứ Homestay', 'Phước Hòa', 'Homestay', 2, 4.6, 83, 380_000, undefined, 'Được yêu thích'],
  ['song-cai-riverside', 'Sông Cái Riverside', 'Xóm Bóng', 'Khách sạn', 3, 4.3, 92, 560_000],
  ['tran-phu-sky', 'Trần Phú Sky Hotel', 'Trần Phú, trung tâm', 'Khách sạn', 5, 4.7, 398, 2_200_000, 2_500_000, '-12%'],
  ['pho-tay-boutique', 'Phố Tây Boutique', 'Nguyễn Thiện Thuật', 'Khách sạn', 3, 4.4, 156, 750_000],
  ['cam-ranh-airport-inn', 'Cam Ranh Airport Inn', 'Gần sân bay Cam Ranh', 'Khách sạn', 3, 4.1, 64, 590_000],
  ['hon-chong-view', 'Hòn Chồng View', 'Vĩnh Phước', 'Khách sạn', 4, 4.5, 121, 1_050_000],
  ['la-mer-apartment', 'La Mer Apartment', 'Trần Phú, phía nam', 'Căn hộ', 4, 4.6, 87, 1_400_000],
  ['vinh-luong-guesthouse', 'Vĩnh Lương Guesthouse', 'Vĩnh Lương', 'Nhà nghỉ', 2, 4.2, 45, 320_000],
  ['coral-bay-hotel', 'Coral Bay Hotel', 'Lộc Thọ', 'Khách sạn', 4, 4.4, 233, 1_180_000, 1_350_000, '-13%'],
  ['tam-dao-house', 'Tâm Đảo House', 'Phương Sài', 'Homestay', 3, 4.7, 59, 450_000, undefined, 'Mới'],
] as const).map(([slug, name, area, kind, stars, rating, reviews, price, oldPrice, badge], i) => ({ slug, name, area, kind, stars, rating, reviews, price, oldPrice, badge, photo: pick(STAY_PHOTOS, i) }));

export const RESORTS: Hotel[] = ([
  ['hon-tam-eco-resort', 'Hòn Tằm Eco Resort', 'Đảo Hòn Tằm', 5, 4.8, 186, 3_900_000, undefined, 'Được yêu thích'],
  ['bai-dai-beach-resort', 'Bãi Dài Beach Resort', 'Bãi Dài, Cam Ranh', 5, 4.7, 241, 4_500_000, 5_200_000, '-13%'],
  ['ninh-van-hideaway', 'Ninh Vân Hideaway', 'Vịnh Ninh Vân', 5, 4.9, 132, 7_800_000],
  ['doc-let-sunrise', 'Dốc Lết Sunrise Resort', 'Dốc Lết, Ninh Hòa', 4, 4.5, 167, 1_900_000],
  ['hon-tre-island-retreat', 'Hòn Tre Island Retreat', 'Đảo Hòn Tre', 5, 4.6, 305, 3_400_000, 3_900_000, '-13%'],
  ['cam-ranh-bay-villas', 'Cam Ranh Bay Villas', 'Bãi Dài, Cam Ranh', 5, 4.7, 118, 5_600_000],
  ['vinh-hy-cliff-resort', 'Vĩnh Hy Cliff Resort', 'Gần vịnh Vĩnh Hy', 4, 4.4, 76, 2_300_000],
  ['hon-mun-reef-lodge', 'Hòn Mun Reef Lodge', 'Gần Hòn Mun', 4, 4.5, 64, 2_100_000, undefined, 'Mới'],
  ['tran-phu-pool-resort', 'Trần Phú Pool Resort', 'Trần Phú, phía nam', 4, 4.3, 289, 1_700_000],
  ['diep-son-bungalow', 'Điệp Sơn Bungalow', 'Đảo Điệp Sơn', 3, 4.6, 93, 1_200_000],
  ['ba-ho-forest-resort', 'Ba Hồ Forest Resort', 'Ninh Ích, Ninh Hòa', 4, 4.4, 58, 1_500_000],
  ['ninh-hoa-mud-spa-resort', 'Ninh Hòa Mud Spa Resort', 'Ninh Hòa', 4, 4.5, 142, 1_850_000, 2_100_000, '-12%'],
  ['bai-tranh-hideout', 'Bãi Tranh Hideout', 'Hòn Tre, Bãi Tranh', 4, 4.6, 71, 2_600_000],
  ['cam-lam-garden-resort', 'Cam Lâm Garden Resort', 'Cam Lâm', 4, 4.3, 104, 1_350_000],
  ['hon-thom-villas', 'Hòn Thơm Villas', 'Vịnh Vân Phong', 5, 4.8, 49, 6_200_000, undefined, 'Được yêu thích'],
  ['vinh-luong-seaside', 'Vĩnh Lương Seaside', 'Vĩnh Lương', 3, 4.2, 88, 980_000],
] as const).map(([slug, name, area, stars, rating, reviews, price, oldPrice, badge], i) => ({ slug, name, area, kind: 'Resort', stars, rating, reviews, price, oldPrice, badge, photo: pick(RESORT_PHOTOS, i) }));

export const TOURS: TourItem[] = ([
  ['tour-4-dao-cano', 'Tour 4 đảo cano cao tốc', 'Vịnh Nha Trang', '1 ngày', 'Tối đa 15 khách', 4.7, 420, 450_000, 500_000, '-10%'],
  ['vinwonders-xe-dua-don', 'VinWonders + xe đưa đón', 'Hòn Tre', '1 ngày', 'Tự do', 4.6, 268, 890_000, undefined, 'Bán chạy'],
  ['lan-ngam-san-ho-hon-mun', 'Lặn ngắm san hô Hòn Mun', 'Hòn Mun', 'Nửa ngày', 'Nhóm nhỏ 8 khách', 4.8, 152, 600_000],
  ['city-tour-thap-ba', 'City tour Tháp Bà – chợ Đầm', 'Trung tâm', 'Nửa ngày', 'Tối đa 12 khách', 4.5, 87, 350_000],
  ['vinh-hy-ngam-san-ho', 'Vịnh Vĩnh Hy và tàu đáy kính', 'Ninh Thuận', '1 ngày', 'Tối đa 20 khách', 4.6, 198, 750_000],
  ['diep-son-con-duong-giua-bien', 'Điệp Sơn: con đường giữa biển', 'Vạn Ninh', '1 ngày', 'Tối đa 16 khách', 4.7, 176, 690_000, 790_000, '-13%'],
  ['tam-bun-khoang-thap-ba', 'Tắm bùn khoáng Tháp Bà', 'Ngọc Hiệp', 'Nửa ngày', 'Tự do', 4.4, 233, 320_000],
  ['du-thuyen-hoang-hon', 'Du thuyền ngắm hoàng hôn', 'Vịnh Nha Trang', '3 giờ', 'Tối đa 30 khách', 4.5, 141, 550_000],
  ['binh-ba-dao-tom-hum', 'Bình Ba – đảo tôm hùm', 'Cam Ranh', '1 ngày', 'Tối đa 15 khách', 4.6, 112, 820_000],
  ['yang-bay-thac', 'Thác Yang Bay và suối khoáng', 'Khánh Vĩnh', '1 ngày', 'Tối đa 20 khách', 4.3, 95, 480_000],
  ['dao-khi-hon-lao', 'Đảo Khỉ và suối Hoa Lan', 'Hòn Lao', '1 ngày', 'Tối đa 25 khách', 4.2, 168, 520_000],
  ['chua-long-son-pho-co', 'Chùa Long Sơn và phố cũ', 'Trung tâm', 'Nửa ngày', 'Nhóm nhỏ 6 khách', 4.6, 54, 290_000, undefined, 'Mới'],
  ['cau-ca-dem-vinh', 'Câu mực đêm trên vịnh', 'Vịnh Nha Trang', 'Buổi tối', 'Tối đa 12 khách', 4.5, 77, 450_000],
  ['ninh-van-kayak', 'Chèo kayak vịnh Ninh Vân', 'Ninh Vân', 'Nửa ngày', 'Nhóm nhỏ 8 khách', 4.7, 63, 640_000],
  ['an-sang-xe-may', 'Ăn sáng bằng xe máy', 'Trung tâm', '3 giờ', 'Nhóm nhỏ 4 khách', 4.8, 89, 390_000, undefined, 'Được yêu thích'],
  ['hon-ba-dap-xe', 'Đạp xe ven biển Hòn Chồng', 'Vĩnh Phước', '2 giờ', 'Tối đa 10 khách', 4.4, 41, 250_000],
] as const).map(([slug, title, area, duration, group, rating, reviews, price, oldPrice, badge], i) => ({ slug, title, area, duration, group, rating, reviews, price, oldPrice, badge, photo: pick(TOUR_PHOTOS, i) }));

export const RESTAURANTS: Eatery[] = ([
  ['hai-san-vinh-hai', 'Hải sản Vĩnh Hải', 'Hải sản', 'Vĩnh Hải', '200–400k', 4.6, 176, '10:00–22:00'],
  ['oc-toi-tran-phu', 'Ốc Tối Trần Phú', 'Quán ốc', 'Trung tâm', '80–200k', 4.4, 214, '16:00–01:00'],
  ['bun-cha-ca-nam-beo', 'Bún chả cá Năm Beo', 'Ăn sáng', 'Phước Tiến', '35–50k', 4.5, 302, '06:00–11:00'],
  ['nem-nuong-ninh-hoa-co-ba', 'Nem nướng Ninh Hòa Cô Ba', 'Đặc sản', 'Phương Sài', '50–100k', 4.6, 265, '09:00–21:00'],
  ['banh-can-ba-tu', 'Bánh căn Bà Tư', 'Đặc sản', 'Tô Hiến Thành', '30–60k', 4.5, 188, '15:00–21:00'],
  ['lau-muc-bien-xanh', 'Lẩu mực Biển Xanh', 'Lẩu', 'Lộc Thọ', '150–300k', 4.3, 97, '11:00–23:00'],
  ['bun-sua-nam-thanh', 'Bún sứa Nam Thành', 'Ăn sáng', 'Phan Bội Châu', '35–55k', 4.4, 221, '06:00–12:00'],
  ['nha-hang-cho-dam', 'Nhà hàng Chợ Đầm', 'Cơm Việt', 'Chợ Đầm', '80–180k', 4.2, 143, '10:00–21:30'],
  ['hai-san-cau-da', 'Hải sản Cầu Đá', 'Hải sản', 'Vĩnh Nguyên', '250–500k', 4.5, 132, '10:00–22:00'],
  ['banh-xeo-muc-co-ut', 'Bánh xèo mực Cô Út', 'Đặc sản', 'Phước Hòa', '40–80k', 4.6, 109, '14:00–21:00'],
  ['com-ga-phuong-sai', 'Cơm gà Phương Sài', 'Cơm', 'Phương Sài', '40–70k', 4.3, 86, '10:00–20:00'],
  ['nuong-ngoi-pho-tay', 'Nướng ngói Phố Tây', 'Nướng', 'Biệt Thự', '150–250k', 4.4, 154, '16:00–23:30'],
  ['chay-an-lac', 'Chay An Lạc', 'Món chay', 'Ngô Gia Tự', '40–90k', 4.7, 71, '07:00–21:00'],
  ['bo-ne-hung-vuong', 'Bò né Hùng Vương', 'Ăn sáng', 'Hùng Vương', '45–70k', 4.3, 92, '06:00–11:00'],
  ['ca-chuon-nuong-vinh-luong', 'Cá chuồn nướng Vĩnh Lương', 'Hải sản', 'Vĩnh Lương', '100–200k', 4.5, 58, '10:00–21:00'],
  ['che-mai-huong', 'Chè Mai Hương', 'Tráng miệng', 'Trung tâm', '20–40k', 4.6, 130, '09:00–22:30'],
] as const).map(([slug, name, kind, area, price, rating, reviews, open], i) => ({ slug, name, kind, area, price, rating, reviews, open, photo: pick(FOOD_PHOTOS, i) }));

export const TOP_DESTINATIONS: TopDestination[] = [
  { name: 'Nha Trang', region: 'Khánh Hòa', photo: PHOTOS.dest[0], posts: 128, hotels: 46, tours: 32 },
  { name: 'Đà Lạt', region: 'Lâm Đồng', photo: PHOTOS.dest[1], posts: 86, hotels: 38, tours: 21 },
  { name: 'Phú Quốc', region: 'Kiên Giang', photo: PHOTOS.dest[2], posts: 74, hotels: 41, tours: 18 },
  { name: 'Quy Nhơn', region: 'Bình Định', photo: PHOTOS.dest[3], posts: 41, hotels: 19, tours: 9 },
  { name: 'Đà Nẵng', region: 'Miền Trung', photo: PHOTOS.dest[4], posts: 63, hotels: 35, tours: 24 },
];

export const STORIES: Story[] = [
  { title: 'Lịch trình Nha Trang 3 ngày 2 đêm tự túc cho lần đầu', category: 'Lịch trình', date: '12.11.2026', read: 8, excerpt: 'Ba ngày đủ để tắm biển, ra đảo, ăn hải sản và ngắm thành phố từ trên cao mà không phải chạy sô.', photo: PHOTOS.feed[0] },
  { title: 'Ăn gì ở Nha Trang: 15 món nên thử', category: 'Ẩm thực', date: '10.11.2026', read: 6, excerpt: 'Từ bún sứa, nem nướng Ninh Hòa đến bánh căn: thổ địa chỉ quán và giá đã kiểm tra.', photo: PHOTOS.feed[1] },
  { title: 'Di chuyển từ sân bay Cam Ranh vào trung tâm', category: 'Mẹo', date: '09.11.2026', read: 4, excerpt: 'Taxi, xe buýt, shuttle: giá thực tế và nên chọn gì theo giờ bay.', photo: PHOTOS.hub[3] },
  { title: 'Kinh nghiệm đi Đà Lạt 4N3Đ mùa khô', category: 'Lịch trình', date: '08.11.2026', read: 7, excerpt: 'Lịch trình nhẹ nhàng, chỗ ở theo ngân sách và những điểm nên tránh cuối tuần.', photo: PHOTOS.feed[2] },
  { title: 'So sánh giá vé VinWonders: quầy, đại lý và combo', category: 'Mẹo', date: '05.11.2026', read: 3, excerpt: 'So sánh giá vé tại quầy, đại lý và combo kèm xe đưa đón.', photo: PHOTOS.feed[3] },
];

export const TESTIMONIALS: Testimonial[] = [
  { name: 'Thu Hà', from: 'Hà Nội', trip: 'Lịch trình 3N2Đ', quote: 'Lịch trình chi tiết đến từng giờ, giá ghi đúng như ngoài thực tế. Cả nhà đi theo mà không bị hớ món nào.' },
  { name: 'Minh Khang', from: 'TP.HCM', trip: 'Tour 4 đảo', quote: 'Đặt tour qua Zalo, thổ địa trả lời trong 10 phút và gợi ý tránh giờ đông. Cano đúng giờ, bữa trưa ngon.' },
  { name: 'Lan Phương', from: 'Đà Nẵng', trip: 'Khách sạn Trần Phú', quote: 'Mã giảm giá dùng được ngay, phòng view biển như ảnh. Sẽ quay lại Nha Trang với Ultravel.' },
];

/** "1.250.000đ" */
export const vnd = (n: number) => `${n.toLocaleString('vi-VN')}đ`;
