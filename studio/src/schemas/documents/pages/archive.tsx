import { _PAGE_FIELDS } from "@schemas.studio/documents/pages/utils/fields"
import { _PAGE_PREVIEW } from "@schemas.studio/documents/pages/utils/preview"
import { defineField, defineType } from "sanity"

const _FIELDS: any = [
]

export const archive = defineType({ 
	name: 'archive',
	type: 'document',
	fields: [
		..._PAGE_FIELDS,
		..._FIELDS
	],
	preview: _PAGE_PREVIEW
 })