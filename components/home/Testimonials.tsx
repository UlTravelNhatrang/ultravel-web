import { TESTIMONIALS } from '@/content/catalog';
import { HomeHead } from './HomeHead';

/** Overall score plus three traveller quotes. */
export function Testimonials() {
  return (
    <section className="wrap hsec" aria-labelledby="tm-t">
      <HomeHead id="tm-t" eyebrow="Du khách nói gì" title={<>Đi theo thổ địa, <em className="it">không bị hớ</em></>} />
      <div className="tgrid">
        <div className="tsum">
          <p className="tsum-n">4,8<small>/5</small></p>
          <p className="mt-3 text-white/80 leading-relaxed">Trung bình từ 2.300+ đánh giá trên Google, Facebook và Zalo.</p>
          <p className="mt-4 text-[#FF8A00] tracking-[.2em]" aria-hidden="true">★★★★★</p>
        </div>
        {TESTIMONIALS.map(t => (
          <figure key={t.name} className="tquote">
            <blockquote>“{t.quote}”</blockquote>
            <figcaption><b>{t.name}</b> · {t.from}<br />{t.trip}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
