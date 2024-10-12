import { defineType, defineField } from "sanity";
import { BiLink } from 'react-icons/bi';

const URLExpression = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
const slugExpression = new RegExp(/^[/]+[a-z0-9]+(?:(?:-|_)+[a-z0-9]+)*$/)

export const link = defineType({
	title: 'Link',
	name: 'link',
	icon: BiLink,
	type: 'object',
	fields: [
		defineField({
			title: 'Link Text',
			name: 'text',
			type: 'string',
			validation: Rule => Rule.required(),
		}),
		defineField({
			title: 'Type',
			name: 'type',
			type: 'string',
			options: {
				list: [
					{ title: 'Internal', value: 'internal' },
					{ title: 'External', value: 'external' },
				],
			},
		}),
		defineField({
			title: 'Link',
			name: 'link',
			type: 'string',
			hidden: ({ parent, value }) => parent?.type !== 'external',
			validation: Rule => Rule.custom((field, context) => {
				const type: string | undefined = (context.parent as any).type
				if (type !== 'external') return true
				if (!field) return 'This field must not be empty'

				return URLExpression.test(field) ? true : `This doesn't look like a URL.`
			}),
		}),
		defineField({
			title: 'Page',
			name: 'page',
			type: 'reference',
			to: [{type: 'page'}, {type: 'archive'}],
			options: {
				disableNew: true,
			},
			hidden: ({ parent, value }) => parent?.type !== 'internal',
			validation: Rule => Rule.custom((field, context) => {
				const type: string | undefined = (context.parent as any).type
				if (type !== 'internal') return true
				if (!field) return 'This field must not be empty'
				return true
			}),
		}),

	],
	preview: {
		select: {
			title: 'text',
			type: 'type',
			link: 'link',
			page: 'page',
		},
		prepare(value: any) {
			const { title, type, link, page } = value
			const linkText = type == 'external' ? link : page.slug.current
			return {
				title: title ? title  : `Link text not set.`,
				subtitle: linkText,
				media: BiLink
			}
		}
	}
})