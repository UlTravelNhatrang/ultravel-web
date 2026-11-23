import Image from 'next/image';
import { PHOTOS } from '@/content/photos';
import { barcodeStyle } from '@/lib/barcode';

const CODE = 'ULTRAVEL15';

/** Second ad slot, styled as a tear-off coupon. */
export function CouponBanner() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 pt-20 md:pt-28">
      <a href="#" className="coupon group grid sm:grid-cols-[1fr_auto] border border-ink">
        <div className="p-5 md:px-8 flex items-center gap-5">
          <div className="ht w-20 h-20 shrink-0"><Image className="w-full h-full object-cover" src={PHOTOS.place3[3]} alt="" width={80} height={80} sizes="80px" /></div>
          <div>
            <p className="mono text-ink2">Quảng cáo / 970×90</p>
            <p className="hd text-xl md:text-3xl mt-1">Vé VinWonders kèm xe đưa đón: giảm 15%</p>
          </div>
        </div>
        <div className="border-t sm:border-t-0 sm:border-l border-dashed border-ink px-8 py-5 flex flex-col justify-center min-w-[16rem]">
          <p className="mono text-ink2">Mã ưu đãi</p>
          <p className="num text-4xl text-red mt-1">{CODE}</p>
          <div className="barcode mt-2" style={barcodeStyle(CODE)} />
          <span className="mono font-semibold mt-2">Nhận ưu đãi <span className="arr">→</span></span>
        </div>
      </a>
    </section>
  );
}
