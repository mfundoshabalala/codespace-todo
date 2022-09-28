/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html"],
	theme: {
		extend: {
			animation: {
				"spinner": "spinner 200ms infinite ease-in-out",
				"fadein": "fadein 500ms ease-in-out",
				"fadeout": "fadeout 500ms ease-in-out",
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
				"fadein": {
					"0%": { bottom: 0, opacity: 0, },
					"100%": { bottom: "30px", opacity: 1, }
				},
				"fadeout": {
					"0%": { bottom: "30px", opacity: 1, },
					"100%": { bottom: 0, opacity: 0, },
				},
			},
		},
		plugins: [require("@tailwindcss/forms")],
	},
};
