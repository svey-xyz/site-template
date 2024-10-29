/** @type {import('tailwindcss').Config} */
// Project specific theme customization
const ACTIVE_THEME =
	process.env.NEXT_PUBLIC_THEME || undefined

let theme
try {
	theme = require(`./theme/${ACTIVE_THEME}/`)
} catch(e) {
	console.log('Unhandled error: ', e)
}

module.exports = {
	darkMode: 'class',
	future: {
		hoverOnlyWhenSupported: true,
	},
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./lib/**/*.{js,ts,jsx,tsx,mdx}',
		'./styles/**/*.{js,ts,jsx,tsx,mdx}',
	],
	presets: [
		require('./styles/site.tailwind.js'),
		theme?.tailwindExt
	].filter(Boolean),
	theme: {
		extend: {
			fontFamily: {
				heading: ['var(--custom-font)'],
				body: ['var(--custom-font)']
			},
			dropShadow: {
				'dark': '0px 0px 12px rgba(0, 0, 0, 0.7)',
				'4xl': [
					'0 35px 35px rgba(0, 0, 0, 0.25)',
					'0 45px 65px rgba(0, 0, 0, 0.15)'
				],
			},
			backgroundImage: {
				'linear-accent-gradient':
					'linear-gradient(to right, var(--primary-accent), var(--secondary-accent))',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			animation: {
				'breathing': 'bounceScale 2s linear infinite',
			},
			keyframes: {
				bounceScale: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.2)' },
				}
			},
		},
	},
}