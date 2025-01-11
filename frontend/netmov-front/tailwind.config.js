/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#010D1C",
        myOrange: "#F34D29",
      },
    },
  },
  plugins: [],
};
