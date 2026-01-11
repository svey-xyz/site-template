import { StringTransforms } from "shared-lib"
import { getIcon } from '@root.site-template/IconRegistry';
import { CodeBracketSquareIcon } from "@heroicons/react/24/solid";

const _DUMMY_ICON = CodeBracketSquareIcon;

export const _BLOCK_PREVIEW = {
	select: {
		type: '_type',
		title: 'title',
		// logo: 'logo',
	},
	prepare(value: any) {
		const { type, title, icon } = value

		return {
			title: type ? StringTransforms.camelCaseToWords(type) : 'Unknown Block Type',
			media: getIcon(type) ?? _DUMMY_ICON
		}
	},
}