import { defineType, defineField, defineArrayMember } from "sanity";
import { SiGithubsponsors } from 'react-icons/si';
import { mediaAssetSource } from "sanity-plugin-media";
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const sponsor = defineType({
	title: "Sponsor",
	name: "sponsor",
	type: 'document',
	icon: SiGithubsponsors,
	orderings: [orderRankOrdering],
	fields: [
		orderRankField({ type: "category", newItemPosition: "before" }),
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'Sponsor title.',
			validation: (Rule) => [
				Rule.required().error("Sponsor needs a title!"),
			]
		}),
		defineField({
			title: 'Image',
			name: 'image',
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
			title: 'Website',
			name: 'website',
			type: 'url',
			description: `Link to the sponsors's site.`
		}),
		defineField({
			title: 'Socials',
			name: 'socials',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'social',
				})
			]
		}),
		defineField({
			title: 'About',
			name: 'about',
			type: 'basicBlockContent',
		}),
	],
	preview: {
		select: {
			title: 'title',
			image: 'image'
		},
		prepare(value: any) {
			return {
				title: value.title,
				media: value.image ? value.image : SiGithubsponsors
			}
		}
	},
});