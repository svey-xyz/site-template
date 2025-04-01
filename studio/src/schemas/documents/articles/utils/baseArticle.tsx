import { _ARTICLE_FIELDS } from "@schemas.studio/documents/articles/utils/fields";
import { _ARTICLE_GROUPS } from "@schemas.studio/documents/articles/utils/groups";
import { _ARTICLE_PREVIEW } from "@schemas.studio/documents/articles/utils/preview";
import { defineType } from "sanity";

export const _BASE_ARTICLE = defineType({
	title: 'Base Article',
	name: 'baseArticle',
	type: 'document',
	groups: _ARTICLE_GROUPS,
	fields: [
		..._ARTICLE_FIELDS
	],
	preview: _ARTICLE_PREVIEW
})