import type Color from 'colorjs.io/types'
import type { ThemeConfig } from 'tailwindcss/types/config'
import type { Properties } from 'csstype';
import type { NextFont, NextFontWithVariable } from 'next/dist/compiled/@next/font';

export type _THEME = {
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
		light?: themeColours,
		dark?: themeColours,
		[key: string]: themeColours | undefined
	},
	text?: themeText,
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

interface themeText {
	size?: {
		base?: Properties["fontSize"],
		/**
		 * Modifier for size change from base.
		 */
		scale?: number
	},
	font?: NextFont | NextFontWithVariable
}

interface themeColours {
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