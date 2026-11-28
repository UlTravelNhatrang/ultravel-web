import { FaqBoard } from '@/components/ui/FaqBoard';
import { zaloUrl } from '@/lib/reviews';
import type { Review } from '@/types/review';
import { ReviewSection } from './ReviewSection';

/** The place's Q&A, answered by Ultravel's local; unanswered questions go to the café on Zalo. */
export function Faq({ review: r }: { review: Review }) {
  return (
    <ReviewSection id="hoi-dap" title="Hỏi & đáp" aside={<span className="caption text-ink/70">{r.faq.length} câu · thổ địa trả lời</span>}>
      <FaqBoard
        items={r.faq}
        byline={`Thổ địa Ultravel · đã kiểm tra ${r.score.checkedAt}`}
        ask={{ title: 'Chưa thấy câu bạn cần?', text: 'Nhắn thẳng cho quán qua Zalo, thường trả lời trong giờ mở cửa.', href: zaloUrl(r.zalo), label: 'Hỏi quán qua Zalo' }}
      />
    </ReviewSection>
  );
}
