import { camelCaseToWords } from "@lib.studio/stringFunctions";
import { _ARTICLE_FIELDS } from "@schemas.studio/documents/articles/utils/fields";
import { _ARTICLE_PREVIEW } from "@schemas.studio/documents/articles/utils/preview";
import { defineType } from "sanity";
import { _ARTICLE_TYPES } from "@root.site-template/DocumentTypes";
import { _ARTICLE_GROUPS } from "@schemas.studio/documents/articles/utils/groups";
import { CommandLineIcon } from "@heroicons/react/24/solid";

const _commandLineIcon = () => <CommandLineIcon />;
const articleType = _ARTICLE_TYPES.PROJECT

export const project = defineType({
	title: camelCaseToWords(articleType),
	name: articleType,
	type: 'document',
	icon: _commandLineIcon,
	groups: _ARTICLE_GROUPS,
	fields: [
		..._ARTICLE_FIELDS
	],
	preview: _ARTICLE_PREVIEW
})