/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        chalk: '#F9F6EE',
        surface: '#FFFFFF',
        cocoa: {
          DEFAULT: '#3B2219',
          muted: '#6E5247',
        },
        gold: '#D4AF37',
        cotton: '#EE9BB5',
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#1EBE5D',
        },
        status: {
          open: '#2E7D32',
          closed: '#B45309',
        },
      },
      fontFamily: {
        display: ['"Playfair Display SC"', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};