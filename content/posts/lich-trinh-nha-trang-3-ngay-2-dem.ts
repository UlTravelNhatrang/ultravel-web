import { PHOTOS } from '@/content/photos';
import type { Post } from '@/types/post';

/**
 * Sample guide post. Times and costs are written as ranges for a first-time visitor;
 * re-check them before publishing and update `updatedAt`.
 */
export const LICH_TRINH_3N2D: Post = {
  slug: 'lich-trinh-nha-trang-3-ngay-2-dem',
  category: 'cam-nang',
  title: 'Lịch trình Nha Trang 3 ngày 2 đêm tự túc cho lần đầu',
  shortTitle: 'Lịch trình Nha Trang 3N2Đ',
  sapo: 'Ba ngày đủ để tắm biển, ra đảo, ăn hải sản và ngắm thành phố từ trên cao mà không phải chạy sô. Lịch dưới đây do thổ địa Ultravel đi lại trong tháng 11, kèm giờ nên đi, chi phí ước tính và những chỗ dễ bị “chặt chém”.',
  cover: { src: PHOTOS.hub[3], alt: 'Bờ biển Nha Trang nhìn từ trên cao', caption: 'Bờ biển Trần Phú buổi sáng' },
  author: { name: 'Hương Nguyễn', initials: 'HN', role: 'Thổ địa Nha Trang', bio: 'Sinh ra ở Vĩnh Hải, dẫn khách và viết về Nha Trang từ 2019. Ăn thử mọi quán trước khi viết, tự trả tiền.' },
  publishedAt: '02.10.2026',
  updatedAt: '12.11.2026',
  readMinutes: 8,
  takeaways: [
    'Chia 3 ngày theo khu: trung tâm và Tháp Bà, các đảo, phía bắc và chợ Đầm',
    'Đi đảo vào ngày thứ 2, khi đã quen chỗ và nắm được thời tiết',
    'Chi phí ước tính 2,5 đến 4 triệu một người, chưa gồm vé máy bay',
  ],
  facts: [
    { label: 'Dành cho', value: 'Lần đầu đến, 2 đến 4 người' },
    { label: 'Mùa đẹp', value: 'Tháng 1 đến tháng 8' },
    { label: 'Di chuyển', value: 'Xe máy thuê hoặc taxi công nghệ' },
    { label: 'Kiểm chứng', value: 'Đi thực tế · 12.11.2026' },
  ],
  sections: [
    {
      id: 'chuan-bi',
      title: 'Trước khi đi',
      blocks: [
        { type: 'p', text: 'Sân bay Cam Ranh cách trung tâm khoảng **35 km**, đi taxi hoặc xe đưa đón mất chừng 40 phút. Nên ở khu **đường Trần Phú hoặc phố Tây** (Biệt Thự, Hùng Vương): gần biển, đi bộ ra quán ăn và dễ bắt xe.' },
        { type: 'list', items: ['Đặt phòng có ban công hướng biển nếu muốn ngắm bình minh, vì biển Nha Trang nhìn về hướng đông.', 'Mang kem chống nắng và áo khoác mỏng cho chuyến cano ra đảo.', 'Tải sẵn bản đồ ngoại tuyến; sóng điện thoại ngoài đảo khá yếu.'] },
        { type: 'note', text: 'Tháng 9 đến tháng 12 là mùa mưa, có ngày tàu ra đảo tạm dừng. Đi mùa này thì để ngày đảo linh hoạt và theo dõi thông báo của cảng.' },
      ],
    },
    {
      id: 'ngay-1',
      title: 'Ngày 1: Biển Trần Phú và Tháp Bà Ponagar',
      blocks: [
        {
          type: 'timeline',
          items: [
            { time: '05:30', title: 'Bình minh ở biển Trần Phú', text: 'Người địa phương tắm biển từ sớm, nước êm và mát. Sau 9 giờ nắng gắt, nên về nghỉ.' },
            { time: '07:30', title: 'Ăn sáng bún chả cá', text: 'Món sáng đặc trưng của Nha Trang. Hỏi thổ địa hoặc xem [mục Ẩm thực](/am-thuc/) để chọn quán gần chỗ ở.' },
            { time: '15:30', title: 'Tháp Bà Ponagar', text: 'Đi buổi chiều cho mát. Mặc quần dài qua gối, khu tháp yêu cầu ăn mặc kín đáo.' },
            { time: '17:30', title: 'Cà phê nhìn sông Cái', text: 'Ngay chân cầu Xóm Bóng có nhiều quán ngồi ngắm thuyền về bến.' },
            { time: '19:00', title: 'Hải sản và chợ đêm', text: 'Hỏi giá theo ký trước khi chọn con, và nhờ quán cân trước mặt.' },
          ],
        },
        { type: 'figure', src: PHOTOS.tour[3], alt: 'Tháp Bà Ponagar, Nha Trang', caption: 'Tháp Bà Ponagar nhìn từ sân trước' },
      ],
    },
    {
      id: 'ngay-2',
      title: 'Ngày 2: Ra đảo',
      blocks: [
        { type: 'p', text: 'Có hai cách: **tour 4 đảo** trọn gói (cano, ăn trưa, lặn ngắm san hô ở Hòn Mun) hoặc tự thuê cano theo nhóm. Đi lần đầu thì tour gọn hơn; nhóm từ 6 người trở lên tự thuê sẽ chủ động giờ giấc.' },
        { type: 'figure', src: PHOTOS.place3[2], alt: 'Hòn Mun, Nha Trang', caption: 'Hòn Mun, điểm lặn ngắm san hô quen thuộc' },
        { type: 'tip', text: 'Chọn chuyến khởi hành trước 8 giờ. Biển buổi sáng lặng, nước trong hơn, và bạn về kịp nghỉ trước bữa tối.' },
        { type: 'p', text: 'Tối về ghé phố Tây ăn nhẹ, hoặc ngồi một quán cà phê nhìn biển như [Cà phê Sóng Xanh](/nha-trang/uong-gi/song-xanh-cafe) mà Ultravel đã chấm điểm.' },
        { type: 'place', review: 'song-xanh-cafe', note: 'Quán được nhắc trong bài' },
      ],
    },
    {
      id: 'ngay-3',
      title: 'Ngày 3: Hòn Chồng, chợ Đầm và ra sân bay',
      blocks: [
        {
          type: 'timeline',
          items: [
            { time: '06:00', title: 'Hòn Chồng', text: 'Đến sớm để tránh đoàn khách và nắng. Bãi đá dễ trượt, đi giày có đế bám.' },
            { time: '08:30', title: 'Chợ Đầm', text: 'Mua quà: nem chua, mực một nắng, yến. Đồ khô nên hỏi giá ở hai ba sạp trước khi mua.' },
            { time: '11:00', title: 'Trả phòng, ăn trưa nem nướng', text: 'Ăn trưa gần khách sạn rồi gọi xe ra sân bay, chừa ít nhất 2 tiếng trước giờ bay.' },
          ],
        },
        { type: 'figure', src: PHOTOS.food[0], alt: 'Nem nướng Nha Trang', caption: 'Nem nướng, bữa trưa trước khi về' },
      ],
    },
    {
      id: 'chi-phi',
      title: 'Chi phí ước tính',
      blocks: [
        { type: 'p', text: 'Tính cho một người, phòng đôi chia hai, đi giữa tuần. Cuối tuần và lễ có thể cao hơn 20 đến 30%.' },
        {
          type: 'table',
          caption: 'Chi phí ước tính cho một người, 3 ngày 2 đêm',
          head: ['Hạng mục', 'Ước tính', 'Ghi chú'],
          rows: [
            ['Khách sạn 3 sao, 2 đêm', '600.000 – 1.200.000đ', 'Chia đôi phòng'],
            ['Ăn uống', '700.000 – 1.200.000đ', 'Có một bữa hải sản'],
            ['Tour 4 đảo', '350.000 – 600.000đ', 'Tùy loại cano'],
            ['Di chuyển trong thành phố', '300.000 – 500.000đ', 'Thuê xe máy hoặc taxi'],
            ['Vé tham quan, cà phê, quà', '500.000 – 800.000đ', ''],
          ],
        },
        { type: 'note', text: 'Đây là mức chi phí tham khảo khi viết bài. Giá vé và giá phòng thay đổi theo mùa, hãy kiểm tra lại trước khi đặt.' },
      ],
    },
  ],
  conclusion: {
    text: 'Ba ngày ở Nha Trang nên chậm: sáng biển, trưa nghỉ, chiều đi chơi, tối ăn. Nếu có thêm một ngày, dành nó cho Vịnh Ninh Vân hoặc tắm bùn khoáng.',
    cta: { label: 'Xem cẩm nang Nha Trang', href: '/cam-nang' },
  },
  faq: [
    { q: 'Nha Trang 3 ngày 2 đêm hết bao nhiêu tiền?', a: 'Khoảng 2,5 đến 4 triệu đồng một người, gồm khách sạn 3 sao, ăn uống, tour đảo và di chuyển, chưa tính vé máy bay.' },
    { q: 'Nên đi tour 4 đảo hay tự thuê cano?', a: 'Lần đầu nên đi tour cho gọn. Nhóm từ 6 người và muốn chủ động giờ giấc thì tự thuê cano sẽ hợp hơn.' },
    { q: 'Có cần thuê xe máy không?', a: 'Không bắt buộc. Trung tâm đi bộ được; Tháp Bà, Hòn Chồng và chợ Đầm đi taxi công nghệ khá rẻ. Thuê xe máy tiện nếu bạn quen chạy xe.' },
  ],
  tags: ['lịch trình Nha Trang', 'du lịch tự túc', 'tour 4 đảo', 'Tháp Bà Ponagar'],
  related: [
    { title: 'Ăn gì ở Nha Trang: 15 món nhất định phải thử', kicker: 'Ẩm thực', photo: PHOTOS.food[1] },
    { title: 'Di chuyển từ sân bay Cam Ranh vào trung tâm', kicker: 'Cẩm nang', photo: PHOTOS.hub[0] },
    { title: 'Cách mua vé VinWonders rẻ nhất', kicker: 'Vui chơi', photo: PHOTOS.place3[3] },
  ],
};
