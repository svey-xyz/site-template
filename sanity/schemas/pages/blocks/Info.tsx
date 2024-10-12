import { defineField } from 'sanity';
import { IoInformationCircleSharp } from "react-icons/io5";
import constructors from '@/sanity/schemas/pages/constructors';
import { RiImageCircleFill } from "react-icons/ri";
import { Icon } from '@iconify/react';
import { TbChartInfographic } from "react-icons/tb";

const fields = [
	defineField({
		title: 'Title',
		name: 'title',
		type: 'string',
		validation: Rule => Rule.required()
	}),
	defineField({
		title: 'Items',
		name: 'items',
		type: 'array',
		of: [
			{
				type: 'object',
				name: 'item',
				title: 'Item',
				icon: IoInformationCircleSharp,
				fields: [
					defineField({
						title: 'Title',
						name: 'title',
						type: 'string',
					}),
					defineField({
						title: 'Sub Title',
						name: 'subTitle',
						type: 'string',
					}),
					defineField({
						name: 'infoType',
						title: 'Info Type',
						type: 'string',
						options: {
							list: [
								{ title: 'Icon', value: 'icon' },
								{ title: 'Animated Number', value: 'number' },
							],
							layout: 'radio',
						},
						initialValue: 'icon',
						validation: Rule => Rule.required()
					}),
					defineField({
						title: 'Icon',
						name: 'icon',
						type: 'icon',
						hidden: ({ parent, value }) => parent?.infoType !== 'icon',
						validation: (Rule: any) => Rule.custom((field: any, context: any) => ((context.parent as any).infoType == 'icon' && field == undefined) ? 'This field is required.' : true),
					}),
					defineField({
						title: 'Number',
						name: 'number',
						type: 'number',
						hidden: ({ parent, value }) => parent?.infoType !== 'number',
						validation: (Rule) => Rule.custom((field, context) => ((context.parent as any).infoType == 'number' && field == undefined) ? 'This field is required.' : true),
					}),
				],
				preview: {
					select: {
						type: 'infoType',
						title: 'title',
						subTitle: 'subTitle',
						icon: 'icon',
						number: 'number',
					},
					prepare(value: any) {
						const { type, title, subTitle, icon, number } = value
						
						return {
							title: title ? title : 'Untitled Info Section',
							subtitle: subTitle ? subTitle : `Type: ${type}`,
							media:
								type == 'icon' ? icon ? <Icon icon={icon.name} /> : RiImageCircleFill :
								type == 'number' ? <span>{number}</span> : IoInformationCircleSharp,
						}
					},
				},
			}
		]
	}),
]

export const Info = constructors.block({ name: 'Info', fields, icon: TbChartInfographic })