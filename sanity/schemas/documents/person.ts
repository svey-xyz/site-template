import { defineType, defineField, defineArrayMember } from "sanity";
import { BsPersonFill } from "react-icons/bs";

export const director = defineType({
	type: 'document',
	name: 'person',
	title: 'Person',
	fields: [
		defineField({
			title: 'Name',
			name: 'name',
			type: 'string',
			validation: Rule => Rule.required()
		}),
		defineField({
			title: 'Position',
			name: 'position',
			type: 'string',
		}),
		defineField({
			name: 'businesses',
			title: 'Businesses',
			type: 'array',
			of: [{
				type: 'reference',
				to: [{ type: 'business', }],
				options: {
					disableNew: true,
				},
			}]	
		}),
		defineField({
			name: 'contact',
			type: 'contact',
		}),
	],
	icon: BsPersonFill
})