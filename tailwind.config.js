/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "inter": [ 'Inter', 'sans-serif' ]
      },
      colors: {
        'lightblack': '#131517'
      }
    },
  },
  plugins: [],
}