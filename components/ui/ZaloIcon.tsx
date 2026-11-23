import { SOCIAL_LINKS } from '@/content/social-links';

const ZALO = SOCIAL_LINKS.find(s => s.name === 'Zalo')!;

/**
 * The Zalo app mark: the blue chat bubble with the white "Zalo" wordmark (wordmark from Simple Icons, CC0).
 * Brand colours are fixed so it reads as Zalo on any button.
 */
export function ZaloIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <path d="M5.5 1h13A4.5 4.5 0 0 1 23 5.5v10a4.5 4.5 0 0 1-4.5 4.5h-7.4l-4.6 3.1c-.6.4-1.3-.1-1.1-.8l.6-2.3h-.5A4.5 4.5 0 0 1 1 15.5v-10A4.5 4.5 0 0 1 5.5 1Z" fill={ZALO.brand} />
      {/* The wordmark spans 24 × 8.4 units; scaled to 70% and centred in the bubble body. */}
      <path d={ZALO.path} fill="#fff" transform="translate(3.6 2.1) scale(.7)" />
    </svg>
  );
}
