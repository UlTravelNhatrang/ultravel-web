import type { Area, Destination, FeedPost, FoodItem, GuideCard, Place, SocialPost, Tour, Voucher } from '@/types/content';
import { PHOTOS } from './photos';

export const VOUCHERS: Voucher[] = [['-15%','Vé VinWonders','ULTRAVEL15','31.12.2026'],['-200K','Combo 3N2Đ','NT200','31.12.2026'],['-10%','Tour 4 đảo','DAO10','15.12.2026'],['+1','Ly cà phê đối tác','CAFE1','30.11.2026']];

/** Tab 01: evergreen guide articles. */
export const GUIDES: GuideCard[] = [['Kinh nghiệm du lịch Nha Trang 2026','Mẹo tiết kiệm'],['Lịch trình 3N2Đ tự túc','Chi tiết từng ngày'],['Thời điểm đẹp nhất để đi','Theo mùa'],['Di chuyển từ sân bay Cam Ranh','Taxi, xe buýt, shuttle']];

/** Tabs 02-04: places to eat, drink and do. */
export const PLACES: Record<1 | 2 | 3, Place[]> = {
1:[['Ốc Tối Trần Phú','Quán ốc','Trung tâm','80-200k',16,1,'Ốc xào me chuẩn vị, đi sau 19h là phải xếp hàng.',150,150,4.4],['Lẩu Mực Biển Xanh','Lẩu mực','Trung tâm','150-300k',15,23,'Nước lẩu thanh, mực tươi giao trong ngày.',120,260,4.5],['Hải sản Vĩnh Hải','Hải sản','Vĩnh Hải','200-400k',10,22,'Chọn hải sản tại bể, hỏi giá trước khi gọi.',170,70,4.2],['Bún sứa Nam Thành','Ăn sáng','Nam Nha Trang','30-50k',6,11,'Tô bún sứa 40k, ăn sáng đúng kiểu dân địa phương.',130,380,4.6]],
2:[['Cà phê Sóng Xanh','Cà phê view biển','Trung tâm','35-60k',6,22,'Ngồi sát biển lúc hoàng hôn, nên đến trước 17h.',160,170,4.5],['Rooftop Sky Lounge','Rooftop','Trung tâm','90-180k',16,2,'Toàn cảnh vịnh về đêm, nên đặt bàn cuối tuần.',130,230,4.3],['Trà chiều Vườn Cau','Trà & bánh','Vĩnh Hải','40-80k',8,21,'Không gian vườn yên tĩnh, hợp ngồi làm việc.',180,60,4.4],['Sinh tố Cô Ba','Nước ép','Nam Nha Trang','20-40k',7,21,'Quán vỉa hè lâu năm, giá bình dân.',140,360,4.1]],
3:[['Tour 4 đảo cano','Tour biển','Trung tâm','Từ 450k',7,16,'Chọn tour có bữa trưa trên đảo, tránh gói dồn khách.',170,200,4.4],['Tắm bùn khoáng','Thư giãn','Nam Nha Trang','Từ 380k',8,19,'Đi buổi sáng để tránh đông, mang theo đồ thay.',120,400,4.3],['Lặn ngắm san hô','Hoạt động nước','Vĩnh Hải','Từ 600k',8,15,'Đi mùa biển lặng (tháng 3 đến 9) để nhìn rõ san hô.',190,90,4.5],['Công viên giải trí','Vui chơi','Vĩnh Hải','Từ 880k',9,21,'Mua vé online qua Ultravel để rẻ hơn quầy.',200,40,4.4]]};

export const AREAS: Area[] = ['Tất cả','Trung tâm','Vĩnh Hải','Nam Nha Trang'];

export const DESTINATIONS: Destination[] = [['Nha Trang',128],['Đà Lạt',86],['Phú Quốc',74],['Quy Nhơn',41],['Đà Nẵng',63],['Hà Nội',57],['Sa Pa',32]];

export const FOOD: FoodItem[] = [['Nem nướng Ninh Hòa','Đặc sản'],['Bún sứa','Ăn sáng'],['Bánh canh chả cá','Món nước'],['Yến sào Khánh Hòa','Quà biếu'],['Hải sản tươi sống','Nhà hàng'],['Cà phê view biển','Cafe']];

/** Bento spans: 6 cols x 2 rows on desktop, 12 cells exactly. */
export const FOOD_SPANS = ['col-span-2 lg:col-span-2 lg:row-span-2 h-80','col-span-2 lg:col-span-2 h-56','col-span-1 h-56','col-span-1 h-56','col-span-2 lg:col-span-2 h-56','col-span-2 lg:col-span-2 h-56'];

export const FEED: FeedPost[] = [['Lịch trình Nha Trang 3 ngày 2 đêm tự túc cho lần đầu','12.11.2026','Hương Nguyễn'],['Ăn gì ở Nha Trang: 15 món nhất định phải thử','10.11.2026','Thổ địa B'],['Kinh nghiệm đi Đà Lạt 4N3Đ','08.11.2026','Thổ địa A'],['Cách mua vé VinWonders rẻ nhất','05.11.2026','Thổ địa C']];

export const FEED_EXCERPT = 'Tóm tắt nội dung bài viết, bổ sung giá, địa chỉ và mẹo thực tế từ thổ địa để bạn quyết định nhanh hơn trước khi lên đường.';

export const TRENDING = ['Lịch trình Nha Trang 3N2Đ','Top quán hải sản','Vé VinWonders 2026','Tour 4 đảo giá bao nhiêu','Đà Lạt tháng 12 có gì'];

export const TOURS: Tour[] = [['Combo 3N2Đ Nha Trang + khách sạn 4 sao','2.990.000đ','3 ngày 2 đêm','Khách sạn sát biển Trần Phú, ăn sáng mỗi ngày',PHOTOS.dest[0]],
  ['Tour 4 đảo trong ngày','450.000đ','Cả ngày','Cano cao tốc, lặn ngắm san hô Hòn Mun',PHOTOS.tour[1]],
  ['Combo VinWonders + xe đưa đón','890.000đ','Cả ngày','Cáp treo vượt biển, xe đón tận khách sạn',PHOTOS.tour[2]],
  ['Tắm bùn khoáng + spa','380.000đ','Nửa ngày','Bùn khoáng nóng, hồ thủy liệu pháp, massage',PHOTOS.tour[3]]];

export const SOCIAL: SocialPost[] = [['FB','@huong.review','Quán nằm trong hẻm nhỏ nhưng hải sản tươi, nước chấm đậm đà. Mình gọi 3 món hết 280k cho hai người, nhân viên nhiệt tình.'],['TT','@minh.dilung','Check-in cà phê view biển lúc hoàng hôn, ghế ngồi thoải mái, đồ uống ổn. Nên đến trước 17h để có chỗ đẹp.'],['IG','@lan.travel','Tour 4 đảo trọn gói, cano đẹp, lặn ngắm san hô rất đã. Lịch trình thoải mái, hợp gia đình có trẻ nhỏ.'],['FB','@nam.phuot','Homestay gần biển, sạch sẽ, chủ nhà chỉ đường ăn uống rất kỹ. Giá hợp lý vào mùa thấp điểm.']];
