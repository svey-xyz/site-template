import { defineField } from 'sanity';
import constructors from '../utils';
import { customMediaAssetSource } from '../../../../lib/assetSource';

import { Squares2X2Icon } from '@heroicons/react/24/solid'


const fields = [
	defineField({
		title: 'Style',
		name: 'style',
		type: 'string',
		options: {
			list: [
				{ title: 'Swiper', value: 'swiper' },
				{ title: 'Gallery', value: 'gallery' }
			]
		}
	}),
	defineField({
		title: 'Images',
		name: 'images',
		type: 'array',
		of: [
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
		]
	}),
]

export const Gallery = constructors.block({ name: 'Gallery', fields, Icon: Squares2X2Icon })