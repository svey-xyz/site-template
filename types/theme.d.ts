import type Color from 'colorjs.io/types'
import type { ThemeConfig } from 'tailwindcss/types/config'
import type { Properties } from 'csstype';
import type { NextFont, NextFontWithVariable } from 'next/dist/compiled/@next/font';

export namespace _THEME {
	export type _theme = {
		name: string,
		author?: {}, // TODO: define type
		/**
		 * Override existing blocks or add custom
		 */
		blocks?: BLOCK_MAP,
		tailwindExt?: ThemeConfig | undefined,
		/**
		 * @colours extendable themes.
		 */
		colours?: {
			light?: _colours,
			dark?: _colours,
			[key: string]: _colours | undefined
		},
		text?: _text,
		icon?: {

		},
		shadow?: {
			offset?: {
				x?: Properties["offset"],
				y?: Properties["offset"],
			},
			spread?: Properties["fontSize"],
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

	export interface _text {
		size?: {
			base?: Properties["fontSize"],
			/**
			 * Modifier for size change from base.
			 */
			scale?: number
		},
		font?: NextFont | NextFontWithVariable
	}

	export interface _colours {
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