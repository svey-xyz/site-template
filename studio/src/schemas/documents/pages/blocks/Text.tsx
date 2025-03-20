import { defineField } from 'sanity';

import constructors from '../utils';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid';

const fields = [
	defineField({
		title: 'Text',
		name: 'text',
		type: 'mdx',
	}),
]

export const Text = constructors.block({ name: 'Text', fields, Icon: () => <Bars3BottomLeftIcon /> })