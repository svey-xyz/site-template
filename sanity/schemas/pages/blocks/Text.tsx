import { defineField } from 'sanity';

import constructors from '@/sanity/schemas/pages/constructors';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid';

const fields = [
	defineField({
		title: 'Text',
		name: 'text',
		type: 'array',
		of: [
			{type: 'block'},
		],
	}),
]

export const Text = constructors.block({ name: 'Text', fields, Icon: Bars3BottomLeftIcon })