import { _BLOCK_TYPES } from "@root.site-template/DocumentTypes"
import { _CUSTOM_IMAGE_FIELD_VALUES } from "@schemas.studio/fields/CustomImage"
import { defineField } from "sanity"

export const _PAGE_FIELDS = [
	defineField({
		title: 'Title',
		name: 'title',
		type: 'string',
		validation: Rule => Rule.required()
	}),
	// defineField({
	// 	name: 'slug',
	// 	title: 'Slug',
	// 	type: 'slug',
	// 	validation: (Rule) => Rule.required(),
	// 	options: {
	// 		source: 'title',
	// 		maxLength: 96,
	// 	},
	// }),
	defineField({
		title: 'Description',
		name: 'description',
		type: 'mdx',
	}),
	defineField({
		title: 'Hero Image',
		name: 'heroImage',
		description: 'When a hero image is set, a hero will appear with the page title and image.',
		..._CUSTOM_IMAGE_FIELD_VALUES,
	}),
	defineField({
		title: 'Blocks',
		name: 'blocks',
		type: 'array',
		of: (() => {
			return Object.values(_BLOCK_TYPES).map((blockType) => { return { type: blockType }})
		})(),
	}),
]