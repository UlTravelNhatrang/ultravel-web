import { HeroSlides } from './HeroSlides';
import { SearchTabs } from './SearchTabs';

/** Full-bleed photo slideshow hero with the tabbed search card overlapping its bottom edge. */
export function HomeHero() {
  return (
    <section className="hh-wrap" aria-labelledby="hh-title">
      <div className="hh">
        <HeroSlides />
        <div className="hh-copy">
          <p className="hh-eyebrow">Cẩm nang du lịch từ thổ địa</p>
          <h1 id="hh-title" className="hh-title">Nha Trang chậm lại. <em className="it">Nhớ lâu hơn.</em></h1>
          <p className="hh-sub">Khách sạn, tour và quán ăn đã được người địa phương đi thử, trả tiền thật và ghi rõ ngày kiểm tra giá.</p>
        </div>
      </div>
      <div className="hh-search"><SearchTabs /></div>
    </section>
  );
}
