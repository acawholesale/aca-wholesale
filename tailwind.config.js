/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
    },
  },
  plugins: [],
}
