import { DocumentTextIcon } from "@heroicons/react/24/solid"
import { StringTransforms } from "shared-lib"
// import { Blocks } from "@/sanity.types"

export const _PAGE_PREVIEW = {
		select: {
			title: 'title',
			image: 'image',
			sections: 'sections'
			// blocks: 'blocks'
		},
		prepare(value: any) {
			const { image, sections, title } = value
			const sectionTitles = sections ? (sections as any)?.map((section: any) => {
				console.log('section', section)
				return ` ${section.title ?? 'Untitled'}`
			}) : []
			const subtitle = sections ?
				`Sections: ${sectionTitles}` :
				`No sections configured!`
			return {
				title: `${title}`,
				subtitle,
				media: image ? image : DocumentTextIcon
			}
		},
	}