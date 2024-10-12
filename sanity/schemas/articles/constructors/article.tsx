import { camelCaseToWords } from "@lib/stringFunctions";
import { defineArrayMember, defineField, defineType, FieldGroupDefinition, FieldDefinition, PreviewConfig, DocumentDefinition } from "sanity";
import { mediaAssetSource } from "sanity-plugin-media";
import { taxonomy, taxonomyTitle } from "@/sanity/schemas/articles/constructors/taxonomy";

interface args {
	type: string,
	fields?: sanityFields,
	// icon?: IconType,
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
		type: 'array',
		of: [{ type: 'block' }],
		group: 'about',
	}),
	defineField({
		title: 'Taxonomies',
		name: 'taxonomies',
		type: 'array',
		of: [
			defineArrayMember({
				type: 'reference',
				to: [{type: taxonomyTitle(type)}]
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
			sources: [mediaAssetSource],
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

const _PREVIEW = () => {
	return {
		select: {
			title: 'title',
			image: 'image',
		},
		prepare(value: any) {
			const { title, image } = value
			return {
				title: title ? title : 'Untitled',
				media: image ? image : null
			}
		}
	}
}

export class ARTICLE {
	type: string
	document: DocumentDefinition
	taxonomy: DocumentDefinition

	constructor(args: args) {
		this.type = args.type
		this.document = article(args)
		this.taxonomy = taxonomy(args.type)
	}
}

const article = (args: args) => {
	const { type, fields, groups } = args
 	let documentFields = [
		..._FIELDS(type),
		...fields || [],
	]

	const documentPreview = args.customPreview || _PREVIEW()

	return defineType({
		title: camelCaseToWords(type),
		name: type,
		type: 'document',
		groups: [
			..._GROUPS,
			...(groups || [])
		],
		fields: documentFields,
		preview: documentPreview,
	})
}