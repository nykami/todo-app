/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        '38rem': '38rem',
      },
      fontFamily: {
        custom: ['Neue Haas Grotesk Display Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
