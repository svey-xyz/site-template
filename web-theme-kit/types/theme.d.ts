import type Color from 'colorjs.io/types'
import type { Properties } from 'csstype';
import type { _text } from './text';
import type { _colours, _ColorMap } from './colours';

export namespace WEB_THEME_KIT {
	type theme = _theme
	type text = _text
	type colours = _colours
	type ColorMap = _ColorMap
}

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type _preGeneratedTheme = Optional<WEB_THEME_KIT.theme, 'CSS' | 'tailwindConf'>;

type _theme = {
	name: string,
	CSS: string,
	author?: {}, // TODO: define type
	/**
	 * @colours extendable themes.
	 */
	colours?: _ColorMap,
	text?: _text,
	icon?: {
		size?: {
			base?: Properties["fontSize"],
			/**
			 * Modifier for size change from base.
			 */
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




