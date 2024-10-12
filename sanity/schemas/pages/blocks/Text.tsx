import { defineType, defineField, defineArrayMember } from 'sanity';
import { } from 'react-icons';
import { mediaAssetSource } from 'sanity-plugin-media';

import constructors from '@/sanity/schemas/pages/constructors';
import { BsJournalRichtext } from 'react-icons/bs';

const fields = [
	defineField({
		title: 'Text',
		name: 'text',
		type: 'array',
		of: [
			{type: 'block'},
		],
	}),
	defineField({
		title: 'Link',
		name: 'link',
		type: 'link',
		description: 'A link to appear as a button underneath the text.',
	}),
]

export const Text = constructors.block({ name: 'Text', fields, icon: BsJournalRichtext })