import { defineField, defineType } from 'sanity';

import { _BLOCK_PREVIEW } from '@schemas.studio/objects/blocks/utils/preview';
import { _BLOCK_FIELDS } from '@schemas.studio/objects/blocks/utils/fields';

const _FIELDS: Array<any> = [
]

export const Standard = defineType({
	name: 'standard_block',
	type: 'object',
	fields: [
		..._BLOCK_FIELDS,
		..._FIELDS
	],
	preview: _BLOCK_PREVIEW
})