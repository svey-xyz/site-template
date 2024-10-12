import { defineType, defineField } from "sanity";
import { MdLocationPin } from "react-icons/md";

export const location = defineType({
	title: 'Location',
	name: 'location',
	icon: MdLocationPin,
	type: 'object',
	// options: {
	// 	collapsible: true, collapsed: true,
	// },
	fields: [
		defineField({
			title: 'Number',
			name: 'number',
			type: 'number',
		}),
		defineField({
			title: 'Street',
			name: 'street',
			type: 'string',
		}),
		defineField({
			title: 'Unit',
			name: 'unit',
			type: 'string',
		}),
		defineField({
			title: 'Location',
			name: 'location',
			type: 'geopoint',
		}),
		defineField({
			title: 'Notes',
			name: 'notes',
			type: 'string',
		}),
		// defineField({
		// 	title: 'Precise Location',
		// 	name: 'preciseLocation',
		// 	type: 'boolean',
		// 	description: 'When set to true the precise location will be displayed.'
		// }),
	],
	preview: {
		select: {
			address: 'address',
			notes: 'notes'
		},
		prepare(value: any) {
			return {
				title: value.address ? value.address : `Location`,
				subtitle: value.notes ? value.notes : '',
				media: MdLocationPin
			}
		}
	}
})