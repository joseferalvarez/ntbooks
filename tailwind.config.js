/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange-nt': '#FFCBA4',
        'green-nt': '#C5E0DC',
        'red-nt': '#FFB7C5',
        'grey-nt': '#9DB3BE',
        'grey-tr-nt': '#9DB3BE90',
        'blue-nt': '#9CD3D8'
      }
    },
  },
  plugins: [],
}