/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./docs/**/*.{md,mdx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
		extend: {
			fontFamily: {
				openSauceTwo: [
					"OpenSauceTwo",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					"Apple Color Emoji",
					"Segoe UI Emoji",
					"Segoe UI Symbol",
					"Noto Color Emoji",
				],
			},
			colors: {
				teal: "#00f2d4",
				darkTeal: "#012229",
				"grey-16": "#02060a",
				"grey-15": "#090b0b",
				"grey-14": "#131515",
				"grey-13": "#161a1a",
				"grey-12": "#1e2323",
				"grey-11": "#252929",
				"grey-10": "#3f4243",
				"grey-9": "#525759",
				"grey-8": "#6e7578",
				"grey-7": "#8c9396",
				"grey-6": "#989ca0",
				"grey-5": "#b3b6b7",
				"grey-4": "#c4c7c8",
				"grey-3": "#cfd4d4",
				"grey-2": "#e3e6e6",
				"grey-1": "#f7f7f7",
				// Todo - Add other colors, secondary teal?
				blue: "#141638",
			},
			spacing: {
				88: "5.5rem",
				164: "10.25rem",
				196: "12.25rem",
			},
			screens: {
				smLarge: "414px",
			},
			keyframes: {
				float: {
					"0%, 100%": { transform: "translateY(-4px)" },
					"50%": { transform: "translateY(4px)" },
				},
			},
			animation: {
				float: "float 3s ease-in-out infinite",
			},
		},
	},
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
