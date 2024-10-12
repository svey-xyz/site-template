import {
	defineArrayMember,
	defineField,
	defineType,
} from "sanity";
import { mediaAssetSource } from "sanity-plugin-media";

import { PiTabsDuotone } from "react-icons/pi";

export const settings = defineType({
	title: 'Settings',
	name: 'siteSettings',
	type: 'document',
	fields: [
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: Rule => Rule.required().error(`This site needs a fun name!`)
		}),
		defineField({
			title: 'Logo',
			name: 'logo',
			type: 'image',
			description: 'Featured image.',
			options: {
				sources: [mediaAssetSource]
			},
			preview: {
				select: {
					asset: 'asset',
					title: 'asset.title',
					description: 'asset.description'

				},
				prepare(value: any) {
					return {
						title: value.title ? value.title : 'Untitled Image',
						subtitle: value.description,
						media: value.asset
					}
				}
			},
		}),
		defineField({
			title: 'Blurb',
			name: 'blurb',
			type: 'string',
			description: 'Concise description of the site, used primarily for SEO and metadata.',
		}),
		defineField({
			title: 'Motto',
			name: 'motto',
			type: 'string',
		}),
		defineField({
			title: 'Keywords',
			name: 'keywords',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'string',
				})
			],
		}),
		defineField({
			title: 'Contact',
			name: 'contact',
			type: 'contact',
		}),
		defineField({
			title: 'About',
			name: 'about',
			type: 'extraBlockContent',
		}),
		defineField({
			title: 'Address',
			name: 'address',
			type: 'reference',
			to: [{ type: 'address' }]
		}),
		defineField({
			name: 'homepage',
			title: 'Homepage',
			type: 'reference',
			to: [{type:'page'}],
			options: {
				disableNew: true,
			},
		}),
		defineField({
			name: 'navigation',
			title: 'Navigation',
			type: 'array',
			of: [
				{
					name: 'Navigation Item',
					title: 'item',
					type: 'object',
					icon: PiTabsDuotone,
					fields: [
						{
							title: 'Title',
							name: 'title',
							type: 'string',
							validation: Rule => Rule.required(),
						},
						{
							title: 'Pages',
							name: 'pages',
							type: 'array',
							description: 'A list of pages for the navigation item. If more than 1 page is added the navigation item will appear as a dropdown list.',
							of: [
								{
									title: 'Page',
									name: 'page',
									type: 'reference',
									to: [
										{ type: 'page' },
										{ type: 'archive' },
									],
									options: {
										disableNew: true,
									},
								},
							]
						}
					],
				},
			]
		}),
	],
	preview: {
		select: {
			title: 'title',
			blurb: 'blurb'
		},
		prepare(value: any) {
			return {
				title: `${value.title ? value.title : 'Site Settings'}`,
				description: value.blurb,
			}
		}
	}
})