import type { _colours } from "./colours"

export type _ColorMap = {
	default?: _colours,
	dark?: _colours,
	[key: string]: _colours
}