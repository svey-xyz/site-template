import { customMediaAssetSource } from "@lib.studio/assetSource"

export const _CUSTOM_IMAGE_FIELD_VALUES = {
	title: 'Image',
	name: 'image',
	type: 'image',
	options: {
		sources: [customMediaAssetSource],
	},
	preview: {
		select: {
			asset: 'asset',
			title: 'asset.title',
			description: 'asset.description'

		},
		prepare(value: any) {
			return {
				title: value.title ? value.title : 'Untitled Image',
				subtitle: value.description,
				media: value.asset
			}
		}
	},
}