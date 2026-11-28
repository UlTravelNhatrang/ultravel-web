import type { Metadata } from 'next';
import { Check } from '@phosphor-icons/react/dist/ssr';
import { AuditForm } from '@/components/b2b/AuditForm';
import { B2BHero } from '@/components/b2b/B2BHero';
import { Industries } from '@/components/b2b/Industries';
import { B2BSection } from '@/components/b2b/parts';
import { Cases, Pricing, Process } from '@/components/b2b/Sections';
import { Services } from '@/components/b2b/Services';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FaqBoard } from '@/components/ui/FaqBoard';
import { plain } from '@/components/ui/Rich';
import { SectionNav } from '@/components/ui/SectionNav';
import { B2B_FAQ, SERVICES } from '@/content/b2b';
import { ROUTES } from '@/lib/routes';
import { absUrl, breadcrumbLd } from '@/lib/site';

const TITLE = 'Marketing du lịch Nha Trang cho nhà hàng, khách sạn, lữ hành | Ultravel';
const DESCRIPTION = 'SEO Local, Google Maps, review, quảng cáo, website, ấn phẩm và OTA cho doanh nghiệp du lịch Nha Trang. Nhận audit miễn phí.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: ROUTES.b2b },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

const SECTIONS = [
  { id: 'dich-vu', label: 'Dịch vụ' },
  { id: 'theo-nganh', label: 'Theo ngành' },
  { id: 'quy-trinh', label: 'Quy trình' },
  { id: 'ket-qua', label: 'Kết quả' },
  { id: 'bang-gia', label: 'Bảng giá' },
  { id: 'hoi-dap', label: 'Hỏi đáp' },
  { id: 'lien-he', label: 'Nhận audit' },
];

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Marketing du lịch Nha Trang',
    url: absUrl(ROUTES.b2b),
    provider: { '@type': 'Organization', name: 'Ultravel', url: absUrl('/') },
    areaServed: 'Nha Trang, Khánh Hòa',
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Dịch vụ', itemListElement: SERVICES.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.text } })) },
  },
  breadcrumbLd([{ name: 'Trang chủ', path: '/' }, { name: 'Marketing du lịch', path: ROUTES.b2b }]),
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: B2B_FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
  },
];

const PROMISES = ['Kiểm tra Google Maps, website và đánh giá', 'Đề xuất lộ trình 90 ngày kèm KPI', 'Báo giá rõ ràng, không ràng buộc'];

export default function B2BPage() {
  return (
    <>
      <main id="main" className="overflow-x-clip w-full max-w-full">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-4">
          <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Marketing du lịch' }]} />
        </div>
        <B2BHero />

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 mt-8">
          <SectionNav sections={SECTIONS} />
          <Services />
          <B2BSection id="theo-nganh" label="Theo ngành" title="Mỗi ngành, một cách bắt đầu">
            <Industries />
          </B2BSection>
          <Process />
          <Cases />
          <Pricing />
          <B2BSection id="hoi-dap" label="Hỏi đáp" title="Câu hỏi chủ cơ sở hay hỏi">
            <div className="grid lg:grid-cols-12 gap-[var(--card-gap)] items-start">
              <div className="lg:col-span-8">
                <FaqBoard
                  items={B2B_FAQ}
                  byline="Đội Ultravel Marketing"
                  ask={{ title: 'Còn câu hỏi khác?', text: 'Để lại số, chúng tôi gọi lại trong giờ hành chính.', href: '#lien-he', label: 'Để lại thông tin' }}
                />
              </div>
              {/* The trust promise sits beside the questions it answers. */}
              <aside className="lg:col-span-4 b2b-promise">
                <p className="caption text-[#FF8A00]">Cam kết của Ultravel</p>
                <p className=" font-extrabold text-2xl leading-tight tracking-[-0.02em] mt-3">Gói dịch vụ không mua được điểm chấm.</p>
                <p className="text-cloud/75 mt-3 leading-relaxed">Review vẫn do thổ địa đi thực tế và tự trả tiền. Đối tác được thấy nhiều hơn, không được chấm cao hơn.</p>
              </aside>
            </div>
          </B2BSection>
        </div>

        <section id="lien-he" className="b2b-lead rv-sec" aria-labelledby="lien-he-t">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 lg:sticky" style={{ top: 'calc(var(--hh) + 90px)' }}>
              <p className="caption text-[#FF8A00]">Nhận audit</p>
              <h2 id="lien-he-t" className="mega text-h2 mt-4">Audit miễn phí trong 24 giờ<span className="text-[#FF8A00]">.</span></h2>
              <p className="text-cloud/75 mt-5 text-[1.05rem] leading-relaxed max-w-[44ch]">Chúng tôi xem hồ sơ Google Maps, website và hiện diện online của bạn, rồi gửi lại những việc nên làm trước.</p>
              <ul className="grid gap-3 mt-7">
                {PROMISES.map(p => <li key={p} className="flex items-center gap-3"><span className="b2b-check is-light"><Check size={12} weight="bold" aria-hidden="true" /></span>{p}</li>)}
              </ul>
            </div>
            <div className="lg:col-span-7"><AuditForm /></div>
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, '\\u003c') }} />
      </main>
    </>
  );
}
