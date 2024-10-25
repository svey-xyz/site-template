import { camelCaseToWords } from "@lib/stringFunctions";
import { ComponentType } from "react";
import { defineType, PreviewConfig, defineField, EmptyProps } from "sanity";

export const block = (
	args: {
		name: string,
		fields: sanityFields,
		preview?: PreviewConfig<any>
		Icon?: ComponentType
	}) => {
	const { name, fields, preview, Icon } = args

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
			}
		},
	}

	const _FIELDS: Array<{}> = [
	]

	return defineType({
		title: camelCaseToWords(name),
		name: name,
		type: 'object',
		icon: Icon ? () => <Icon /> : undefined,
		fields: [
			..._FIELDS,
			...fields
		],
		preview: preview ?? _PREVIEW
	})
}