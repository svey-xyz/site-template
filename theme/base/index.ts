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
		darkness: 0.5,
		spread: 4,
		darkModeMultiplier: 1.5
	}
}

export default base;