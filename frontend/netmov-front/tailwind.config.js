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
        menuSlideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        menuSlideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        inputSlideIn: {
          "0%": {
            transform: "translateY(-20%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        inputSlideOut: {
          "0%": {
            transform: "translateY(-20)",
            opacity: 1,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 0,
          },
        },
      },
      animation: {
        fadeSlideDown: "slideDown 3s ease-out",
        fadeIn: "fadeIn 0.2s ease-in-out",
        menuIn: "menuSlideIn 300ms ease-out forwards",
        menuOut: "menuSlideOut 300ms ease-out forwards",
        inputSlideIn: "inputSlideIn 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        inputSlideOut: "inputSlideOut 300ms cubic-bezier(0.4, 0, 0.2, 1)",
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
