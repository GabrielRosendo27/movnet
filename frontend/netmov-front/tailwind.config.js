/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#010D1C",
        myOrange: "#F34D29",
        myPurple: "#6A48F2",
      },
      backgroundImage: {
        darkGradient: "linear-gradient(to bottom, #010D1C, #000000)", // Gradiente personalizado
      },
    },
  },
  plugins: [],
};
