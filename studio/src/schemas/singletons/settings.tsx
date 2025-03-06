import { customMediaAssetSource } from "../../lib/assetSource";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import {
	defineField,
	defineType,
} from "sanity";

const _Cog6ToothIcon = () => <Cog6ToothIcon />;

export const settings = defineType({
	title: 'Settings',
	name: 'settings',
	type: 'document',
	icon: _Cog6ToothIcon,
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
				sources: [customMediaAssetSource]
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
			title: 'Contact',
			name: 'contact',
			type: 'contact',
		}),
		defineField({
			title: 'About',
			name: 'about',
			type: 'mdx',
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
			of: [{ type: 'navGroup'}]
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