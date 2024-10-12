import { camelCaseToWords } from "@lib/stringFunctions";
import { FaCircleInfo } from "react-icons/fa6";
import { defineArrayMember, defineField, defineType, FieldGroupDefinition, FieldDefinition, PreviewConfig, DocumentDefinition } from "sanity";
import { IconType } from "react-icons";
import { mediaAssetSource } from "sanity-plugin-media";
import { taxonomy, taxonomyTitle } from "@/sanity/schemas/articles/constructors/taxonomy";


type fields = FieldDefinition<"string" | "number" | "boolean" | "object" | "array" | "block" | "date" | "datetime" | "document" | "file" | "geopoint" | "image" | "reference" | "crossDatasetReference" | "slug" | "text" | "url" | "email" | "color", undefined>[]

interface args {
	type: string,
	fields?: fields,
	icon?: IconType,
	groups?: FieldGroupDefinition[],
	customPreview?: PreviewConfig,
}

const _GROUPS: FieldGroupDefinition[] = [
	{
		name: 'about',
		title: 'About',
		// default: true,
		icon: FaCircleInfo,
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

const _PREVIEW = (icon?: IconType) => {
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
	taxonomy: DocumentDefinition

	constructor(args: args) {
		this.type = args.type
		this.document = article(args)
		this.taxonomy = taxonomy(args.type)
	}
}

const article = (args: args) => {
	const { type, icon, fields, groups } = args
 	let documentFields = [
		..._FIELDS(type),
		...fields || [],
	]

	const documentPreview = args.customPreview || _PREVIEW(icon)

	return defineType({
		title: camelCaseToWords(type),
		name: type,
		type: 'document',
		icon: icon,
		groups: [
			..._GROUPS,
			...(groups || [])
		],
		fields: documentFields,
		preview: documentPreview,
	})
}