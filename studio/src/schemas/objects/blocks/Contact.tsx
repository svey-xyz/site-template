import { defineField, defineType } from 'sanity';

import { _BLOCK_PREVIEW } from '@schemas.studio/objects/blocks/utils/preview';
import { _BLOCK_FIELDS } from '@schemas.studio/objects/blocks/utils/fields';
import { _BLOCK_TYPES } from '@root.site-template/DocumentTypes';
import { getIcon } from '@root.site-template/IconRegistry';

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
	icon: getIcon(_BLOCK_TYPES.CONTACT),
	fields: [
		..._BLOCK_FIELDS,
		..._FIELDS
	],
	preview: _BLOCK_PREVIEW
})