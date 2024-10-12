import constructors from '@/sanity/schemas/pages/constructors';
import { RiInputField } from 'react-icons/ri';
import { defineField } from 'sanity';


const fields: any = [
	defineField({
		title: 'Note',
		name: 'note',
		type: 'note',
		description: 'Newsletter signup block.'
	}),
	defineField({
		title: 'Call To Action',
		name: 'callToAction',
		type: 'string',
	}),
	defineField({
		title: 'Text',
		name: 'text',
		type: 'string'
	})
]

export const Newsletter = constructors.block({ name: 'Newsletter', fields, icon: RiInputField })