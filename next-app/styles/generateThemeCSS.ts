import Color from 'colorjs.io'
import type { Properties } from 'csstype';

type theme = {
	text?: {
		size?: {
			base?: Properties["fontSize"],
			/**
			 * Modifier for size change from base.
			 */
			scale?: number
		},
		font?: {
			className: string;
			style: {
				fontFamily: string;
				fontWeight?: number;
				fontStyle?: string;
			};
			variable?: string;
		};
	},
	icon?: {
		size?: {
			base?: Properties["fontSize"],

			scale?: number
		},
	},
	shadow?: {
		spread: number,
		darkness: number,
		darkModeMultiplier: number,
		colours: {
			shadow: Color,
			/**
			 *
			 *
			 * @type {Color} Used for extrude shadow
			 */
			inverse: Color
		}
	},
	radius?: {
		size?: Properties["borderRadius"],
		/**
		 * Modifier for radius change from base size.
		 */
		scale?: number
	},
}

export const generateThemeCSS = (theme: theme): string => {

	const CSSMiscVars: string[] = []
	if (theme.text?.size?.base) CSSMiscVars.push(`--text-base-size: ${theme.text.size.base};`)
	if (theme.text?.size?.scale) CSSMiscVars.push(`--text-scale: ${theme.text.size.scale};`)
	if (theme.icon?.size?.base) CSSMiscVars.push(`--icon-base-size: ${theme.icon.size.base};`)
	if (theme.icon?.size?.scale) CSSMiscVars.push(`--icon-scale: ${theme.icon.size.scale};`)
	if (theme.radius?.size) CSSMiscVars.push(`--rounded-size: ${theme.radius.size};`)
	if (theme.radius?.scale) CSSMiscVars.push(`--rounded-scale: ${theme.radius.scale};`)

	// Combine theme variables
	return `
		:root {
			${CSSMiscVars.join('\n')}
		}

		${generateShadowUtils(theme.shadow)}
	`
}

const generateShadowUtils = (shadow: theme['shadow']) => {
	if (!shadow) return ``
	const toRGB = (color: Color) => `${color.srgb.r * 255} ${color.srgb.g * 255} ${color.srgb.b * 255}`

	return (`
		.shadow-extrude {
			box-shadow:
				${shadow.spread}px ${shadow.spread}px ${shadow.spread}px -${shadow.spread / 2}px rgb(${toRGB(shadow.colours.shadow)} / ${ shadow.darkness }),
				-${shadow.spread}px -${shadow.spread}px ${shadow.spread}px -${shadow.spread / 2}px rgb(${toRGB(shadow.colours.inverse)} / ${ shadow.darkness });
		}
		.shadow-inner {
			box-shadow: inset 0 0 ${shadow.spread}px 0px rgb(${toRGB(shadow.colours.shadow)} / ${ shadow.darkness });
		}
		.dark {
			.shadow-extrude {
				box-shadow:
					${shadow.spread}px ${shadow.spread}px ${shadow.spread}px -${shadow.spread / 2}px rgb(${toRGB(shadow.colours.shadow)} / ${shadow.darkness * shadow.darkModeMultiplier}),
					-${shadow.spread}px -${shadow.spread}px ${shadow.spread}px -${shadow.spread / 2}px rgb(${toRGB(shadow.colours.inverse)} / ${shadow.darkness / shadow.darkModeMultiplier });
			}
			.shadow-inner {
				box-shadow: inset 0 0 ${shadow.spread * shadow.darkModeMultiplier}px 0px rgb${toRGB(shadow.colours.shadow)} / ${shadow.darkness * shadow.darkModeMultiplier});
			}
		}
	`)
}