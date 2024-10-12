import { camelCaseToWords } from "@lib/stringFunctions";
import { IconType } from "react-icons";
import { defineType, PreviewConfig, defineField } from "sanity";
import { RxSection } from "react-icons/rx";
import { fields } from "@/sanity/lib/types";

export const block = (
	args: {
		name: string,
		fields: fields,
		preview?: PreviewConfig<any>
		icon?: IconType | undefined
	}) => {
	const { name, fields, icon, preview } = args

	const _PREVIEW = {
		select: {
			type: '_type',
			title: 'title',
			// logo: 'logo',
		},
		prepare(value: any) {
			const { type, title } = value
			return {
				title: type ? camelCaseToWords(type) : 'Unknown Block Type',
				media: icon ? icon : RxSection,
			}
		},
	}

	const _FIELDS = [
		defineField({
			name: 'hiddenOnMobile',
			title: 'Hidden on mobile',
			description: 'When enable this block will be hidden on small screens and mobile devices.',
			type: 'boolean'
		})
	]

	return defineType({
		title: camelCaseToWords(name),
		name: name,
		type: 'object',
		icon,
		fields: [
			..._FIELDS,
			...fields
		],
		preview: preview ?? _PREVIEW
	})
}