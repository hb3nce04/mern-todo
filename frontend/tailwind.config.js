/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
import colors from "tailwindcss/colors";
export default {
	darkMode: "selector",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
	theme: {
		extend: {
			colors: {
				primary: colors.sky,
			},
		},
	},
	plugins: [flowbite.plugin()],
};
