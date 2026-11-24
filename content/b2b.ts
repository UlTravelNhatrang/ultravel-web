import { PHOTOS } from '@/content/photos';
import type { FaqItem } from '@/types/content';

// B2B landing ("Marketing du lịch"). Every figure marked SAMPLE must be replaced with real data before launch.

export type ServiceKey = 'seo' | 'maps' | 'media' | 'ads' | 'web' | 'print' | 'ota';

export const SERVICES: { key: ServiceKey; title: string; text: string; fit: string; photo: string }[] = [
  { key: 'maps', title: 'Google Maps', text: 'Tối ưu hồ sơ, ảnh, đánh giá và bài đăng để có thêm cuộc gọi và lượt chỉ đường.', fit: 'Nhà hàng · Cafe · Spa', photo: PHOTOS.place2[0] },
  { key: 'seo', title: 'SEO Local', text: 'Lên top cho từ khóa “quán + khu vực”, viết nội dung và gắn dữ liệu có cấu trúc.', fit: 'Mọi ngành', photo: PHOTOS.hub[0] },
  { key: 'media', title: 'Review & Media', text: 'Review thực tế, ảnh và video ngắn, đăng trên Ultravel và mạng xã hội.', fit: 'Nhà hàng · Khách sạn', photo: PHOTOS.food[0] },
  { key: 'ads', title: 'Quảng cáo', text: 'Google, Facebook, TikTok Ads theo mục tiêu đặt bàn, đặt phòng hoặc lead tour.', fit: 'Mọi ngành', photo: PHOTOS.place3[3] },
  { key: 'web', title: 'Website', text: 'Website và landing page tải nhanh, chuẩn SEO, có nút đặt chỗ và Zalo.', fit: 'Khách sạn · Lữ hành', photo: PHOTOS.hub[2] },
  { key: 'print', title: 'Ấn phẩm', text: 'Menu, poster, standee và banner đồng bộ nhận diện, in xong giao tận nơi.', fit: 'Nhà hàng · Cafe', photo: PHOTOS.place2[3] },
  { key: 'ota', title: 'OTA Setup', text: 'Booking, Agoda, Traveloka, Google Hotels: tạo hồ sơ, ảnh, giá và tối ưu hạng.', fit: 'Khách sạn · Homestay', photo: PHOTOS.place3[1] },
];

export const SERVICE_LABEL: Record<ServiceKey, string> = { seo: 'SEO', maps: 'Maps', media: 'Media', ads: 'Ads', web: 'Website', print: 'Ấn phẩm', ota: 'OTA' };

export const INDUSTRIES = [
  { key: 'food', label: 'Nhà hàng & Cafe', photo: PHOTOS.place2[0], goal: 'Thêm khách vãng lai và lượt đặt bàn', plan: ['maps', 'seo', 'media', 'print'] as ServiceKey[], kpi: 'Lượt chỉ đường, cuộc gọi, đặt bàn qua Zalo' },
  { key: 'stay', label: 'Khách sạn & Homestay', photo: PHOTOS.place3[1], goal: 'Tăng booking trực tiếp, bớt phụ thuộc OTA', plan: ['ota', 'web', 'maps', 'ads'] as ServiceKey[], kpi: 'Booking trực tiếp, công suất phòng, hạng OTA' },
  { key: 'tour', label: 'Lữ hành & Tour', photo: PHOTOS.place3[2], goal: 'Nhiều lead tour và combo hơn với chi phí thấp hơn', plan: ['web', 'seo', 'ads', 'media'] as ServiceKey[], kpi: 'Số lead, chi phí mỗi lead, doanh thu tour' },
];

export const STEPS = [
  { title: 'Audit miễn phí', text: 'Kiểm tra Google Maps, website, đánh giá và đối thủ quanh bạn.', when: '24 giờ' },
  { title: 'Chiến lược & KPI', text: 'Chốt mục tiêu, kênh ưu tiên và lộ trình 90 ngày.', when: 'Tuần 1' },
  { title: 'Triển khai', text: 'Tối ưu hồ sơ, sản xuất nội dung, chạy quảng cáo.', when: 'Tuần 2 – 12' },
  { title: 'Báo cáo & tối ưu', text: 'Báo cáo mỗi tháng bằng số liệu thật, điều chỉnh theo kết quả.', when: 'Hằng tháng' },
];

