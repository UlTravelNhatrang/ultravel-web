import type { Config } from 'tailwindcss';

// Colours read CSS variables (styles/tokens.css) so opacity modifiers like bg-ink/10 keep working.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.ts'],
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
