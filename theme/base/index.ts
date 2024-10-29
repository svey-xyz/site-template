import Color from "colorjs.io";
import Tailwind from "./theme.tailwind"

const base: THEME.theme = {
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
	tailwindExt: Tailwind,
}

export default base;