import Link from 'next/link';
import type { CSSProperties } from 'react';
import { SOCIAL_LINKS } from '@/content/social-links';
import { ROUTES } from '@/lib/routes';
import { Spotlight } from './Spotlight';

const linkCls = 'hover:text-[#FF9A3C]';

export function Footer() {
  return (
    <footer className="relative bg-deep text-paper">
      <div className="overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-px bg-paper/15 rounded-[26px] overflow-hidden mt-6">
            <div className="col-span-2 md:col-span-5 bg-deep p-6">
              <p className="mono font-semibold">Ultravel® / Cẩm nang thực địa</p>
              <p className="mt-3 text-sm text-paper/70 max-w-[36ch]">Cẩm nang du lịch thực tế từ thổ địa Nha Trang.</p>
              <p className="mt-5 mono text-paper/55">Tên pháp nhân / MST<br />Địa chỉ / Hotline / Email</p>
            </div>
            <div className="md:col-span-2 bg-deep p-6">
              <h4 className="mono font-semibold mb-4 text-paper/60">Chuyên mục</h4>
              <ul className="space-y-2 text-sm">
                <li><Link className={linkCls} href={ROUTES.guides}>Cẩm nang</Link></li>
                <li><Link className={linkCls} href={ROUTES.food}>Ẩm thực</Link></li>
                <li><Link className={linkCls} href={ROUTES.places}>Điểm đến</Link></li>
                <li><Link className={linkCls} href={ROUTES.itineraries}>Lịch trình</Link></li>
              </ul>
            </div>
            <div className="md:col-span-2 bg-deep p-6">
              <h4 className="mono font-semibold mb-4 text-paper/60">Dịch vụ</h4>
              <ul className="space-y-2 text-sm">
                <li><Link className={linkCls} href={ROUTES.services}>Tour &amp; lưu trú</Link></li>
                <li><Link className={linkCls} href={ROUTES.b2b}>Marketing du lịch</Link></li>
                <li><a className={linkCls} href="#">Liên hệ</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-3 bg-deep p-6">
              <h4 className="mono font-semibold mb-4 text-paper/60">Pháp lý &amp; MXH</h4>
              <ul className="space-y-2 text-sm">
                <li><a className={linkCls} href="#">Về chúng tôi</a></li>
                <li><a className={linkCls} href="#">Chính sách bảo mật</a></li>
                <li><a className={linkCls} href="#">Điều khoản</a></li>
                <li className="flex flex-wrap gap-2 pt-3">
                  {SOCIAL_LINKS.map(s => (
                    <a key={s.name} className="soc" href={s.href} aria-label={`Ultravel trên ${s.name}`} style={{ '--brand': s.brand } as CSSProperties}>
                      <svg viewBox="0 0 24 24" width={s.size} height={s.size} aria-hidden="true"><path fill="currentColor" d={s.path} /></svg>
                    </a>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-paper/20 mt-10">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-10 md:py-14 grid md:grid-cols-[1fr_auto_1fr] items-center gap-8">
            <p className="mono text-paper/55 text-center md:text-left order-2 md:order-1">
              Cẩm nang du lịch thực tế<br className="hidden md:block" /> từ thổ địa Nha Trang
            </p>
            <Spotlight />
            <div className="flex justify-center md:justify-end order-3">
              <a href="#main" className="totop mono"><span>Lên đầu trang</span><i aria-hidden="true">↑</i></a>
            </div>
          </div>
        </div>

        <div className="border-t border-paper/20 mono flex flex-wrap justify-between gap-2 px-4 md:px-6 py-3 bg-deep relative z-[1]">
          <span>© 2026 Ultravel</span>
          <span className="text-paper/55">Nha Trang / Khánh Hòa / VN</span>
          <span className="text-paper/55">Rev 11.26</span>
        </div>
      </div>
    </footer>
  );
}
