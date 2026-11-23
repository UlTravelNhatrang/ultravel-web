import { PHOTOS } from '@/content/photos';
import type { Review } from '@/types/review';

/** Sample review. Text and figures are placeholders until the real visit notes are in. */
export const SONG_XANH_CAFE: Review = {
  slug: 'song-xanh-cafe',
  city: 'nha-trang',
  category: 'uong-gi',
  hubName: 'Cà phê Sóng Xanh',
  name: 'Sóng Xanh Cafe',
  kind: 'Cà phê view biển',

  rating: 4.5,
  reviewCount: 128,
  histogram: [72, 34, 14, 5, 3],
  rank: 3,
  priceLevel: '$$',

  address: 'Đường Trần Phú, phường Lộc Thọ, Nha Trang',
  phone: '0900 000 000',
  zalo: '0900000000',
  website: 'songxanhcafe.vn',
  map: { x: 160, y: 170 },
  hours: [
    { label: 'Thứ 2 – Thứ 6', days: [1, 2, 3, 4, 5], open: '06:30', close: '22:00' },
    { label: 'Thứ 7 – Chủ nhật', days: [6, 0], open: '06:00', close: '23:00' },
  ],

  score: {
    total: 4.5,
    verdict: 'Rất đáng thử',
    checkedAt: '12.11.2026',
    method: 'Đi thực tế 2 lần, ẩn danh, tự trả tiền',
    parts: [
      { label: 'View & không gian', value: 4.9 },
      { label: 'Đồ uống', value: 4.6 },
      { label: 'Phục vụ', value: 4.4 },
      { label: 'Vệ sinh', value: 4.5 },
      { label: 'Giá so với chất lượng', value: 4.0 },
    ],
  },

  intro:
    'Quán nằm sát bờ biển Trần Phú, tầng hai có dãy ghế quay thẳng ra vịnh. Buổi sáng yên, gió mát, hợp ngồi đọc sách hoặc làm việc nhẹ. Từ 17h quán đông dần vì khách đến ngắm hoàng hôn, nên muốn có ghế sát kính thì đến sớm.',
  facts: [
    { label: 'Loại hình', value: 'Cà phê, trà, bánh ngọt' },
    { label: 'Mức giá', value: '35.000 – 80.000đ / người' },
    { label: 'Tiện nghi', value: 'Máy lạnh tầng 2, wifi, giữ xe máy, thanh toán QR' },
    { label: 'Phù hợp', value: 'Cặp đôi, nhóm bạn, làm việc buổi sáng' },
  ],
  tags: ['View biển', 'Hoàng hôn', 'Check-in', 'Có chỗ giữ xe', 'Làm việc được'],
  pros: ['View vịnh thoáng, ghế sát cửa kính tầng 2', 'Cà phê muối pha ổn định, không quá ngọt', 'Nhân viên nhanh, nhắc giờ hoàng hôn cho khách'],
  cons: ['Đông từ 17h đến 18h30, khó có ghế đẹp', 'Bãi xe nhỏ, giờ cao điểm phải gửi bên kia đường', 'Cuối tuần nên nhắn Zalo giữ bàn trước'],

  menu: [
    { item: 'Cà phê muối', note: 'Món nên thử', price: '45.000đ' },
    { item: 'Cà phê sữa đá', price: '35.000đ' },
    { item: 'Bạc xỉu', price: '39.000đ' },
    { item: 'Trà đào cam sả', price: '49.000đ' },
    { item: 'Dừa tươi', note: 'Dừa Bến Tre, lạnh sẵn', price: '40.000đ' },
    { item: 'Sinh tố bơ', price: '55.000đ' },
    { item: 'Croissant bơ', note: 'Ra lò lúc 7h', price: '35.000đ' },
  ],
  menuCheckedAt: '12.11.2026',

  photos: [
    { src: PHOTOS.hub[1], alt: 'Vịnh Nha Trang nhìn từ tầng 2 của quán' },
    { src: PHOTOS.place2[0], alt: 'Khách ngồi ghế nhựa trước quán' },
    { src: PHOTOS.place2[3], alt: 'Ly cà phê sữa đá' },
    { src: PHOTOS.food[5], alt: 'Cà phê sữa đá trên bàn' },
    { src: PHOTOS.place2[2], alt: 'Bộ ấm trà' },
    { src: PHOTOS.hub[3], alt: 'Bờ biển Trần Phú buổi chiều' },
  ],
  photoCount: 24,

  guestReviews: [
    { name: 'Thu Hà', type: 'Cặp đôi', stars: 5, date: '15.11.2026', text: 'Đến lúc 16h30 vẫn còn ghế sát kính. Cà phê muối ngon, hoàng hôn đẹp đúng như hình. Sẽ quay lại.' },
    { name: 'Minh Khang', type: 'Nhóm bạn', stars: 4, date: '10.11.2026', text: 'Không gian rộng, đi nhóm 6 người vẫn có bàn. Đồ uống ổn, giá hơi cao hơn quán trong phố nhưng bù lại view.' },
    { name: 'Lan Phương', type: 'Gia đình', stars: 5, date: '02.11.2026', text: 'Đi buổi sáng với con nhỏ, quán yên và sạch. Nhân viên lấy thêm ghế cho bé, rất dễ thương.' },
    { name: 'Quốc Bảo', type: 'Đi một mình', stars: 4, date: '28.10.2026', text: 'Ngồi làm việc từ 7h đến 10h, wifi ổn, ổ cắm ở dãy ghế trong. Sau 10h nắng chiếu vào hơi nóng.' },
    { name: 'Ngọc Trâm', type: 'Cặp đôi', stars: 3, date: '20.10.2026', text: 'View đẹp nhưng chiều thứ 7 quá đông, chờ đồ uống gần 20 phút. Nên nhắn giữ bàn trước.' },
    { name: 'Hoàng Nam', type: 'Nhóm bạn', stars: 5, date: '14.10.2026', text: 'Chỗ ngắm hoàng hôn đẹp nhất mình tìm được ở Trần Phú. Dừa tươi lạnh, giá hợp lý.' },
    { name: 'Thanh Vy', type: 'Gia đình', stars: 4, date: '06.10.2026', text: 'Bãi xe nhỏ nhưng bảo vệ chỉ chỗ gửi bên kia đường. Bánh croissant buổi sáng còn nóng.' },
  ],
  nearbyFood: [
    { name: 'Ốc Tối Trần Phú', kind: 'Quán ốc', distance: '350 m' },
    { name: 'Lẩu Mực Biển Xanh', kind: 'Lẩu mực', distance: '600 m' },
    { name: 'Bún sứa Nam Thành', kind: 'Ăn sáng', distance: '1,2 km' },
  ],
  nearbySights: [
    { name: 'Bãi biển Trần Phú', kind: 'Bãi tắm', distance: '50 m' },
    { name: 'Tháp Trầm Hương', kind: 'Biểu tượng thành phố', distance: '450 m' },
    { name: 'Chợ Đầm', kind: 'Chợ, đặc sản làm quà', distance: '1,8 km' },
  ],
  faq: [
    { q: 'Mấy giờ đến để có ghế ngắm hoàng hôn?', a: 'Hoàng hôn ở Nha Trang khoảng 17h15 đến 17h45 tùy mùa. Nên đến trước 16h45, nhất là cuối tuần.' },
    { q: 'Có giữ bàn trước được không?', a: 'Được. Nhắn Zalo cho quán tên, số người và giờ đến. Quán giữ bàn 15 phút.' },
    { q: 'Gửi xe ở đâu?', a: 'Quán giữ xe máy miễn phí trước cửa. Giờ cao điểm bảo vệ hướng dẫn gửi ở bãi đối diện, 5.000đ một lượt. Ô tô nên đỗ ở bãi công cộng trên Trần Phú.' },
    { q: 'Ngồi làm việc được không?', a: 'Được vào buổi sáng. Dãy ghế trong tầng 2 có ổ cắm, wifi ổn định. Buổi chiều quán đông và ồn hơn.' },
    { q: 'Có món cho trẻ em không?', a: 'Có nước ép, sinh tố, dừa tươi và bánh ngọt. Quán có ghế cao cho bé nếu hỏi nhân viên.' },
  ],
  voucher: { code: 'SX10', title: 'Giảm 10% tổng bill', terms: 'Đưa mã khi thanh toán. Không áp dụng cùng ưu đãi khác.', expires: '31.12.2026' },
};
