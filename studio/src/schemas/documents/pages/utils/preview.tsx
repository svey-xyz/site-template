import { DocumentTextIcon } from "@heroicons/react/24/solid"
import { camelCaseToWords } from "@lib.studio/stringFunctions"

export const _PAGE_PREVIEW = {
		select: {
			title: 'title',
			image: 'image',
			blocks: 'blocks'
		},
		prepare(value: any) {
			const { image, blocks, title } = value
			const subtitle = blocks ?
				`Blocks: ${blocks?.map((block: any, i: number, arr: Array<any>) => {
					return ` ${camelCaseToWords(block._type)}`
				})}` :
				`No blocks configured!`
			return {
				title: `${title}`,
				subtitle,
				media: image ? image : DocumentTextIcon
			}
		},
	}