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
        "inter": [ 'Inter', 'sans-serif' ],
        "cabin": [ 'Cabin Sketch', 'sans-serif' ]
      },
      colors: {
        'lightblack': '#131517'
      },
      keyframes: {
        fadein: {
          '0%': { transform: "scale(0.9)", opacity: 0 },
          '100%': { transform: "scale(1)", opacity: 1 }
        }
      },
      animation: {
        fadein: 'fadein 200ms ease-in-out 1'
      },
      spacing: {
        '1.5': '0.4rem'
      }
    },
  },
  plugins: [],
}