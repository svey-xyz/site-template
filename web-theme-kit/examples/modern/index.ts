import type { WEB_THEME_KIT } from "@types.web-theme-kit/theme";
import Color from "colorjs.io";

export const modern: WEB_THEME_KIT.theme = {
	name: 'base',
	colours: {
		default: {
			fg: {
			}
		},
		dark: {
			fg: {
			}
		},
		light: {
			fg: {
				primary: new Color('#662344')
			}
		}
	},
	shadow: {
		darkness: 0.4,
		spread: 2,
		darkModeMultiplier: 1.8,
		colours: {
			shadow: new Color('#000000'),
			inverse: new Color('#CCCCCC')
		}
	}
}