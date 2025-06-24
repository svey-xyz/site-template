import { DocumentIcon } from '@heroicons/react/24/solid'

export const _ARTICLE_PREVIEW = {
	select: {
		title: 'title',
		image: 'image',
	},
	prepare(value: any) {
		const { title, image } = value
		return {
			title: title ? title : 'Untitled',
			media: image ? image : <DocumentIcon />
		}
	}
}