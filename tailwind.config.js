/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'first': 'linear-gradient(250deg, #fdd70069, #154f95be)',
      },
    },
  },
  plugins: [],
} 