import type { FaqItem } from './content';

/**
 * Inline text in a post supports two marks, nothing else:
 *   **bold**  and  [link text](/path or https://…)
 */
export type RichText = string;

export type PostBlock =
  | { type: 'p'; text: RichText }
  | { type: 'list'; ordered?: boolean; items: RichText[] }
  | { type: 'figure'; src: string; alt: string; caption: string }
  | { type: 'tip'; text: RichText }
  | { type: 'note'; text: RichText }
  | { type: 'table'; caption: string; head: string[]; rows: string[][] }
  /** A day plan: times down the left, stops on a dotted line. */
  | { type: 'timeline'; items: { time: string; title: string; text: RichText }[] }
  /** Card for a place that has its own review page (by review slug). */
  | { type: 'place'; review: string; note: string };

export type PostSection = { id: string; title: string; blocks: PostBlock[] };

export type RelatedPost = { title: string; kicker: string; photo: string; href?: string };

export type Post = {
  slug: string;
  category: 'cam-nang';
  title: string;
  /** Short title for the breadcrumb and the table of contents header. */
  shortTitle: string;
  sapo: string;
  cover: { src: string; alt: string; caption: string };
  author: { name: string; initials: string; role: string; bio: string };
  publishedAt: string;
  /** dd.mm.yyyy */
  updatedAt: string;
  readMinutes: number;
  takeaways: string[];
  facts: { label: string; value: string }[];
  sections: PostSection[];
  conclusion: { text: string; cta: { label: string; href: string } };
  faq: FaqItem[];
  tags: string[];
  related: RelatedPost[];
};
