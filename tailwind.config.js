/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        opensans: ["Open Sans", "sans-serif"],
      },
      backgroundImage: {
        fondo: "url('./src/assets/images/fondo.png')",
        fondoDark: "url('./src/assets/images/fondoDark.png')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
