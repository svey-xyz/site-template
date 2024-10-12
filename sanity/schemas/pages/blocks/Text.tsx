import { defineField } from 'sanity';

import constructors from '@/sanity/schemas/pages/constructors';

const fields = [
	defineField({
		title: 'Text',
		name: 'text',
		type: 'array',
		of: [
			{type: 'block'},
		],
	}),
	defineField({
		title: 'Link',
		name: 'link',
		type: 'link',
		description: 'A link to appear as a button underneath the text.',
	}),
]

export const Text = constructors.block({ name: 'Text', fields })