/** SAMPLE results. */
export const CASES = [
  { who: 'Nhà hàng hải sản, Trần Phú', value: 180, prefix: '+', suffix: '%', metric: 'lượt chỉ đường Google Maps', how: 'Maps + SEO Local + Media', time: '90 ngày', photo: PHOTOS.place1[2] },
  { who: 'Khách sạn boutique, Lộc Thọ', value: 42, prefix: '+', suffix: '%', metric: 'booking trực tiếp', how: 'OTA Setup + Website', time: '4 tháng', photo: PHOTOS.place3[1] },
  { who: 'Đơn vị tour 4 đảo', value: 65, prefix: '+', suffix: '%', metric: 'lead từ tìm kiếm tự nhiên', how: 'SEO + Ads', time: '3 tháng', photo: PHOTOS.place3[2] },
];

/** SAMPLE headline figures. */
export const STATS = [
  { value: 120, suffix: '+', label: 'Đối tác tại Nha Trang' },
  { value: 500, suffix: '+', label: 'Bài review thực tế' },
  { value: 7, suffix: '', label: 'Mảng dịch vụ' },
  { value: 90, suffix: ' ngày', label: 'Lộ trình KPI' },
];

/** Illustrative prices; the official quote follows the audit. */
export const PLANS = [
  { name: 'Maps Starter', price: '3 triệu', unit: '/tháng', from: true, note: 'Cho quán mới, muốn lên bản đồ', items: ['Tối ưu Google Business Profile', '1 bài review trên Ultravel', 'Trả lời đánh giá hằng tuần', 'Báo cáo hằng tháng'], hot: false },
  { name: 'Growth', price: '8 triệu', unit: '/tháng', from: true, note: 'Cho cơ sở muốn tăng khách đều', items: ['SEO Local + Google Maps', '3 bài review + 2 video ngắn', 'Poster hoặc menu cơ bản', 'Báo cáo KPI 90 ngày', 'Zalo hỗ trợ riêng'], hot: true },
  { name: 'Full Stack', price: 'Báo giá riêng', unit: '', from: false, note: 'Cho chuỗi, khách sạn, lữ hành', items: ['SEO + Maps + Media', 'Chạy quảng cáo đa kênh', 'Website hoặc OTA setup', 'Quản lý dự án riêng'], hot: false },
];

export const SINGLE_SERVICES = [
  ['SEO Local & Google Maps', 'Theo tháng', 'Tối thiểu 3 tháng'],
  ['Review & Media', 'Theo bài hoặc video', 'Theo chiến dịch'],
  ['Quảng cáo', 'Phí quản lý + ngân sách quảng cáo', 'Theo tháng'],
  ['Website · Ấn phẩm · OTA', 'Trọn gói theo hạng mục', '7 – 30 ngày'],
];

export const B2B_FAQ: FaqItem[] = [
  { q: 'Bao lâu thì thấy kết quả?', a: 'Google Maps thường có tín hiệu sau 4 đến 8 tuần. SEO cần 3 đến 6 tháng để ổn định.' },
  { q: 'Có cam kết thứ hạng không?', a: 'Không. Thứ hạng do Google quyết định. Chúng tôi cam kết quy trình, khối lượng công việc và báo cáo minh bạch mỗi tháng.' },
  { q: 'Có phải ký hợp đồng dài hạn?', a: 'Gói tháng tối thiểu 3 tháng. Website, ấn phẩm và OTA tính trọn gói theo hạng mục.' },
  { q: 'Bài review trên Ultravel có bị “tô hồng” không?', a: 'Không. Điểm chấm vẫn do thổ địa đi thực tế. Gói dịch vụ không mua được điểm số, chỉ giúp quán được thấy nhiều hơn.' },
  { q: 'Ultravel có hỗ trợ ngoài Nha Trang?', a: 'Hiện tập trung Nha Trang – Khánh Hòa. Dự án ở tỉnh khác có thể nhận theo từng trường hợp.' },
];

export const BUDGETS = ['Dưới 5 triệu', '5 – 15 triệu', 'Trên 15 triệu', 'Chưa rõ'];
