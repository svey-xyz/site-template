import { DocumentTextIcon } from "@heroicons/react/24/solid"
import { StringTransforms } from "shared-lib"
import { Blocks } from "@/sanity.types"

export const _PAGE_PREVIEW = {
		select: {
			title: 'title',
			image: 'image',
			blocks: 'blocks'
		},
		prepare(value: any) {
			const { image, blocks, title } = value
			const blockNames = blocks ? ((blocks.blocks) as Blocks['blocks'])?.map((block) => {
				return ` ${StringTransforms.camelCaseToWords(block?._type)}`
			}) : []
			const subtitle = blocks ?
				`Blocks: ${blockNames}` :
				`No blocks configured!`
			return {
				title: `${title}`,
				subtitle,
				media: image ? image : DocumentTextIcon
			}
		},
	}