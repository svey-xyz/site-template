// import type { WEB_THEME_KIT } from "@types.web-theme-kit/theme";
import { createTheme } from "../../lib/createTheme";
import type { _preGeneratedTheme, WEB_THEME_KIT } from "../../types/theme";
import Color from "colorjs.io";

const modernTheme: _preGeneratedTheme = {
	name: 'modern',
	// tailwindCSS: tailwindCSS,
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
	icon: {
		size: {
			base: '1.5rem',	
			scale: 1.2
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
export default modern as WEB_THEME_KIT.theme;