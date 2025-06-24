import type { Config } from 'tailwindcss'

const TailwindConfig = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./lib/**/*.{js,ts,jsx,tsx,mdx}',
		'./styles/**/*.{js,ts,jsx,tsx,mdx,css}',
	],
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
				'icon-sm': 'calc(var(--icon-base-size) * (1 / var(--icon-scale)))'
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
			zIndex: { '-1': '-1' },
			backgroundImage: {
				'linear-accent-gradient':
					'linear-gradient(to right, var(--primary-accent), var(--secondary-accent))',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
		}
	},
} satisfies Config

export default TailwindConfig