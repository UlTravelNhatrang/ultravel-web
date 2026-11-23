import { Photo } from '@/components/ui/Photo';
import { Section, SectionHeader, SectionTitle } from '@/components/ui/Section';
import { SOCIAL } from '@/content/home';
import { PHOTOS } from '@/content/photos';

export function Social() {
  return (
    <Section labelledBy="socTitle">
      <SectionHeader label="09 — Cộng đồng" aside={<a href="#" className="mono font-semibold hover:text-red">#UltravelReview</a>} />
      <SectionTitle id="socTitle">Review từ mạng xã hội</SectionTitle>
      <div id="social" className="grid-ink grid-cols-2 lg:grid-cols-4">
        {SOCIAL.map(([network, handle, quote], k) => (
          <a key={handle} href="#" className="group flex flex-col">
            <Photo src={PHOTOS.social[k]} alt={`Ảnh review của ${handle}`} width={600} height={600} className="aspect-square" />
            <div className="p-4 flex-1 flex flex-col">
              <p className="mono"><span className="bg-ink text-paper px-1.5 py-0.5 mr-2">{network}</span>{handle}</p>
              <p className="text-sm mt-3 line-clamp-4 leading-relaxed">{quote}</p>
              <p className="mono font-semibold mt-auto pt-4 group-hover:text-red">Xem bài gốc <span className="arr">→</span></p>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
