/**
 * "Ultravel" set as the brand mark inside a heading or statement: orange type on a marker swash,
 * with a hand-drawn wave underline. MotionProvider draws the swash and wave in when it scrolls into view.
 */
export function BrandWord({ className = '' }: { className?: string }) {
  return (
    <span className={`brand-word ${className}`.trim()}>
      <span className="brand-bg" aria-hidden="true" />
      <span className="relative">Ultravel<sup aria-hidden="true">®</sup></span>
      <svg className="brand-wave" viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true">
        <path d="M3 9 C28 2 48 2 70 9 S112 16 134 9 S176 2 197 8" pathLength={1} />
      </svg>
    </span>
  );
}
