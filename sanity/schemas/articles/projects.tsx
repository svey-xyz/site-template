import { defineArrayMember, defineField, defineType } from "sanity";

import { BsFillBookmarkFill } from 'react-icons/bs'
import { ARTICLE } from "@/sanity/schemas/articles/constructors/article";

const fields = [
	defineField({
		title: 'Date',
		name: 'date',
		type: 'basicDate',
		group: 'about',
	}),
	defineField({
		title: 'Write-up',
		name: 'writeup',
		type: 'extraBlockContent',
		description: 'Full write-up of the project.',
	}),
	defineField({
		title: 'Gallery',
		name: 'gallery',
		type: 'array',
		of: [
			defineArrayMember({
				type: 'image'
			})
		]
	}),
	defineField({
		title: 'Credits',
		name: 'credits',
		type: 'basicBlockContent',
	}),
	defineField({
		title: 'Sponsor(s)',
		name: 'sponsors',
		type: 'array',
		of: [
			defineArrayMember({
				type: 'reference',
				to: [{ type: 'sponsor' }]
			})
		],
	}),
]

const args = { type: 'project', fields, icon: BsFillBookmarkFill }
export const projects = new ARTICLE(args)

