import type Color from 'colorjs.io/types'

export type _colours = {
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