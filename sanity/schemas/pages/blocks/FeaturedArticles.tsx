import { defineType, defineField, defineArrayMember } from 'sanity';
import constructors from '@/sanity/schemas/pages/constructors';
import { MdWebStories } from 'react-icons/md';
import ARTICLES from '@/sanity/schemas/articles';

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

export const FeaturedArticles = constructors.block({ name: 'FeaturedArticles', fields, icon: MdWebStories })