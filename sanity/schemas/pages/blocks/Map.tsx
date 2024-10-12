import { defineField } from 'sanity';
import { } from 'react-icons';
import constructors from '@/sanity/schemas/pages/constructors';
import { FaMapLocationDot } from 'react-icons/fa6';

const fields: any = [
	defineField({
		title: 'Centre',
		name: 'centre',
		type: 'geopoint',
		validation: Rule => Rule.required(),
	}),
	defineField({
		title: 'Featured Busiensses',
		name: `featured_Businesses`,
		type: 'array',
		description: 'Only businesses with the selected taxonomies will appear. If no taxonomies are selected then all businesses will be included.',
		of: [{
			type: 'reference',
			to: [{ type: 'businessTaxonomy' }],
			options: {
				disableNew: true
			}
		}]
	})
]

export const Map = constructors.block({ name: 'Map', fields, icon: FaMapLocationDot })