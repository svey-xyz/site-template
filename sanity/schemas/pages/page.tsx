import { RiPagesLine } from 'react-icons/ri';
import { page as constructor } from '@/sanity/schemas/pages/constructors/page';

import { defineField } from 'sanity';

const fields = [
	defineField({
		title: 'Slug',
		name: 'slug',
		type: 'slug',
		options: {
			source: 'title',
			maxLength: 30,
		},
		description: 'Custom slugs are generally not recommended, use the generate option.',
		validation: (Rule) => Rule.required()
	}),
]

export const page = constructor({ name: 'page', fields, icon: RiPagesLine })