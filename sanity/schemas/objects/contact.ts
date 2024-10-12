import { defineArrayMember, defineField, defineType } from "sanity";

export const contact = defineType({
	title: 'Contact',
	name: 'contact',
	type: 'object',
	fields: [
		defineField({
			title: 'Email',
			name: 'email',
			type: 'string',
			validation: Rule => Rule.email(),
		}),
		defineField({
			title: 'Phone',
			name: 'phone',
			type: 'string',
			validation: Rule => Rule.regex(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, { name: 'phone number' }),
		}),
		defineField({
			title: 'Website',
			name: 'website',
			type: 'url',
		}),
		defineField({
			title: 'Socials',
			name: 'socials',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'social',
				})
			],
		}),
	],
})