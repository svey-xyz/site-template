import { defineType, defineField } from "sanity";
import { HiAtSymbol } from 'react-icons/hi';

const socialTypes = [
	{ title: 'Twitter / X', value: 'twitter' },
	{ title: 'Instagram', value: 'instagram' },
	{ title: 'Facebook', value: 'facebook' },
	{ title: 'Vimeo', value: 'vimeo' },
	{ title: 'LinkedIn', value: 'linkedin' },
	{ title: 'GitHub', value: 'github' },
]

export const social = defineType({
	title: 'Social',
	name: 'social',
	description: 'Link to a social platform.',
	icon: HiAtSymbol,
	type: 'object',
	fields: [
		defineField({
			title: 'Social Title',
			name: 'socialTitle',
			type: 'string',
			description: 'The title associated with the account prefixed with the address sign (e.g. @username)',
			validation: Rule => Rule.required()
		}),
		defineField({
			title: 'Social Type',
			name: 'socialType',
			type: 'string',
			options: {
				list: socialTypes
			},
			validation: Rule => Rule.required()
		}),
		defineField({
			title: 'URL',
			name: 'url',
			type: 'url',
			validation: Rule => Rule.required()
		}),

	],
	preview: {
		select: {
			title: 'socialTitle',
			type: 'socialType'
		},
		prepare(value: any) {
			const socialSiteTypeTitle = value.type && socialTypes.flatMap(option => option.value === value.type ? [option.title] : [])

			return {
				title: `${socialSiteTypeTitle}`,
				subtitle: value.title,
				media: HiAtSymbol
			}
		}
	}
})