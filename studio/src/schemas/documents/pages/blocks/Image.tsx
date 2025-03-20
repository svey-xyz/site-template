import { defineField } from 'sanity';
import constructors from '../utils';
import { customMediaAssetSource } from '../../../../lib/assetSource';
import { camelCaseToWords } from '../../../../lib/stringFunctions';

import { PhotoIcon } from '@heroicons/react/24/solid'

const fields = [
	defineField({
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
	}),
	defineField({
		title: 'Accented',
		name: 'accented',
		type: 'boolean',
		description: 'Applies accent styling to the image.'
	})
]

const preview = {
	select: {
		type: '_type',
		title: 'title',
		image: 'image'
		// logo: 'logo',
	},
	prepare(value: any) {
		const { type, title, image } = value
		return {
			title: type ? camelCaseToWords(type) : 'Unknown Block Type',
			media: image.asset ? image.asset : null,
		}
	},
}

export const Image = constructors.block({ name: 'Image', fields, preview, Icon: PhotoIcon })