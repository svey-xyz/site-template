import type Color from 'colorjs.io/types'
import type { Properties } from 'csstype';
import type { _ColorMap } from './colourMap';
import type { _text } from './text';
import type { _colours } from './colours';

export namespace WEB_THEME_KIT {
	type theme = _theme
	type text = _text
	type colours = _colours
	type ColorMap = _ColorMap
}

type _theme = {
	name: string,
	author?: {}, // TODO: define type
	/**
	 * @colours extendable themes.
	 */
	colours?: _ColorMap,
	text?: _text,
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




