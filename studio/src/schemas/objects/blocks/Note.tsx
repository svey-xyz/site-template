import { defineField, defineType } from 'sanity';

import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { _BLOCK_FIELDS } from '@schemas.studio/objects/blocks/utils/fields';
import { _BLOCK_PREVIEW } from '@schemas.studio/objects/blocks/utils/preview';
import { _BLOCK_TYPES } from '@root.site-template/DocumentTypes';

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
	icon: () => <ChatBubbleLeftEllipsisIcon />,
	fields: [
		..._BLOCK_FIELDS,
		..._FIELDS
	],
	preview: _BLOCK_PREVIEW
})