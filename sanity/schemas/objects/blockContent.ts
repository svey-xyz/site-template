import { defineType, defineArrayMember } from 'sanity'
import { mediaAssetSource } from 'sanity-plugin-media'

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

const blockArray = {
	title: 'Block',
	type: 'block',
	// Styles let you define what blocks can be marked up as. The default
	// set corresponds with HTML tags, but you can set any title or value
	// you want, and decide how you want to deal with it where you want to
	// use your content.
	styles: [
		{ title: 'Normal', value: 'normal' },
		{ title: 'H1', value: 'h1' },
		{ title: 'H2', value: 'h2' },
		{ title: 'H3', value: 'h3' },
		{ title: 'H4', value: 'h4' },
		{ title: 'Quote', value: 'blockquote' },
	],
	lists: [{ title: 'Bullet', value: 'bullet' }],
	// Marks let you mark up inline text in the Portable Text Editor
	marks: {
		// Decorators usually describe a single property – e.g. a typographic
		// preference or highlighting
		decorators: [
			{ title: 'Strong', value: 'strong' },
			{ title: 'Emphasis', value: 'em' },
			{ "title": "Underline", "value": "underline" },
			{ "title": "Strike", "value": "strike-through" },
		],
		// Annotations can be any object structure – e.g. a link or a footnote.
		annotations: [
			{
				title: 'URL',
				name: 'link',
				type: 'object',
				fields: [
					{
						title: 'URL',
						name: 'href',
						type: 'url',
					},
				],
			},
		],
	},
}
 
export const basicBlockContent = defineType({
  title: 'Block Content',
	name: 'basicBlockContent',
  type: 'array',
  of: [
		defineArrayMember(blockArray),
  ],
})

export const extraBlockContent = defineType({
	title: 'Block Content',
	name: 'extraBlockContent',
	type: 'array',
	of: [
		defineArrayMember(blockArray),
		// You can add additional types here. Note that you can't use
		// primitive types such as 'string' and 'number' in the same array
		// as a block type.
		defineArrayMember({
			type: 'image',
			options: {
				sources: [mediaAssetSource],
				hotspot: true
			},
		}),
	],
})