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
	...DefaultTailwindConf
// asd
} satisfies Config

export default TailwindConfig