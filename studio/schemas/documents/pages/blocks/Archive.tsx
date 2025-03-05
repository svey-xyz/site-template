import { defineField, defineArrayMember } from 'sanity';
import constructors from '../../pages/constructors';
import ARTICLES from '../../articles'
import { camelCaseToWords } from '../../../../lib/stringFunctions';

import { ArchiveBoxIcon } from '@heroicons/react/24/solid'

const archiveTypes = ARTICLES.flatMap((article) => {
	return { title: camelCaseToWords(article.type), value: article.type }
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
		type: 'mdx',
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
			to: [{ type: 'taxonomy' }],
			options: {
				disableNew: true
			}
		}]
	})
]

export const Archive = constructors.block({ name: 'Archive', fields, Icon: ArchiveBoxIcon })