'use client'

import { generateThemeCSS } from "@/lib/themeBuilder"
import { base } from "@/theme/base"

export default function Head() {
	const themeCSS = generateThemeCSS(base)
	console.log('Theme CSS: ', themeCSS)
	return (
		<>
			{/* <title>{settings.title}</title> */}
			<style jsx global>{themeCSS}</style>
			<meta content="width=device-width, initial-scale=1"
				name="viewport" />
			<link rel="icon" href="./favicon.ico" />
		</>
	)
}