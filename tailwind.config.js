/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "1.5rem",
			screens: {
				"2xl": "1512px",
			},
		},
		extend: {
			colors: {
				brand: {
					DEFAULT: "#316FEA",
					gray: {
						DEFAULT: "#D3D8DC",
						800: "#060E1E",
						900: "#1A1919",
					},
				},
			},
		},
	},
	plugins: [],
}
