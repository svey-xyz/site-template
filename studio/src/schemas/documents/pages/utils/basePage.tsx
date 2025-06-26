import { _PAGE_FIELDS } from "@schemas.studio/documents/pages/utils/fields";
import { _PAGE_PREVIEW } from "@schemas.studio/documents/pages/utils/preview";
import { defineType } from "sanity";

export const _BASE_PAGE = defineType({
	title: 'Base Article',
	name: 'baseArticle',
	type: 'document',
	fields: [
		..._PAGE_FIELDS
	],
	preview: _PAGE_PREVIEW
})