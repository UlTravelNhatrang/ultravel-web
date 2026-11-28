import Image from 'next/image';
import Link from 'next/link';
import { SOCIAL_LINKS } from '@/content/social-links';
import { ROUTES } from '@/lib/routes';

// Orange on navy passes contrast; it marks the hovered link only (orange is an accent, guideline 03).
const linkCls = 'hover:text-orange';

export function Footer() {
  return (
    <footer className="relative bg-navy text-cloud">
      <div className="overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-px bg-cloud/15 rounded-panel overflow-hidden mt-6">
            <div className="col-span-2 md:col-span-5 bg-navy p-6">
              <p className="caption font-semibold">Ultravel® / Cẩm nang thực địa</p>
              <p className="mt-3 text-[16px] text-cloud/80 max-w-[36ch]">Cẩm nang du lịch thực tế từ thổ địa Nha Trang.</p>
              <p className="mt-5 caption text-cloud/75">Tên pháp nhân / MST<br />Địa chỉ / Hotline / Email</p>
            </div>
            <div className="md:col-span-2 bg-navy p-6">
              <h3 className="caption font-semibold mb-4 text-cloud/75">Chuyên mục</h3>
              <ul className="space-y-2 text-sm">
                <li><Link className={linkCls} href={ROUTES.guides}>Cẩm nang</Link></li>
                <li><Link className={linkCls} href={ROUTES.food}>Ẩm thực</Link></li>
                <li><Link className={linkCls} href={ROUTES.places}>Điểm đến</Link></li>
                <li><Link className={linkCls} href={ROUTES.itineraries}>Lịch trình</Link></li>
              </ul>
            </div>
            <div className="md:col-span-2 bg-navy p-6">
              <h3 className="caption font-semibold mb-4 text-cloud/75">Dịch vụ</h3>
              <ul className="space-y-2 text-sm">
                <li><Link className={linkCls} href={ROUTES.services}>Tour &amp; lưu trú</Link></li>
                <li><Link className={linkCls} href={ROUTES.b2b}>Marketing du lịch</Link></li>
                <li><a className={linkCls} href="#">Liên hệ</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-3 bg-navy p-6">
              <h3 className="caption font-semibold mb-4 text-cloud/75">Pháp lý &amp; MXH</h3>
              <ul className="space-y-2 text-sm">
                <li><a className={linkCls} href="#">Về chúng tôi</a></li>
                <li><a className={linkCls} href="#">Chính sách bảo mật</a></li>
                <li><a className={linkCls} href="#">Điều khoản</a></li>
                <li className="flex flex-wrap gap-2 pt-3">
                  {SOCIAL_LINKS.map(s => (
                    <a key={s.name} className="soc" href={s.href} aria-label={`Ultravel trên ${s.name}`}>
                      <svg viewBox="0 0 24 24" width={s.size} height={s.size} aria-hidden="true"><path fill="currentColor" d={s.path} /></svg>
                    </a>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-cloud/20 mt-10">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-10 md:py-14 grid md:grid-cols-[1fr_auto_1fr] items-center gap-8">
            <p className="caption text-cloud/75 text-center md:text-left order-2 md:order-1">
              Cẩm nang du lịch thực tế<br className="hidden md:block" /> từ thổ địa Nha Trang
            </p>
            {/* Reverse wordmark on navy (guideline 03: white is the reverse-logo colour). Untouched: no tint, glow or mask. */}
            <Image src="/assets/ultravel-wordmark-reverse.svg" alt="Ultravel.vn" width={1743} height={272} className="order-1 md:order-2 w-[min(70vw,420px)] h-auto mx-auto my-8" />
            <div className="flex justify-center md:justify-end order-3">
              <a href="#main" className="totop caption"><span>Lên đầu trang</span><i aria-hidden="true">↑</i></a>
            </div>
          </div>
        </div>

        <div className="border-t border-cloud/20 caption flex flex-wrap justify-between gap-2 px-4 md:px-6 py-3 bg-navy relative z-[1]">
          <span>© 2026 Ultravel</span>
          <span className="text-cloud/75">Nha Trang / Khánh Hòa / VN</span>
          <span className="text-cloud/75">Rev 11.26</span>
        </div>
      </div>
    </footer>
  );
}
