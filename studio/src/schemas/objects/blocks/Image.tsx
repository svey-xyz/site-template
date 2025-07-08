import { defineField, defineType } from 'sanity';
import { camelCaseToWords } from "shared-lib/StringTransforms"

import { PhotoIcon } from '@heroicons/react/24/solid'
import { _CUSTOM_IMAGE_FIELD_VALUES } from '@schemas.studio/fields/CustomImage';
import { _BLOCK_FIELDS } from '@schemas.studio/objects/blocks/utils/fields';
import { _BLOCK_TYPES } from '@root.site-template/DocumentTypes';

const _FIELDS = [
	defineField({
		title: 'Image',
		name: 'image',
		..._CUSTOM_IMAGE_FIELD_VALUES
	}),
	defineField({
		title: 'Accented',
		name: 'accented',
		type: 'boolean',
		description: 'Applies accent styling to the image.'
	})
]

const _PREVIEW = {
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

export const Image = defineType({
	name: _BLOCK_TYPES.IMAGE,
	type: 'object',
	icon: () => <PhotoIcon />,
	fields: [
		..._BLOCK_FIELDS,
		..._FIELDS
	],
	preview: _PREVIEW
})