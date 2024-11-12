import type Color from 'colorjs.io/types'
import type { Properties } from 'csstype';
import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';

export namespace _THEME {
	export type _theme = {
		name: string,
		author?: {}, // TODO: define type
		/**
		 * @colours extendable themes.
		 */
		colours?: _ColorMapping,
		text?: _text,
		icon?: {

		},
		shadow?: {
			spread?: number,
			darkness?: number,
			scale?: number
		},
		radius?: {
			size?: Properties["borderRadius"],
			/**
			 * Modifier for radius change from base size.
			 */
			scale?: number
		},
	}

	export type _ColorMapping = {
		default?: _colours,
		dark?: _colours,
		[key: string]: _THEME._colours
	}

	export type _text = {
		size?: {
			base?: Properties["fontSize"],
			/**
			 * Modifier for size change from base.
			 */
			scale?: number
		},
		font?: NextFontWithVariable
	}

	export type _colours = {
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