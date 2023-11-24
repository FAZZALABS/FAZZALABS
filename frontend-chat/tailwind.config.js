/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#F5EAA9",
				secondary: "#040026",
				"primary-revert": "#36A834",
				"secondary-revert": "#0D1108",
				"demo-primary": "#354657",
				"demo-secondary": "#7D91AA",
			},
			screens: {
				"3xl": "1920px",
			},
		},
	},
	plugins: [require("tailwind-scrollbar")],
};
