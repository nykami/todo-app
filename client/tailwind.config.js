/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        '152': '38rem',
        '160': '40rem',
        '112': '28rem',
      },
      margin: {
        '26': '6.5rem'
      },
      fontFamily: {
        custom: ['Neue Haas Grotesk Display Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
