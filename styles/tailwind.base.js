/** @type {import('tailwindcss').Config} */
// Cross project base styles

module.exports = {
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
				'header-item': 'var(--header-item)',
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
				'1/8': '12%', '1/6': '16%', '1/7': '15%', '1/5': '20%', '1/4': '20%', '1/3': '33%'
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
				},
				accent: {
					primary: 'hsl(var(--primary-accent) / <alpha-value>)',
					DEFAULT: 'hsl(var(--primary-accent) / <alpha-value>)',
					secondary: 'hsl(var(--secondary-accent) / <alpha-value>)',
					warning: 'hsl(var(--warning-accent) / <alpha-value>)',
					failure: 'hsl(var(--failure-accent) / <alpha-value>)',
					success: 'hsl(var(--primary-accent) / <alpha-value>)',
				}
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
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}