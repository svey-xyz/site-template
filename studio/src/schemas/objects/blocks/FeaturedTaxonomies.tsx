import { defineField, defineType } from 'sanity';

import { SwatchIcon } from '@heroicons/react/24/solid'
import { _BLOCK_FIELDS } from '@schemas.studio/objects/blocks/utils/fields';
import { _BLOCK_PREVIEW } from '@schemas.studio/objects/blocks/utils/preview';
import { _BLOCK_TYPES } from '@root.site-template/DocumentTypes';

const _FIELDS = [
	defineField({
		title: 'Taxonomies',
		name: 'taxonomies',
		type: 'array',
		of: [{
			type: 'reference',
			to: [{ type: 'taxonomy' }],
			options: {
				disableNew: true
			}
		}]
		
	})
]

export const FeaturedTaxonomies = defineType({
	name: _BLOCK_TYPES.FEATURED_TAXONOMIES,
	type: 'object',
	icon: () => <SwatchIcon />,
	fields: [
		..._BLOCK_FIELDS,
		..._FIELDS
	],
	preview: _BLOCK_PREVIEW
})