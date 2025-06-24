import { _PAGE_FIELDS } from "@schemas.studio/documents/pages/utils/fields"
import { _PAGE_PREVIEW } from "@schemas.studio/documents/pages/utils/preview"
import { defineField, defineType } from "sanity"

const _FIELDS: any = [
	defineField({
		title: 'Slug',
		name: 'slug',
		type: 'slug',
		options: {
			source: 'title',
			maxLength: 30,
		},
		description: 'Custom slugs are generally not recommended, use the generate option.',
		validation: (Rule) => Rule.required()
	}),
]

export const page = defineType({ 
	name: 'page',
	type: 'document',
	fields: [
		..._PAGE_FIELDS,
		..._FIELDS
	],
	preview: _PAGE_PREVIEW
 })