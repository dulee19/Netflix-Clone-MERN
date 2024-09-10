import tailwindScrollbarHide from 'tailwind-scrollbar-hide'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          'xl': '1280px',
        },
      },
      maxWidth: {
        '6xl': '72rem',
      },
    },
  },
  plugins: [tailwindScrollbarHide],
}