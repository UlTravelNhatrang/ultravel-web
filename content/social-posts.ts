import { PHOTOS } from './photos';

/**
 * Posts shared from Ultravel's social channels onto the home page. Placeholder content: replace text, numbers
 * and `href` with the real post links (or feed them from the platforms' APIs later).
 */
export type SocialPost = { id: string; platform: 'Facebook' | 'Instagram' | 'TikTok' | 'YouTube' | 'Zalo'; date: string; text: string; likes: string; comments: string; photo: string; href: string };

export const SOCIAL_POSTS: SocialPost[] = [
  { id: 'fb-binh-minh', platform: 'Facebook', date: '26.11.2026', text: 'Bình minh 5h30 ở biển Trần Phú: nước êm, ít người, ánh sáng đẹp nhất trong ngày.', likes: '2,4k', comments: '186', photo: PHOTOS.hub[3], href: '#' },
  { id: 'ig-hon-mun', platform: 'Instagram', date: '24.11.2026', text: 'Hòn Mun mùa nước trong. Đi tàu sớm để lặn trước khi đông khách.', likes: '3,1k', comments: '94', photo: PHOTOS.place3[2], href: '#' },
  { id: 'tt-banh-can', platform: 'TikTok', date: '22.11.2026', text: '30 giây ăn bánh căn ở quán thổ địa hay ngồi: 6 cái, chấm mắm nêm, 35k.', likes: '12k', comments: '420', photo: PHOTOS.food[2], href: '#' },
  { id: 'yt-4-dao', platform: 'YouTube', date: '19.11.2026', text: 'Vlog tour 4 đảo: giá thật, giờ tàu chạy và những gì không có trong tờ quảng cáo.', likes: '1,8k', comments: '132', photo: PHOTOS.tour[1], href: '#' },
  { id: 'zl-thoi-tiet', platform: 'Zalo', date: '17.11.2026', text: 'Cập nhật tuần này: biển lặng, tàu ra đảo chạy bình thường. Nhắn OA để hỏi lịch trình.', likes: '860', comments: '57', photo: PHOTOS.hub[1], href: '#' },
];
