import { camelCaseToWords } from "shared-lib/StringTransforms"

export const _BLOCK_PREVIEW = {
	select: {
		type: '_type',
		title: 'title',
		// logo: 'logo',
	},
	prepare(value: any) {
		const { type, title } = value
		return {
			title: type ? camelCaseToWords(type) : 'Unknown Block Type',
		}
	},
}