import { LICH_TRINH_3N2D } from '@/content/posts/lich-trinh-nha-trang-3-ngay-2-dem';
import type { Post } from '@/types/post';

/** Every published post. Each one is prerendered at build time. */
export const POSTS: Post[] = [LICH_TRINH_3N2D];

export const CATEGORY_PATH: Record<Post['category'], { label: string; href: string }> = {
  'cam-nang': { label: 'Cẩm nang', href: '/cam-nang' },
};

export const postPath = (p: Pick<Post, 'category' | 'slug'>) => `/${p.category}/${p.slug}`;

export const getPost = (slug: string) => POSTS.find(p => p.slug === slug);

/** Link for a post title shown elsewhere (home feed, trending), or undefined while it has no page yet. */
export const postHrefForTitle = (title: string) => {
  const p = POSTS.find(x => x.title === title || x.shortTitle === title);
  return p ? postPath(p) : undefined;
};
