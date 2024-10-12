import { defineField } from 'sanity';
import { } from 'react-icons';
import constructors from '@/sanity/schemas/pages/constructors';
import { MdOutlineContactMail } from 'react-icons/md';

const fields: any = [
	defineField({
		title: 'Button Text',
		name: 'buttonText',
		type: 'string',
	}),
]

export const Contact = constructors.block({ name: 'Contact', fields, icon: MdOutlineContactMail })