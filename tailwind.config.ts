import type { Config } from 'tailwindcss';

// Colours read CSS variables (styles/tokens.css) so opacity modifiers like bg-ink/10 keep working.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.ts'],
  // Plain words in article text and code ("table", "filter", "transform"…) that Tailwind would otherwise
  // turn into utilities no element uses. Only the bare class is blocked; variants like `sm:inline` still work.
  blocklist: ['container', 'visible', 'static', 'fixed', 'inline', 'table', 'contents', 'shrink', 'transform', 'resize', 'filter'],
  theme: {
    extend: {
      colors: {
        paper: token('paper'),
        paper2: token('paper2'),
        ink: token('ink'),
        ink2: token('ink2'),
        red: token('red'),
        // Darker orange for text on light backgrounds (brand orange is too light to read as text).
        'red-t': token('red-t'),
        deep: token('deep'),
      },
      fontFamily: {
        display: ['var(--font-archivo)', 'Arial Black', 'sans-serif'],
        sans: ['var(--font-vietnam)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
