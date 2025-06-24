import { DefaultTailwindConf } from '@root.site-template/web-theme-kit'
import type { Config } from 'tailwindcss'

// const DefaultTailwindConf = require('@root.site-template/web-theme-kit').DefaultTailwindConf

const TailwindConfig = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./lib/**/*.{js,ts,jsx,tsx,mdx}',
		'./styles/**/*.{js,ts,jsx,tsx,mdx,css}',
	],
	darkMode: 'class',
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1200px",
			'2xl': "1440px",
		},
		extend: {
			height: {
				'icon': 'var(--icon-base-size)',
				'icon-sm': 'calc(var(--icon-base-size) * (1 / var(--icon-scale)))',
				'header-item': 'var(--header-item)',
			},
			width: {
				'icon-sm': 'calc(var(--icon-base-size) * (1 / var(--icon-scale)))',
				'icon': 'var(--icon-base-size)',
			},
			maxWidth: {
				'prose-full': '85ch',
				'prose': '65ch',
				'prose-short': '45ch',
			},
			margin: {
				'1/8': '12%', '1/6': '16%', '1/7': '15%', '1/5': '20%', '1/4': '20%', '1/3': '33%'
			},
			fontFamily: {
				heading: ['var(--custom-font)'],
				body: ['var(--custom-font)']
			},
			fontSize: {
				sm: 'calc(var(--text-base-size) * (1 / var(--text-scale)))',
				base: 'var(--text-base-size)',
				xl: 'calc(var(--text-base-size) * (1 + 2 * (var(--text-scale) - 1)))',
				'2xl': 'calc(var(--text-base-size) * (1 + 3 * (var(--text-scale) - 1)))',
				'3xl': 'calc(var(--text-base-size) * (1 + 4 * (var(--text-scale) - 1 )))',
				'4xl': 'calc(var(--text-base-size) * (1 + 5 * (var(--text-scale) - 1 )))',
				'5xl': 'calc(var(--text-base-size) * (1 + 6 * (var(--text-scale) - 1)))',
			},
			borderRadius: {
				'rounded-sm': 'calc(var(--rounded-size) * (1 / var(--rounded-scale)))',
				'rounded': 'calc(var(--rounded-size))',
				'rounded-md': 'calc(var(--rounded-size) * (1 + 2 * (var(--rounded-scale) - 1)))',
				'rounded-lg': 'calc(var(--rounded-size) * (1 + 3 * (var(--rounded-scale) - 1)))',
				'rounded-xl': 'calc(var(--rounded-size) * (1 + 4 * (var(--rounded-scale) - 1)))',
				'rounded-2xl': 'calc(var(--rounded-size) * (1 + 5 * (var(--rounded-scale) - 1)))',
				'rounded-3xl': 'calc(var(--rounded-size) * (1 + 6 * (var(--rounded-scale) - 1)))',
			},
			zIndex: {
				'-1': '-1'
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
		}
	},
	plugins: [
		require('@tailwindcss/typography')
	],
// asd
} satisfies Config

export default TailwindConfig