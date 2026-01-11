import { defineField, defineType } from 'sanity';

import { _BLOCK_FIELDS } from '@schemas.studio/objects/blocks/utils/fields';
import { _BLOCK_PREVIEW } from '@schemas.studio/objects/blocks/utils/preview';
import { _BLOCK_TYPES } from '@root.site-template/DocumentTypes';
import { getIcon } from '@root.site-template/IconRegistry';

const _FIELDS = [
	defineField({
		title: 'Text',
		name: 'text',
		type: 'array',
		of: [{ type: 'block'}]
	}),
	defineField({
		title: 'Style',
		name: 'style',
		type: 'string',
		options: {
			list: [
				{ title: 'Urgent', value: 'urgent' },
				{ title: 'Information', value: 'info' },
				{ title: 'Warning', value: 'warn' },

			]
		},
		validation: Rule => Rule.required()
	})
]

export const Note = defineType({
	name: _BLOCK_TYPES.NOTE,
	type: 'object',
	icon: getIcon(_BLOCK_TYPES.NOTE),
	fields: [
		..._BLOCK_FIELDS,
		..._FIELDS
	],
	preview: _BLOCK_PREVIEW
})