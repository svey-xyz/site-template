import { defineArrayMember, defineField, defineType } from "sanity";
import { _BLOCK_TYPES } from '@root.site-template/DocumentTypes';

export const sections = defineField({
	name: 'sections',
	title: 'Sections',
	type: 'array',
	of: [
		defineArrayMember({
			name: 'section',
			type: 'object',
			fields: [
				defineField({
					name: 'title',
					type: 'string',
					validation: Rule => Rule.required(),
				}),
				defineField({
					name: 'displayTitle',
					title: 'Display Title',
					type: 'boolean',
					initialValue: false
				}),
				defineField({
					name: 'layout',
					type: 'string',
					description: 'The number of columns and their share of width.',
					options: {
						list: [
							{ title: '1', value: '1' },
							{ title: '1-1', value: '1-1' },
							{ title: '1-1-1', value: '1-1-1' },
							{ title: '2-1', value: '2-1' },
							{ title: '1-2', value: '1-2' },
							{ title: '2-1-1', value: '2-1-1' },
							{ title: '1-2-1', value: '1-2-1' },
							{ title: '1-1-2', value: '1-1-2' },
						]
					}
				}),
				defineField({
					name: 'background',
					type: 'string',
					options: {
						list: [
							{ title: 'Clear', value: 'clear' },
							{ title: 'Opaque', value: 'opaque' }
						]
					}
				}),
				defineField({
					title: 'Blocks',
					name: 'blocks',
					type: 'array',
					of: (() => {
						return Object.values(_BLOCK_TYPES).map((blockType) => { return defineArrayMember({ type: blockType }) })
					})(),
				}),
			]
		})
	]
})