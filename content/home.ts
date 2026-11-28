import type { Area, GuideCard, Place } from '@/types/content';

/** Tab 01: evergreen guide articles. */
export const GUIDES: GuideCard[] = [['Kinh nghiệm du lịch Nha Trang 2026','Mẹo tiết kiệm'],['Lịch trình 3N2Đ tự túc','Chi tiết từng ngày'],['Nên đi Nha Trang tháng nào','Theo mùa'],['Di chuyển từ sân bay Cam Ranh','Taxi, xe buýt, shuttle']];

/** Tabs 02-04: places to eat, drink and do. */
export const PLACES: Record<1 | 2 | 3, Place[]> = {
1:[['Ốc Tối Trần Phú','Quán ốc','Trung tâm','80-200k',16,1,'Ốc xào me chuẩn vị, đi sau 19h là phải xếp hàng.',150,150,4.4],['Lẩu Mực Biển Xanh','Lẩu mực','Trung tâm','150-300k',15,23,'Nước lẩu thanh, mực tươi giao trong ngày.',120,260,4.5],['Hải sản Vĩnh Hải','Hải sản','Vĩnh Hải','200-400k',10,22,'Chọn hải sản tại bể, hỏi giá trước khi gọi.',170,70,4.2],['Bún sứa Nam Thành','Ăn sáng','Nam Nha Trang','30-50k',6,11,'Tô bún sứa 40k, ăn sáng đúng kiểu dân địa phương.',130,380,4.6]],
2:[['Cà phê Sóng Xanh','Cà phê view biển','Trung tâm','35-60k',6,22,'Ngồi sát biển lúc hoàng hôn, nên đến trước 17h.',160,170,4.5],['Rooftop Sky Lounge','Rooftop','Trung tâm','90-180k',16,2,'Toàn cảnh vịnh về đêm, nên đặt bàn cuối tuần.',130,230,4.3],['Trà chiều Vườn Cau','Trà & bánh','Vĩnh Hải','40-80k',8,21,'Không gian vườn yên tĩnh, hợp ngồi làm việc.',180,60,4.4],['Sinh tố Cô Ba','Nước ép','Nam Nha Trang','20-40k',7,21,'Quán vỉa hè lâu năm, giá bình dân.',140,360,4.1]],
3:[['Tour 4 đảo cano','Tour biển','Trung tâm','Từ 450k',7,16,'Chọn tour có bữa trưa trên đảo, tránh gói dồn khách.',170,200,4.4],['Tắm bùn khoáng','Thư giãn','Nam Nha Trang','Từ 380k',8,19,'Đi buổi sáng để tránh đông, mang theo đồ thay.',120,400,4.3],['Lặn ngắm san hô','Hoạt động nước','Vĩnh Hải','Từ 600k',8,15,'Đi mùa biển lặng (tháng 3 đến 9) để nhìn rõ san hô.',190,90,4.5],['Công viên giải trí','Vui chơi','Vĩnh Hải','Từ 880k',9,21,'Mua vé online qua Ultravel để rẻ hơn quầy.',200,40,4.4]]};

export const AREAS: Area[] = ['Tất cả','Trung tâm','Vĩnh Hải','Nam Nha Trang'];

