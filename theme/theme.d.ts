import type Color from 'colorjs.io/types'
import type { Properties } from 'csstype';
import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';

export namespace THEME {
	export type theme = {
		name: string,
		author?: {}, // TODO: define type
		/**
		 * @colours extendable themes.
		 */
		colours?: ColorMapping,
		text?: text,
		icon?: {

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

	export type ColorMapping = {
		default?: colours,
		dark?: colours,
		[key: string]: THEME.colours
	}

	export type text = {
		size?: {
			base?: Properties["fontSize"],
			/**
			 * Modifier for size change from base.
			 */
			scale?: number
		},
		font?: NextFontWithVariable
	}

	export type colours = {
		bg?: {
			primary?: Color,
			secondary?: Color,
		},
		fg?: {
			primary?: Color,
		},
		accent?: {
			primary?: Color,
			secondary?: Color,
			warning?: Color,
			failure?: Color,
			success?: Color,
		}
	}
}