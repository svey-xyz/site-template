import { camelCaseToWords } from "@lib.studio/stringFunctions";
import { _ARTICLE_FIELDS } from "@schemas.studio/documents/articles/utils/fields";
import { _ARTICLE_PREVIEW } from "@schemas.studio/documents/articles/utils/preview";
import { defineType } from "sanity";
import { _ARTICLE_TYPES } from "@root.site-template/DocumentTypes";

const articleType = _ARTICLE_TYPES.ARTICLE

export const article = defineType({
	title: camelCaseToWords(articleType),
	name: articleType,
	type: 'document',
	fields: [
		..._ARTICLE_FIELDS
	],
	preview: _ARTICLE_PREVIEW
})