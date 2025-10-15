import { defineField, defineType } from 'sanity';
import { camelCaseToWords } from "shared-lib/StringTransforms"

import { ArchiveBoxIcon } from '@heroicons/react/24/solid'
import { _BLOCK_PREVIEW } from '@schemas.studio/objects/blocks/utils/preview';
import { _ARTICLE_TYPES, _BLOCK_TYPES } from '@root.site-template/DocumentTypes';
import { _BLOCK_FIELDS } from '@schemas.studio/objects/blocks/utils/fields';
import { schemeFilter, ReferenceHierarchyInput } from 'sanity-plugin-taxonomy-manager';

const archiveTypes = Object.entries(_ARTICLE_TYPES).flatMap((article) => {
	return { title: camelCaseToWords(article[1]), value: article[1] }
})


const _FIELDS = [
	defineField({
		title: 'Archive Type',
		name: 'archiveType',
		type: 'string',
		options: {
			list: archiveTypes,
			layout: 'radio',
		},
	}),
	defineField({
		title: 'Description',
		name: 'description',
		type: 'array',
		of: [{ type: 'block' }],
	}),
	defineField({
		title: 'Filterable',
		name: 'filterable',
		type: 'boolean',
		description: 'Controls whether the archive is filterable with taxonomy tags.',
	}),
	// defineField({
	// 	title: 'Featured Taxonomies',
	// 	name: `featuredTaxonomies`,
	// 	type: 'array',
	// 	description: 'Only articles with the selected taxonomies will appear. If no taxonomies are selected then all articles of the type will be included.',
	// 	of: [{
	// 		type: 'reference',
	// 		to: [{ type: 'taxonomy' }],
	// 		options: {
	// 			disableNew: true
	// 		}
	// 	}]
	// })
	defineField({
		name: 'featuredTaxonomies',
			title: 'Featured Tags',
			type: 'reference',
			to: { type: 'skosConcept' },
			options: {
				filter: schemeFilter({ schemeId: 'f3deba' }),
				disableNew: true,
			},
			components: { field: ReferenceHierarchyInput },
		}),
]

export const Archive = defineType({
	name: _BLOCK_TYPES.ARCHIVE,
	type: 'object',
	icon: () => <ArchiveBoxIcon />,
	fields: [
		..._BLOCK_FIELDS,
		..._FIELDS
	],
	preview: _BLOCK_PREVIEW
})