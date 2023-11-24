/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8BD5FF",
        secondary: "#040026",
        "primary-revert": "#36A834",
        "secondary-revert": "#0D1108",
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
