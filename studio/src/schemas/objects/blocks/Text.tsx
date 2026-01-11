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
]

export const Text = defineType({
	name: _BLOCK_TYPES.TEXT,
	type: 'object',
	icon: getIcon(_BLOCK_TYPES.TEXT),
	fields: [
		..._BLOCK_FIELDS,
		..._FIELDS
	],
	preview: _BLOCK_PREVIEW
})