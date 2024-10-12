import { defineType, defineField, defineArrayMember } from 'sanity';
import constructors from '@/sanity/schemas/pages/constructors';
import { BsPeopleFill } from 'react-icons/bs';

const fields = [
	defineField({
		title: 'People',
		name: 'people',
		type: 'array',
		validation: Rule => Rule.required().min(1),
		of: [
			{
				type: 'reference',
				to: { type: 'person' },
				options: {
					disableNew: true,
				},
			}
		]
	}),
]

export const People = constructors.block({ name: 'People', fields, icon: BsPeopleFill })