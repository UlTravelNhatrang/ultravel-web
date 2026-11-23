import Image from 'next/image';
import { PHOTOS } from '@/content/photos';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

/** B2B pitch for restaurants, hotels and tour operators. */
export function Partners() {
  return (
    <section className="relative mt-32 md:mt-40 bg-ink text-paper rounded-t-[40px] md:rounded-t-[56px] overflow-hidden" aria-labelledby="b2bTitle">
      <div className="relative max-w-[1440px] mx-auto px-4 md:px-6 grid lg:grid-cols-12">
        <div className="lg:col-span-7 py-14 md:py-20 lg:pr-12">
          <p className="mono text-paper/60 dec">10 — Dành cho doanh nghiệp</p>
          <h2 id="b2bTitle" className="mega text-[clamp(2.4rem,5.4vw,5.4rem)] mt-6">Chủ nhà hàng, khách sạn, lữ hành<span className="text-[#FF9A3C]">?</span></h2>
          <p className="mt-6 text-paper/75 max-w-[50ch] leading-relaxed">Thêm khách bền vững với SEO, Google Maps và review thực tế từ Ultravel.</p>
          <Link href={`${ROUTES.b2b}#bang-gia`} className="bx bx-red mt-9 px-7 py-4 mono text-[12px] font-semibold hover:!bg-paper hover:!text-ink hover:!border-paper">Xem bảng giá dịch vụ <span className="arr">→</span></Link>
        </div>
        <div className="lg:col-span-5 relative min-h-[260px] my-0 lg:my-12 rounded-[26px] overflow-hidden">
          <div className="ht absolute inset-0"><Image className="w-full h-full object-cover" src={PHOTOS.place2[0]} alt="Chủ quán cà phê tại Nha Trang" width={900} height={700} sizes="(max-width: 1023px) 100vw, 40vw" /></div>
          <span className="absolute bottom-3 left-3 z-[2] mono bg-paper text-ink px-2 py-1">Fig. 10 / Đối tác tại Nha Trang</span>
        </div>
      </div>
    </section>
  );
}
