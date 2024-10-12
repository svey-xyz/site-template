import { blockTypes } from "@/sanity/schemas/pages/blocks";
import { camelCaseToWords } from "@lib/stringFunctions";
import { IconType } from "react-icons";
import { defineField, defineType, FieldDefinition } from "sanity";
import { mediaAssetSource } from "sanity-plugin-media";
// import { blockTypes } from './blocks';
type fields = FieldDefinition<"string" | "number" | "boolean" | "object" | "array" | "block" | "date" | "datetime" | "document" | "file" | "geopoint" | "image" | "reference" | "crossDatasetReference" | "slug" | "text" | "url" | "email" | "color", undefined>[]

export const page = (args: { name: string, fields?: fields, icon?: IconType | undefined }) => {
	const { name, icon, fields } = args
	const generatedFields = fields?.map(field => {
		return field
	})
	const customPageFields = generatedFields ? generatedFields : []

	const _PREVIEW = {
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

	const _FIELDS = [
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: Rule => Rule.required()
		}),
		defineField({
			title: 'Description',
			name: 'description',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			title: 'Hero Image',
			name: 'heroImage',
			type: 'image',
			description: 'When a hero image is set, a hero will appear with the page title and image.',
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
		defineField({
			title: 'Sections',
			name: 'sections',
			type: 'array',
			of: [{ type: 'section' }],
		}),
	]

	return defineType({
		title: camelCaseToWords(name),
		name: name,
		type: 'document',
		icon: icon,
		fields: [
			..._FIELDS,
			...customPageFields,
		],
		preview: _PREVIEW
	})
}