import { defineField } from 'sanity';
import constructors from '@/sanity/schemas/pages/constructors';

const fields: any = [
	defineField({
		title: 'Button Text',
		name: 'buttonText',
		type: 'string',
	}),
]

export const Contact = constructors.block({ name: 'Contact', fields })