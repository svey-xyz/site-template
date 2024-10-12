/** @type {import('tailwindcss').Config} */
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
				'icon': 'var(--icon-size)',
				'icon-sm': 'var(--icon-size-sm)',
			},
			width: {
				'icon': 'var(--icon-size)',
				'icon-sm': 'var(--icon-size-sm)',
			},
			maxWidth: {
				'prose-full': '85ch',
				'prose': '65ch',
				'prose-short': '45ch',
			},
			margin: {
				'1/8': '12%',
				'1/6': '16%',
				'1/7': '15%',
				'1/5': '20%',
				'1/4': '20%',
				'1/3': '33%'
			},
			colors: {
				bg: {
					primary: 'hsl(var(--primary-bg) / <alpha-value>)',
					DEFAULT: 'hsl(var(--primary-bg) / <alpha-value>)',
					secondary: 'hsl(var(--secondary-bg) / <alpha-value>)',
				},
				fg: {
					primary: 'hsl(var(--primary-fg) / <alpha-value>)',
					DEFAULT: 'hsl(var(--primary-fg) / <alpha-value>)',
					// secondary: 'hsl(var(--secondary-fg) / <alpha-value>)',
				},
				accent: {
					primary: 'hsl(var(--primary-accent) / <alpha-value>)',
					DEFAULT: 'hsl(var(--primary-accent) / <alpha-value>)',
					secondary: 'hsl(var(--secondary-accent) / <alpha-value>)',
					'secondary-dark': 'hsl(var(--secondary-accent-dark) / <alpha-value>)',
					warning: 'hsl(var(--warning-accent) / <alpha-value>)',
					failure: 'hsl(var(--failure-accent) / <alpha-value>)',
					success: 'hsl(var(--primary-accent) / <alpha-value>)',

				}
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
			fontFamily: {
				heading: ['var(--font-fira-code)'],
				body: ['var(--font-fira-code)']
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
			zIndex: {
				'-1': '-1'
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		
	],
}