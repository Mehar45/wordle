/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-up': 'fadeUp .5s'
      },
      keyframes: {
        fadeUp: {
          "0%": { transform: "translateY(2.5rem)" },
          "100%": { transform: "translateY(0)" },
        }
      }
    },
  },
  plugins: [],
}