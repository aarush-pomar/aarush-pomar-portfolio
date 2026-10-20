/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
        bitter: ['Bitter', 'Georgia', 'serif'],
        lato: ['Lato', 'Helvetica', 'Arial', 'sans-serif'],
        newscycle: ['"News Cycle"', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
