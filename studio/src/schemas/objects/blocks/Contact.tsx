import { defineField, defineType } from 'sanity';

import { InboxArrowDownIcon } from '@heroicons/react/24/solid'
import { _BLOCK_PREVIEW } from '@schemas.studio/objects/blocks/utils/preview';
import { _BLOCK_FIELDS } from '@schemas.studio/objects/blocks/utils/fields';
import { _BLOCK_TYPES } from '@root.site-template/DocumentTypes';

const _FIELDS = [
	defineField({
		title: 'Button Text',
		name: 'buttonText',
		type: 'string',
	}),
]

export const Contact = defineType({
	name: _BLOCK_TYPES.CONTACT,
	type: 'object',
	icon: () => <InboxArrowDownIcon />,
	fields: [
		..._BLOCK_FIELDS,
		..._FIELDS
	],
	preview: _BLOCK_PREVIEW
})