import { _CUSTOM_IMAGE_FIELD_VALUES } from "@schemas.studio/fields/CustomImage"
import { defineArrayMember, defineField } from "sanity"
import { ArrayHierarchyInput, ReferenceHierarchyInput, schemeFilter } from "sanity-plugin-taxonomy-manager"

export const _ARTICLE_FIELDS = [
	// This field exists for query typegen
	defineField({
		name: 'isArticle',
		type: 'boolean',
		hidden: true,
		initialValue: true,
		readOnly: true
	}),
	
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
			type: 'array',
			of: [{ type: 'block' }],
			group: 'about',
		}),
	defineField({
		name: 'taxonomies',
		title: 'Taxonomies',
		description: 'Array input component with scheme filter (scheme ids)',
		// validation: rule => rule.max(3),
		type: 'array',
		of: [
			{
				type: 'reference',
				to: { type: 'skosConcept' },
				options: {
					filter: schemeFilter({ schemeId: 'bDeEr1' }),
					disableNew: true,
				},
			},
		],
		components: { field: ArrayHierarchyInput },
		group: 'about',
	}),
		defineField({
			title: 'Image',
			name: 'image',
			group: 'about',
			..._CUSTOM_IMAGE_FIELD_VALUES,
		}),
]