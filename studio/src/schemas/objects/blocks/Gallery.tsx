import { defineField, defineType } from 'sanity';

import { Squares2X2Icon } from '@heroicons/react/24/solid'
import { _CUSTOM_IMAGE_FIELD_VALUES } from '@schemas.studio/fields/CustomImage';
import { _BLOCK_FIELDS } from '@schemas.studio/objects/blocks/utils/fields';
import { _BLOCK_PREVIEW } from '@schemas.studio/objects/blocks/utils/preview';


const _FIELDS = [
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
				..._CUSTOM_IMAGE_FIELD_VALUES
			}),
		]
	}),
]

export const Gallery = defineType({
	name: 'gallery_block',
	type: 'object',
	icon: () => <Squares2X2Icon />,
	fields: [
		..._BLOCK_FIELDS,
		..._FIELDS
	],
	preview: _BLOCK_PREVIEW
})