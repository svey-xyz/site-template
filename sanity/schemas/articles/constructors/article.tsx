import { camelCaseToWords } from "@lib/stringFunctions";
import { defineArrayMember, defineField, defineType, FieldGroupDefinition, PreviewConfig, DocumentDefinition } from "sanity";
import { customMediaAssetSource } from "@/sanity/lib/assetSource";
import { ComponentType } from "react";

interface args {
	type: string,
	fields?: sanityFields,
	icon?: ComponentType,
	groups?: FieldGroupDefinition[],
	customPreview?: PreviewConfig,
}

const _GROUPS: FieldGroupDefinition[] = [
	{
		name: 'about',
		title: 'About',
		// default: true,
	},
]

const _FIELDS = (type: string) => [
	defineField({
		title: 'Title',
		name: 'title',
		type: 'string',
		validation: Rule => Rule.required(),
		group: 'about',
	}),
	defineField({
		title: 'Slug',
		name: 'slug',
		type: 'slug',
		group: 'about',
		options: {
			source: 'title',
			maxLength: 96,
		},
		description: 'Custom slugs are generally not recommended, use the generate option.',
		validation: (Rule) => Rule.required()
	}),
	defineField({
		title: 'Description',
		name: 'description',
		type: 'mdx',
		group: 'about',
	}),
	defineField({
		title: 'Taxonomies',
		name: 'taxonomies',
		type: 'array',
		of: [
			defineArrayMember({
				type: 'reference',
				to: [{type: 'taxonomy'}]
			})
		],
		group: 'about',
	}),
	defineField({
		title: 'Image',
		name: 'image',
		type: 'image',
		group: 'about',
		options: {
			sources: [customMediaAssetSource],
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
]

const _PREVIEW = (icon?: ComponentType) => {
	return {
		select: {
			title: 'title',
			image: 'image',
		},
		prepare(value: any) {
			const { title, image } = value
			return {
				title: title ? title : 'Untitled',
				media: image ? image : icon
			}
		}
	}
}

export class ARTICLE {
	type: string
	document: DocumentDefinition

	constructor(args: args) {
		this.type = args.type
		this.document = article(args)
	}
}

const article = (args: args) => {
	const { type, fields, groups, icon } = args
 	let documentFields = [
		..._FIELDS(type),
		...fields || [],
	]

	const documentPreview = args.customPreview || _PREVIEW()

	return defineType({
		title: camelCaseToWords(type),
		name: type,
		type: 'document',
		icon: icon as any,
		groups: [
			..._GROUPS,
			...(groups || [])
		],
		fields: documentFields,
		preview: documentPreview,
	})
}