import { Star, StarHalf } from '@phosphor-icons/react/dist/ssr';

/** Five stars with halves, in brand orange. Purely visual: pair it with the number. */
export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex text-[rgb(var(--orange))]" aria-hidden="true">
      {[1, 2, 3, 4, 5].map(i => {
        if (value >= i) return <Star key={i} size={size} weight="fill" />;
        if (value >= i - 0.5) return <StarHalf key={i} size={size} weight="fill" />;
        return <Star key={i} size={size} weight="regular" className="opacity-40" />;
      })}
    </span>
  );
}
