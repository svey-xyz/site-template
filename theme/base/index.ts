import Color from "colorjs.io";

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
	shadow: {
		darkness: 0.4,
		spread: 2,
		darkModeMultiplier: 1.8
	}
}

export default base;