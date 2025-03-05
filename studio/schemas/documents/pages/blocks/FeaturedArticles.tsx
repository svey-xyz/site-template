import { defineField } from 'sanity';
import constructors from '../constructors';
import ARTICLES from '../../articles';

import { SparklesIcon } from '@heroicons/react/24/solid'


const articleTypes = ARTICLES.flatMap((article) => {
	return { type: article.type }
})

const fields = [
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

export const FeaturedArticles = constructors.block({ name: 'FeaturedArticles', fields, Icon: SparklesIcon })