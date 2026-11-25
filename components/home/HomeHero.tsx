import Image from 'next/image';
import { SearchTabs } from './SearchTabs';

const HERO_PHOTO =
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Nha_Trang_skyline.jpg/1280px-Nha_Trang_skyline.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail';

/** Full-bleed photo hero with the tabbed search card overlapping its bottom edge. */
export function HomeHero() {
  return (
    <section className="hh-wrap" aria-labelledby="hh-title">
      <div className="hh">
        <Image src={HERO_PHOTO} alt="" fill preload fetchPriority="high" sizes="(max-width: 1440px) 100vw, 1440px" className="hh-img" />
        <div className="hh-copy">
          <p className="hh-eyebrow">Cẩm nang du lịch từ thổ địa</p>
          <h1 id="hh-title" className="hh-title">Nha Trang chậm lại. <em className="it">Nhớ lâu hơn.</em></h1>
          <p className="hh-sub">Khách sạn, tour và quán ăn đã được người địa phương đi thử, trả tiền thật và ghi rõ ngày kiểm tra giá.</p>
          <p className="hh-proof"><b>4,8/5</b> từ 2.300+ du khách · cập nhật mỗi tuần</p>
        </div>
      </div>
      <div className="hh-search"><SearchTabs /></div>
    </section>
  );
}
