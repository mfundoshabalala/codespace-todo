/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html"],
	theme: {
		extend: {
			animation: {
				"spinner": "spinner 200ms infinite ease-in-out",
			},
			fontFamily: {
				fira: ["Fira Sans", "sans-serif"],
			},
			keyframes: {
				"spinner": {
					"0%": {
						transform: "rotateY(0deg)",
					},
					"50%": {
						transform: "rotateY(180deg)",
					},
					"100%": {
						transform: "rotateY(360deg)",
					},
				},
			},
		},
		plugins: [require("@tailwindcss/forms")],
	},
};
