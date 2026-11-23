import { Fragment } from 'react';
import { BrandWord } from '@/components/ui/BrandWord';
import { AsideNote, SectionHeader } from '@/components/ui/Section';

const STATEMENT = 'Chúng tôi sống và làm du lịch tại Nha Trang. Mỗi quán ăn, mỗi bảng giá trên Ultravel đều được đi thử, chụp lại và ghi ngày kiểm tra.';
const BRAND = 'Ultravel';

const PILLARS = [
  ['Đi thực tế', 'Ăn thật, trả tiền thật, chấm điểm minh bạch.'],
  ['Ghi ngày kiểm tra', 'Giá vé, giờ mở cửa được kiểm tra lại và ghi ngày trên bài.'],
  ['Ưu đãi trực tiếp', 'Voucher và combo thương lượng thẳng với đối tác.'],
  ['Tư vấn 1-1', 'Lên lịch trình riêng qua Zalo, miễn phí.'],
];

export function Method() {
  // Words are split up front so the scroll reveal can darken them one by one.
  const words = STATEMENT.split(/\s+/);
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 pt-20 md:pt-28" aria-labelledby="whyTitle">
      <SectionHeader label="08 — Phương pháp" aside={<AsideNote>Vì sao chọn Ultravel</AsideNote>} />
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mt-8">
        <div className="lg:col-span-7">
          <h2 id="whyTitle" className="sr-only">Vì sao chọn Ultravel</h2>
          <p className="why-statement font-display font-extrabold text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.08] tracking-[-0.03em]">
            {words.map((w, i) => (
              <Fragment key={i}>
                {w === BRAND ? <BrandWord className="w" /> : <span className="w">{w}</span>}
                {i < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </p>
        </div>
        <dl className="lg:col-span-5 border-t-2 border-ink">
          {PILLARS.map(([title, text], i) => (
            <div key={title} className="grid grid-cols-[3.5rem_1fr] gap-4 py-5 border-b border-ink">
              <dt className="num text-3xl text-red">0{i + 1}</dt>
              <dd><p className="hd text-xl">{title}</p><p className="text-sm text-ink2 mt-1.5">{text}</p></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
