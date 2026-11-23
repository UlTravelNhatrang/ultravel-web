import { NavigationArrow, PencilSimpleLine } from '@phosphor-icons/react/dist/ssr';
import { ZaloIcon } from '@/components/ui/ZaloIcon';
import { directionsUrl, zaloUrl } from '@/lib/reviews';
import type { Review } from '@/types/review';

/** Phones only: the three main actions stay within thumb reach at the bottom of the screen. */
export function MobileActionBar({ review: r }: { review: Review }) {
  return (
    <div className="action-bar lg:hidden" role="region" aria-label="Thao tác nhanh">
      <a href={directionsUrl(r)} target="_blank" rel="noopener noreferrer"><NavigationArrow size={18} aria-hidden="true" />Chỉ đường</a>
      <a href={zaloUrl(r.zalo)} target="_blank" rel="noopener noreferrer"><ZaloIcon size={20} />Zalo</a>
      <button type="button" data-open-review className="is-hot"><PencilSimpleLine size={18} aria-hidden="true" />Viết đánh giá</button>
    </div>
  );
}
