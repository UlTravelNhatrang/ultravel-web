import type { CSSProperties } from 'react';

/** Barcode stripes generated from the code itself, so every coupon looks different. */
export function barcodeStyle(code: string): CSSProperties {
  let x = 0;
  const stops: string[] = [];
  [...code].forEach((ch, i) => {
    const c = ch.charCodeAt(0);
    const bar = 1 + ((c + i) % 3);
    const gap = 1 + ((c * 7 + i) % 3);
    stops.push(`#07327D ${x}px ${x + bar}px`, `transparent ${x + bar}px ${x + bar + gap}px`);
    x += bar + gap;
    if (i % 2) {
      stops.push(`#07327D ${x}px ${x + 1}px`, `transparent ${x + 1}px ${x + 3}px`);
      x += 3;
    }
  });
  return { backgroundImage: `linear-gradient(90deg,${stops.join(',')})`, backgroundSize: `${x}px 100%`, width: x };
}
