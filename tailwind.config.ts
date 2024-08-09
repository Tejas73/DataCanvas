import { color } from "d3";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        citrine: '#d7cf07',
        african_violet: '#B279A7',
        carrot_orange:'#F9A03F',
        border_gray: '#C0C0BB'
      },
    },
  },
  plugins: [],
};
