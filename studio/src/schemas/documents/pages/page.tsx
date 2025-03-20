import { page as constructor } from './utils/page';

import { defineField } from 'sanity';

const fields: any = [
	// defineField({
	// 	title: 'Slug',
	// 	name: 'slug',
	// 	type: 'slug',
	// 	options: {
	// 		source: 'title',
	// 		maxLength: 30,
	// 	},
	// 	description: 'Custom slugs are generally not recommended, use the generate option.',
	// 	validation: (Rule) => Rule.required()
	// }),
]

export const page = constructor({ name: 'page', fields })