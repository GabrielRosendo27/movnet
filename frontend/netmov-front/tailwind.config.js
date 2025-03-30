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
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "0.3" },
        },
        menuSlideLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        menuSlideExit: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        fadeSlideDown: "slideDown 3s ease-out",
        fadeIn: "fadeIn 0.2s ease-in-out",
        menuSlideLeft: "menuSlideLeft 300ms ease-out forwards",
        menuSlideExit: "menuSlideExit 300ms ease-out forwards",
      },
      colors: {
        darkBlue: "#010D1C",
        myOrange: "#ea580c",
        myPurple: "#6A48F2",
        myGray: "#060D17",
      },
      backgroundImage: {
        darkGradient: "linear-gradient(to bottom, #010D1C, #000000)",
        grayBackground: "#060D17",
      },
      transitionDuration: {
        2000: "2000ms",
        3000: "3000ms",
      },
    },
  },
  plugins: [],
};
