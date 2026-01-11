import { defineField, defineType } from 'sanity';

import { _BLOCK_FIELDS } from '@schemas.studio/objects/blocks/utils/fields';
import { _BLOCK_PREVIEW } from '@schemas.studio/objects/blocks/utils/preview';
import { _BLOCK_TYPES } from '@root.site-template/DocumentTypes';
import { getIcon } from '@root.site-template/IconRegistry';

const _FIELDS = [
	defineField({
		title: 'Socials',
		name: 'socials',
		type: 'array',
		of: [{ type: 'social'}]
	}),
]

export const Socials = defineType({
	name: _BLOCK_TYPES.SOCIALS,
	type: 'object',
	icon: getIcon(_BLOCK_TYPES.SOCIALS),
	fields: [
		..._BLOCK_FIELDS,
		..._FIELDS
	],
	preview: _BLOCK_PREVIEW
})