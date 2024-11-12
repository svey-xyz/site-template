import Color from 'colorjs.io'

const themeBuilder = (themeDefinition: THEME.theme) => {
	generateThemeCSS(themeDefinition)
}

export const generateThemeCSS = (theme: THEME.theme): string => {
	const toHSL = (color: Color | undefined) => color ? `${color.hsl.h}deg ${color.hsl.s}% ${color.hsl.l}%` : ''

	const CSSColourVars: string[] = []

	const addColorVars = (colors?: THEME.colours, prefix?: string) => {
		if (!colors) return

		const { fg, bg, accent } = colors
		const stateVars: string[] = []

		if (fg?.primary) stateVars.push(`--primary-fg: ${toHSL(fg.primary)};`)
		if (bg?.primary) stateVars.push(`--primary-bg: ${toHSL(bg.primary)};`)
		if (bg?.secondary) stateVars.push(`--secondary-bg: ${toHSL(bg.secondary)};`)

		if (accent) {
			if (accent.primary) stateVars.push(`--primary-accent: ${toHSL(accent.primary)};`)
			if (accent.secondary) stateVars.push(`--secondary-accent: ${toHSL(accent.secondary)};`)
			if (accent.failure) stateVars.push(`--failure-accent: ${toHSL(accent.failure)};`)
			if (accent.warning) stateVars.push(`--warning-accent: ${toHSL(accent.warning)};`)
			if (accent.success) stateVars.push(`--success-accent: ${toHSL(accent.success)};`)
		}

		if (prefix) {
			// Add theme variables under a class for non-default themes
			CSSColourVars.push(`.${prefix} { ${stateVars.join(' ')} }`)
		} else {
			// Default theme variables in :root
			CSSColourVars.push(`:root { ${stateVars.join(' ')} }`)
		}
	}

	// Iterate through all themes in colours
	if (theme.colours) {
		Object.entries(theme.colours).forEach(([key, value]) => {
			addColorVars(value, key === 'default' ? undefined : key) // No prefix for default theme
		})
	}

	// Additional variables for text, shadow, etc.
	const CSSMiscVars: string[] = []
	if (theme.text?.size?.base) CSSMiscVars.push(`--text-base-size: ${theme.text.size.base};`)
	if (theme.text?.size?.scale) CSSMiscVars.push(`--text-scale: ${theme.text.size.scale};`)
	if (theme.radius?.size) CSSMiscVars.push(`--rounded-size: ${theme.radius.size};`)
	if (theme.radius?.scale) CSSMiscVars.push(`--rounded-scale: ${theme.radius.scale};`)
	if (theme.shadow?.spread) CSSMiscVars.push(`--shadow-spread: ${theme.shadow.spread};`)
	if (theme.shadow?.darkness) CSSMiscVars.push(`--shadow-darkness: ${theme.shadow.darkness};`)



	// Combine base variables with color theme variables
	return `
		${generateShadowUtils(theme.shadow)}

		${CSSColourVars.join('\n')}
		:root {
			${CSSMiscVars.join('\n')}
		}
	`
}

const generateShadowUtils = (shadow: THEME.theme['shadow']) => {
	if (!shadow) return ``

	return (`
		.shadow-extrude {
			box-shadow:
				4px 4px ${shadow.spread}px -${shadow.spread / 2}px rgb(0 0 0 / ${ shadow.darkness }),
				-4px -4px ${shadow.spread}px -${shadow.spread / 2}px rgb(200 200 200 / ${ shadow.darkness });
		}
		.shadow-inner {
			box-shadow: inset 0 0 ${shadow.spread}px 0px rgb(0 0 0 / ${ shadow.darkness });
		}
		.dark {
			.shadow-extrude {
				box-shadow:
					4px 4px ${shadow.spread}px -${shadow.spread / 2}px rgb(0 0 0 / ${shadow.darkness * 1.5}),
					-4px -4px ${shadow.spread}px -${shadow.spread / 2}px rgb(200 200 200 / ${shadow.darkness / 1.5 });
			}
			.shadow-inner {
				box-shadow: inset 0 0 ${shadow.spread * 1.5}px 0px rgb(0 0 0 / ${shadow.darkness * 1.5});
			}
		}
	`)
}