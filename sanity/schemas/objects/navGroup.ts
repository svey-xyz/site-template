import { defineField, defineType } from "sanity";

export const navGroup = defineType({
	name: 'navGroup',
	title: 'Navigation Group',
	type: 'object',
	fields: [
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'If no title is provided the name of the first item will be used. It is highly recommended to set a custom title when adding multiple items.',
		}),
		defineField({
			title: 'Items',
			name: 'items',
			type: 'array',
			description: 'A list of items for the navigation group. If more than 1 item is added the navigation group will appear as a dropdown list.',
			of: [
				defineField({
					title: 'Item',
					name: 'item',
					type: 'object',
					fields: [
						defineField({
							title: 'Title',
							name: 'title',
							type: 'string',
							description: 'If no title is provided the name of the first item will be used.',
						}),
						defineField({
							title: 'Page',
							name: 'page',
							type: 'reference',
							to: [{ type: 'page' }, { type: 'archive' }],
							options: {
								disableNew: true,
							},
							validation: Rule => Rule.required()
						}),
						
					]
				}),	
			]
		})	
	],
})