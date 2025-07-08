import { defineField, defineType } from 'sanity';

import { SparklesIcon } from '@heroicons/react/24/solid'
import { _ARTICLE_TYPES, _BLOCK_TYPES } from '@root.site-template/DocumentTypes';
import { _BLOCK_FIELDS } from '@schemas.studio/objects/blocks/utils/fields';
import { _BLOCK_PREVIEW } from '@schemas.studio/objects/blocks/utils/preview';


const articleTypes = Object.values(_ARTICLE_TYPES).flatMap((article) => {
	return { type: article }
})

const _FIELDS = [
	defineField({
		title: 'Title',
		name: 'title',
		type: 'string',
		validation: Rule => Rule.required()
	}),
	defineField({
		title: 'Articles',
		name: 'articles',
		type: 'array',
		of: [
			{
				type: 'reference',
				to: articleTypes,
				options: {
					disableNew: true,
				}
			}
		]
	}),
]

export const FeaturedArticles = defineType({
	name: _BLOCK_TYPES.FEATURED_ARTICLES,
	type: 'object',
	icon: () => <SparklesIcon />,
	fields: [
		..._BLOCK_FIELDS,
		..._FIELDS
	],
	preview: _BLOCK_PREVIEW
}) 