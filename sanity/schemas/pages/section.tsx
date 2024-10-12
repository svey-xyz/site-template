import { camelCaseToWords } from "@/lib/stringFunctions";
import { blockTypes } from "@/sanity/schemas/pages/blocks";
import { block } from "@/types";
import { defineType, defineField, FieldDefinition } from "sanity";
import { mediaAssetSource } from "sanity-plugin-media";
import { IoIosColorFill } from "react-icons/io";
import { BiMoviePlay } from "react-icons/bi";
import { FaImage } from "react-icons/fa";
import { TbSection } from "react-icons/tb";

export const section = defineType({
	title: 'Section',
	name: 'section',
	type: 'object',
	fields: [
		defineField({
			name: 'type',
			title: 'Section Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Standard', value: 'Standard' },
					{ title: 'Colour', value: 'Colour' },
					{ title: 'Image', value: 'Image' },
					{ title: 'Video', value: 'Video' },
				],
				layout: 'dropdown',
			},
			initialValue: 'Standard',
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'header',
			title: 'Header',
			type: 'string',
		}),
		defineField({
			name: 'columns',
			title: 'Columns',
			type: 'boolean',
		}),
		defineField({
			name: 'video',
			title: 'Video',
			type: 'string',
			description: '',
			hidden: ({ parent, value }) => parent?.type !== 'Video',
			validation: Rule => Rule.custom((field, context) => ((context.parent as any).type == 'Video' && field == undefined) ? 'This field is required.' : true),
		}),
		defineField({
			title: 'Image',
			name: 'image',
			type: 'image',
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
			hidden: ({ parent, value }) => parent?.type !== 'Image',
		}),
		defineField({
			name: 'colour',
			title: 'Colour',
			type: 'string',
			description: '',
			options: {
				list: [
					{ title: 'Accent', value: 'accent' },
					{ title: 'Secondary Accent', value: 'accent-secondary' },

				],
			},
			hidden: ({ parent, value }) => parent?.type !== 'Colour',
		}),

		defineField({
			title: 'Blocks',
			name: 'blocks',
			type: 'array',
			of: blockTypes,
		}),
	],
	preview: {
		select: {
			type: 'type',
			columns: 'columns',
			blocks: 'blocks'
			// logo: 'logo',
		},
		prepare(value: any) {
			const { type, blocks, columns } = value
			const ColumnsText = columns ? `Columns | ` : ``
			const subtitle = blocks ? 
				`${ColumnsText}Blocks: ${blocks?.map((block: block, i: number, arr: Array<block>) => {
					return ` ${camelCaseToWords(block._type)}`
				})}` :
				`No blocks configured!`
			return {
				title: `${type} Section`,
				subtitle,
				media: (() => {
					switch (type) {
						case ('Colour'):
							return IoIosColorFill 
						case ('Image'):
							return FaImage
						case ('Video'):
							return BiMoviePlay
						default:
							return TbSection
					}
				})(),
			}
		},
	},
})