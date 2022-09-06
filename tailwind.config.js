/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html"],
	theme: {
		extend: {
			container: {
				padding: {
					DEFAULT: '1rem',
					sm: '2rem',
					lg: '4rem',
					xl: '5rem',
					'2xl': '6rem',
				},
			},
			backgroundImage: {
				"splash": "url('/public/images/background-image.png')",
				"header-pattern": "url('/public/images/header-pattern.png')",
			},
			animation: {
				"bounce-spin": "bounce-spin 1500ms infinite ease-in-out",
			},
			fontFamily: {
				fira: ["Fira Sans", "sans-serif"],
			},
			keyframes: {
				"bounce-spin": {
					"0%": {
						transform: "translateY(-25%) rotateY(0deg)",
					},
					"50%": {
						transform: "translateY(0) rotateY(180deg)",
					},
					"100%": {
						transform: "translateY(-25%) rotateY(360deg)",
					},
				},
			},
		},
		plugins: [require("@tailwindcss/forms")],
	},
};
