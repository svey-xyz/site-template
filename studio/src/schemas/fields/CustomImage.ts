import { customMediaAssetSource } from "@lib.studio/assetSource"

export const _CUSTOM_IMAGE_FIELD_VALUES = {
	type: 'image',
	options: {
		sources: [customMediaAssetSource],
		hotspot: true,
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