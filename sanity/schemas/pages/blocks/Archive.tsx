import { defineField, defineArrayMember } from 'sanity';
import { } from 'react-icons';
import constructors from '@/sanity/schemas/pages/constructors';
import { RiGalleryView } from 'react-icons/ri';
import ARTICLES from '@/sanity/schemas/articles'
import { camelCaseToWords } from '@/lib/stringFunctions';
import { taxonomyTitle } from "@/sanity/schemas/articles/constructors/taxonomy";

const archiveTypes = ARTICLES.flatMap((article) => {
	return { title: camelCaseToWords(article.type), value: article.type }
})

const taxonomyTypes = ARTICLES.flatMap((article) => {
	return { type: taxonomyTitle(article.type) }
}) 


const fields = [
	defineField({
		title: 'Archive Type',
		name: 'archiveType',
		type: 'string',
		options: {
			list: archiveTypes,
			layout: 'radio',
		},
	}),
	defineField({
		title: 'Description',
		name: 'description',
		type: 'array',
		of: [{type: 'block'}],
	}),
	defineField({
		title: 'Filterable',
		name: 'filterable',
		type: 'boolean',
		description: 'Controls whether the archive is filterable with taxonomy tags.',
	}),
	defineField({
		title: 'Featured Taxonomies',
		name: `featuredTaxonomies`,
		type: 'array',
		description: 'Only articles with the selected taxonomies will appear. If no taxonomies are selected then all articles of the type will be included.',
		of: [{
			type: 'reference',
			to: taxonomyTypes,
			options: {
				disableNew: true
			}
		}]
	})
]

export const Archive = constructors.block({ name: 'Archive', fields, icon: RiGalleryView })