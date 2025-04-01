import { defineField, defineType } from 'sanity';

import { EnvelopeOpenIcon } from '@heroicons/react/24/solid'
import { _BLOCK_FIELDS } from '@schemas.studio/objects/blocks/utils/fields';
import { _BLOCK_PREVIEW } from '@schemas.studio/objects/blocks/utils/preview';

const _FIELDS = [
	defineField({
		title: 'Note',
		name: 'note',
		type: 'note',
		description: 'Newsletter signup block.'
	}),
	defineField({
		title: 'Call To Action',
		name: 'callToAction',
		type: 'string',
	}),
	defineField({
		title: 'Text',
		name: 'text',
		type: 'string'
	})
]

export const Newsletter = defineType({
	name: 'newsletter_block',
	type: 'object',
	icon: () => <EnvelopeOpenIcon />,
	fields: [
		..._BLOCK_FIELDS,
		..._FIELDS
	],
	preview: _BLOCK_PREVIEW
})