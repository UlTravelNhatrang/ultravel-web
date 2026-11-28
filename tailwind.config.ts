import type { Config } from 'tailwindcss';

// Colours read CSS variables (styles/tokens.css) so opacity modifiers like bg-navy/10 keep working.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.ts'],
  // Plain words in article text and code ("table", "filter", "transform"…) that Tailwind would otherwise
  // turn into utilities no element uses. Only the bare class is blocked; variants like `sm:inline` still work.
  blocklist: ['container', 'visible', 'static', 'fixed', 'inline', 'table', 'contents', 'shrink', 'transform', 'resize', 'filter'],
  theme: {
    extend: {
      // Brand palette only (Ultravel_Brand_Guideline_V1, 03 Color palette), plus Tailwind's white.
      colors: {
        navy: token('navy'),
        blue: token('blue'),
        orange: token('orange'),
        cloud: token('cloud'),
        ink: token('ink'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      // Guideline 04 hierarchy: H1 Bold 32-48px, H2 Bold 24-32px, H3 SemiBold 18-24px, body Regular 16-18px.
      fontSize: {
        h1: ['clamp(2rem, 1.3rem + 2.2vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        h2: ['clamp(1.5rem, 1.2rem + 1vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '700' }],
        h3: ['clamp(1.125rem, 1rem + 0.5vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.6' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
      },
      borderRadius: {
        // "Bo góc vừa phải": buttons 10px, cards 14px, large panels 16px.
        btn: '10px',
        card: '14px',
        panel: '16px',
      },
    },
  },
  plugins: [],
};

export default config;
