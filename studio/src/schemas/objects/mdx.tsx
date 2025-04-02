// import { MDEditor } from "@src./components/MDEditor"
import { MDEditor } from "@components.studio/MDEditor"
import { defineType } from "sanity"

export const markdownTypeName = 'mdx' as const
export const markdownSchemaType = defineType({
	type: 'string',
	name: markdownTypeName,
	title: 'Markdown',
	components: { input: MDEditor },
})