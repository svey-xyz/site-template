import { camelCaseToWords } from "../../../../lib/stringFunctions";
import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from '@heroicons/react/24/solid'
import { customMediaAssetSource } from "../../../../lib/assetSource";
import { blockTypes } from "../blocks";

const _DocumentTextIcon = () => <DocumentTextIcon />;

export const page = (args: { name: string, fields?: sanityFields }) => {
	const { name, fields } = args
	const generatedFields = fields?.map(field => {
		return field
	})
	const customPageFields = generatedFields ? generatedFields : []

	const _PREVIEW = {
		select: {
			title: 'title',
			image: 'image',
			blocks: 'blocks'
		},
		prepare(value: any) {
			const { image, blocks, title } = value
			const subtitle = blocks ?
				`Blocks: ${blocks?.map((block: block, i: number, arr: Array<block>) => {
					return ` ${camelCaseToWords(block._type)}`
				})}` :
				`No blocks configured!`
			return {
				title: `${title}`,
				subtitle,
				media: image ? image : _DocumentTextIcon
			}
		},
	}

	const _FIELDS = [
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: Rule => Rule.required()
		}),
		// definePathname({
		// 	name: "pathname",
		// 	options: {
		// 		source: "title",
		// 		folder: {
		// 			canUnlock: true,
		// 		},
		// 	},
		// 	validation: (Rule) => Rule.required()
		// }),
		defineField({
			title: 'Description',
			name: 'description',
			type: 'mdx',
		}),
		defineField({
			title: 'Hero Image',
			name: 'heroImage',
			type: 'image',
			description: 'When a hero image is set, a hero will appear with the page title and image.',
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
		defineField({
			title: 'Blocks',
			name: 'blocks',
			type: 'array',
			of: blockTypes,
		}),
	]

	return defineType({
		title: camelCaseToWords(name),
		name: name,
		type: 'document',
		icon: _DocumentTextIcon,
		fields: [
			..._FIELDS,
			...customPageFields,
		],
		preview: _PREVIEW
	})
}