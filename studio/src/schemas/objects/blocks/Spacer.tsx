import { defineField, defineType } from 'sanity';

import { _BLOCK_FIELDS } from '@schemas.studio/objects/blocks/utils/fields';
import { _BLOCK_PREVIEW } from '@schemas.studio/objects/blocks/utils/preview';
import { _BLOCK_TYPES } from '@root.site-template/DocumentTypes';
import { StringTransforms } from '@root.site-template/shared-lib/dist';
import { getIcon } from '@root.site-template/IconRegistry';

const _FIELDS = [
	defineField({
		title: 'Size',
		name: 'size',
		type: 'string',
		options: {
			list: [
				{ title: 'Small', value: 'small' },
				{ title: 'Medium', value: 'medium' },
				{ title: 'Large', value: 'large' },

			]
		},
		initialValue: 'medium',
		validation: Rule => Rule.required()
	})
]

export const Spacer = defineType({
	name: _BLOCK_TYPES.SPACER,
	type: 'object',
	icon: getIcon(_BLOCK_TYPES.SPACER),
	fields: [
		..._BLOCK_FIELDS,
		..._FIELDS
	],
	preview: {
		select: {
			type: '_type',
			title: 'title',
			size: 'size',
			// logo: 'logo',
		},
		prepare(value: any) {
			const { type, title, icon, size } = value
			return {
				title: type ? StringTransforms.camelCaseToWords(type) : 'Unknown Block Type',
				subtitle: `Size: ${size || 'unknown'}`,
				media: getIcon(_BLOCK_TYPES.SPACER),
			}
		},
	}
})