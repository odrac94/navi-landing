// Antes vivía inline en cada página para el CDN de Tailwind (cdn.tailwindcss.com).
// Ahora se compila a assets/site.css con `npm run build`.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './es/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0df2f2',
        'primary-dark': '#0bcbcb',
        'background-light': '#f5f8f8',
        'background-dark': '#102222',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        'glass-surface': 'rgba(255, 255, 255, 0.03)',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: { DEFAULT: '0.25rem', lg: '0.5rem', xl: '0.75rem', '2xl': '1rem', full: '9999px' },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom right, #0a192f, #000000)',
        'cyber-grid':
          'linear-gradient(rgba(13, 242, 242, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 242, 242, 0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
};
