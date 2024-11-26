import constructors from '@/sanity/schemas/pages/constructors';
import { defineField } from 'sanity';

import { SwatchIcon } from '@heroicons/react/24/solid'

const fields = [
	defineField({
		title: 'Taxonomies',
		name: 'taxonomies',
		type: 'array',
		of: [{
			type: 'reference',
			to: [{ type: 'taxonomy' }],
			options: {
				disableNew: true
			}
		}]
		
	})
]

export const FeaturedTaxonomies = constructors.block({ name: 'FeaturedTaxonomies', fields, Icon: SwatchIcon })