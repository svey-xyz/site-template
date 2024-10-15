import ARTICLES from '@/sanity/schemas/articles';
import { taxonomyTitle } from '@/sanity/schemas/articles/constructors/taxonomy';
import constructors from '@/sanity/schemas/pages/constructors';
import { defineField } from 'sanity';

import { SwatchIcon } from '@heroicons/react/24/solid'


const taxonomyTypes = ARTICLES.flatMap((article) => {
	return { type: taxonomyTitle(article.type) }
})


const fields = [
	defineField({
		title: 'Taxonomies',
		name: 'taxonomies',
		type: 'array',
		of: [{
			type: 'reference',
			to: taxonomyTypes,
			options: {
				disableNew: true
			}
		}]
		
	})
]

export const FeaturedTaxonomies = constructors.block({ name: 'FeaturedTaxonomies', fields, Icon: SwatchIcon })