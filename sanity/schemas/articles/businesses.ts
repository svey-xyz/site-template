import { defineArrayMember, defineField, defineType } from "sanity";
import { FieldGroupDefinition } from 'sanity'

import { FaIdCard, FaNoteSticky, FaStore } from "react-icons/fa6";
import { mediaAssetSource } from "sanity-plugin-media";
import { IoStorefront } from "react-icons/io5";
import { ARTICLE } from "@/sanity/schemas/articles/constructors/article";

const groups: FieldGroupDefinition[] = [
	{
		name: 'contact',
		title: 'Contact',
		icon: FaIdCard,
	},
	{
		name: 'notes',
		title: 'Notes',
		icon: FaNoteSticky,
	},
]

const fields = [
	defineField({
		title: 'Active',
		name: 'active',
		type: 'boolean',
		initialValue: false,
		description: 'Set to false to archive the business.',
		group: 'about',
	}),
	defineField({
		title: 'Logo',
		name: 'logo',
		type: 'image',
		group: 'about',
		options: {
			sources: [mediaAssetSource],
		},
		preview: {
			select: {
				asset: 'asset',
				title: 'asset.title',
				description: 'asset.description'

			},
			prepare(value: any) {
				return {
					title: value.title ? value.title : 'Untitled Image',
					subtitle: value.description,
					media: value.asset
				}
			}
		},
	}),
	defineField({
		title: 'Addresses',
		name: 'addresses',
		type: 'array',
		of: [
			{
				type: 'reference',
				to: [{ type: 'address' }],
			}
		],
		
		group: 'about',
	}),

	/** CONTACT */

	defineField({
		title: 'Public Contact',
		name: 'publicContact',
		type: 'contact',
		group: 'contact',
		description: 'This information may be displayed publicly'
	}),
	defineField({
		title: 'Internal Contacts',
		name: 'internalContacts',
		type: 'array',
		of: [defineArrayMember({ type: 'contact' })],
		group: 'contact',
		description: 'This information is for internal use only'
	}),
	defineField({
		title: 'Name',
		name: 'contactName',
		type: 'string',
		description: 'Internal contact person.',
	}),

	/** NOTES */

	defineField({
		title: 'LastSaturday',
		name: 'lastSaturday',
		type: 'boolean',
		group: 'notes',
	}),
	defineField({
		title: 'CafeTO',
		name: 'cafeTO',
		type: 'boolean',
		group: 'notes',
	}),
	defineField({
		title: 'Notes',
		name: 'notes',
		type: 'text',
		group: 'notes',
	}),
]


const customPreview = {
	select: {
		title: 'title',
		logo: 'logo',
	},
	prepare(value: any) {
		const { title, logo } = value
		return {
			title: title ? title : 'Untitled Business',
			media: logo ? logo : FaStore,
		}
	},
}

const args = { type: 'business', fields, groups, icon: IoStorefront, customPreview }
export const businesses = new ARTICLE(args)



