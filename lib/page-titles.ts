import { POSTS, postPath } from '@/lib/posts';
import { listReviews, reviewPath } from '@/lib/reviews';
import { ROUTES } from '@/lib/routes';

export type PageTitle = { kicker: string; title: string };

/**
 * Words the page-change curtain shows for each known page ("Đang đến · Review" + the place name).
 * Built on the server and passed down, so the client bundle doesn't carry the content modules.
 */
export function pageTitles(): Record<string, PageTitle> {
  const map: Record<string, PageTitle> = {
    '/': { kicker: 'Đang về', title: 'Trang chủ' },
    [ROUTES.guides]: { kicker: 'Đang mở', title: 'Cẩm nang Nha Trang' },
    [ROUTES.b2b]: { kicker: 'Dành cho doanh nghiệp', title: 'Marketing du lịch' },
  };
  for (const r of listReviews()) map[reviewPath(r)] = { kicker: `Review · ${r.kind}`, title: r.name };
  for (const p of POSTS) map[postPath(p)] = { kicker: 'Bài viết', title: p.shortTitle };
  return map;
}
