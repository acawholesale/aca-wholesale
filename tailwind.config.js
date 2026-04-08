/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#000000',
        gold: '#C4962A',
        'gold-light': '#E8B84B',
        'gold-dark': '#9A7520',
        'gold-50': '#FDF8EC',
      },
      // Améliore la visibilité du focus clavier sur fond sombre
      ringColor: {
        DEFAULT: '#ffffff',
      },
      // Border radius scale
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '14px',
        '2xl': '16px',
      },
      // Backdrop blur
      backdropBlur: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '10px',
        'xl': '16px',
      },
      // Animation timing
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '350ms',
        'slower': '450ms',
        'slowest': '650ms',
      },
      // Custom easing
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      // Background colors for glass effects
      backgroundColor: {
        'glass': 'rgba(255,255,255,0.05)',
        'glass-hover': 'rgba(255,255,255,0.08)',
        'card': '#111111',
        'dark': '#0a0500',
      },
      // Border colors
      borderColor: {
        'glass': 'rgba(255,255,255,0.07)',
        'glass-hover': 'rgba(255,255,255,0.15)',
        'gold-subtle': 'rgba(196,150,42,0.25)',
        'gold-medium': 'rgba(196,150,42,0.45)',
        'gold-strong': 'rgba(196,150,42,0.5)',
      },
      // Box shadows
      boxShadow: {
        'gold': '0 16px 40px rgba(196,150,42,0.08)',
        'gold-lg': '0 20px 60px rgba(196,150,42,0.12)',
      },
    },
  },
  plugins: [],
}
