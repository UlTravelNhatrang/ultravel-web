import { PHOTOS } from './photos';

/**
 * Home hero slides. Shaped like a CMS collection: admins add, remove, reorder or swap the photo
 * and copy of each slide; the hero renders whatever this list holds (one slide = no controls).
 * `accent` is the italic second phrase of the title. Photos: placeholders, replace before launch.
 */
export type HeroSlide = {
  id: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  accent?: string;
  sub: string;
  /** Optional button on the slide (e.g. a campaign). */
  cta?: { label: string; href: string };
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'nha-trang',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Nha_Trang_skyline.jpg/1280px-Nha_Trang_skyline.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
    alt: 'Bờ biển và phố Trần Phú, Nha Trang',
    eyebrow: 'Cẩm nang du lịch từ thổ địa',
    title: 'Nha Trang chậm lại.',
    accent: 'Nhớ lâu hơn.',
    sub: 'Khách sạn, tour và quán ăn đã được người địa phương đi thử, trả tiền thật và ghi rõ ngày kiểm tra giá.',
  },
  {
    id: 'da-lat',
    image: PHOTOS.dest[1],
    alt: 'Quảng trường Lâm Viên, Đà Lạt',
    eyebrow: 'Mùa khô Tây Nguyên',
    title: 'Đà Lạt se lạnh,',
    accent: 'đi đúng mùa.',
    sub: 'Lịch trình 4N3Đ, chỗ ở theo ngân sách và những điểm nên tránh vào cuối tuần.',
  },
  {
    id: 'phu-quoc',
    image: PHOTOS.dest[2],
    alt: 'Bãi biển Phú Quốc',
    eyebrow: 'Đảo ngọc',
    title: 'Phú Quốc biển xanh,',
    accent: 'giá đã kiểm tra.',
    sub: 'Resort, tour cano và hải sản: thổ địa so giá giúp bạn trước khi đặt.',
  },
];
