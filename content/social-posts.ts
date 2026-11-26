import { PHOTOS } from './photos';

/**
 * Posts shared from Ultravel's social channels onto the home page. Editable list (CMS-shaped):
 * paste the post URL, a photo and the caption; newest first. Placeholder data, replace before launch.
 */
export type SocialPost = {
  id: string;
  network: 'Facebook' | 'Instagram' | 'TikTok' | 'YouTube';
  href: string;
  photo: string;
  caption: string;
  date: string;
  /** Short engagement line, e.g. "2,4K lượt thích". */
  stat: string;
};

export const SOCIAL_POSTS: SocialPost[] = [
  { id: 'fb-hai-san', network: 'Facebook', href: '#', photo: PHOTOS.social[0], caption: 'Đi chợ hải sản cùng thổ địa: hỏi giá theo ký, nhờ cân trước mặt, không bao giờ bị hớ.', date: '22.11.2026', stat: '2,4K lượt thích' },
  { id: 'ig-ca-phe', network: 'Instagram', href: '#', photo: PHOTOS.social[1], caption: 'Ba quán cà phê view biển Trần Phú mở từ 6h sáng, ngồi đón bình minh chỉ 35k.', date: '20.11.2026', stat: '1,8K lượt thích' },
  { id: 'tt-hon-mun', network: 'TikTok', href: '#', photo: PHOTOS.social[2], caption: 'Lặn ngắm san hô Hòn Mun: đi tháng mấy nước trong nhất, mang gì theo?', date: '18.11.2026', stat: '56K lượt xem' },
  { id: 'yt-bo-bien', network: 'YouTube', href: '#', photo: PHOTOS.social[3], caption: 'Một vòng bờ biển Nha Trang lúc hoàng hôn, từ Hòn Chồng đến cảng Cầu Đá.', date: '15.11.2026', stat: '12K lượt xem' },
  { id: 'fb-lich-trinh', network: 'Facebook', href: '#', photo: PHOTOS.feed[0], caption: 'Lịch trình 3N2Đ cho lần đầu đến Nha Trang, đã cập nhật giá tháng 11.', date: '12.11.2026', stat: '3,1K lượt thích' },
];
