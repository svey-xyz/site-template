import { _CUSTOM_IMAGE_FIELD_VALUES } from "@schemas.studio/fields/CustomImage"
import { defineArrayMember, defineField } from "sanity"

export const _ARTICLE_FIELDS = [
	defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: Rule => Rule.required(),
			group: 'about',
		}),
		defineField({
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			group: 'about',
			options: {
				source: 'title',
				maxLength: 96,
			},
			description: 'Custom slugs are generally not recommended, use the generate option.',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			title: 'Description',
			name: 'description',
			type: 'mdx',
			group: 'about',
		}),
		defineField({
			title: 'Taxonomies',
			name: 'taxonomies',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{type: 'taxonomy'}]
				})
			],
			group: 'about',
		}),
		defineField({
			..._CUSTOM_IMAGE_FIELD_VALUES,
			group: 'about',
		}),
]