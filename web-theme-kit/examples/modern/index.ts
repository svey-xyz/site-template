// import type { WEB_THEME_KIT } from "@types.web-theme-kit/theme";
import { createTheme } from "../../lib/createTheme";
import type { WEB_THEME_KIT } from "../../types/theme";

import Color from "colorjs.io";

const modernTheme = {
	name: 'modern',
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

export const modern = createTheme(modernTheme);