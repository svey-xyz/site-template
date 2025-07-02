import { _BLOCK_TYPES } from "@root.site-template/DocumentTypes"
import { _CUSTOM_IMAGE_FIELD_VALUES } from "@schemas.studio/fields/CustomImage"
import { sections } from "@schemas.studio/fields/sections"
import { defineField } from "sanity"

export const _PAGE_FIELDS = [
	defineField({
		title: 'Title',
		name: 'title',
		type: 'string',
		validation: Rule => Rule.required()
	}),
	defineField({
		title: 'Description',
		name: 'description',
		type: 'array',
		of: [{ type: 'block' }],
	}),
	defineField({
		title: 'Hero Image',
		name: 'heroImage',
		description: 'When a hero image is set, a hero will appear with the page title and image.',
		..._CUSTOM_IMAGE_FIELD_VALUES,
	}),
	sections
]