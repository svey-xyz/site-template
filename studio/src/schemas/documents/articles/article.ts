import { camelCaseToWords } from "shared-lib/StringTransforms"
import { _ARTICLE_FIELDS } from "@schemas.studio/documents/articles/utils/fields";
import { _ARTICLE_PREVIEW } from "@schemas.studio/documents/articles/utils/preview";
import { defineType } from "sanity";
import { _ARTICLE_TYPES } from "@root.site-template/DocumentTypes";
import { _ARTICLE_GROUPS } from "@schemas.studio/documents/articles/utils/groups";

const articleType = _ARTICLE_TYPES.ARTICLE

export const article = defineType({
	title: camelCaseToWords(articleType),
	name: articleType,
	type: 'document',
	groups: _ARTICLE_GROUPS,
	fields: [
		..._ARTICLE_FIELDS
	],
	preview: _ARTICLE_PREVIEW
})