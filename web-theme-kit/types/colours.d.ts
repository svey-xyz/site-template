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

export type _ColorMap = {
	default?: _colours,
	dark?: _colours,
	[key: string]: _colours
}