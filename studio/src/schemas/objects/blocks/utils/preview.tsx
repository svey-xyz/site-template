import { StringTransforms } from "shared-lib"

export const _BLOCK_PREVIEW = {
	select: {
		type: '_type',
		title: 'title',
		// logo: 'logo',
	},
	prepare(value: any) {
		const { type, title } = value
		return {
			title: type ? StringTransforms.camelCaseToWords(type) : 'Unknown Block Type',
		}
	},
}