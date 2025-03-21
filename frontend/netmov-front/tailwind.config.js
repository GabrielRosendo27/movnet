/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "75%": { transform: "translateY(-10px)", opacity: "0.01", filter: "blur(4px)" },
          "100%": { transform: "translateY(0)", opacity: "1", filter: "blur(0)" },
        },
      },
      animation: {
        fadeSlideDown: "slideDown 3s ease-out",
      },
      colors: {
        darkBlue: "#010D1C",
        myOrange: "#ea580c",
        myPurple: "#6A48F2",
      },
      backgroundImage: {
        darkGradient: "linear-gradient(to bottom, #010D1C, #000000)",
        grayBackground: "#060D17",
      },
    },
  },
  plugins: [],
};
