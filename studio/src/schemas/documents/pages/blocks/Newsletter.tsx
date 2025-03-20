import constructors from '../utils';
import { defineField } from 'sanity';

import { EnvelopeOpenIcon } from '@heroicons/react/24/solid'

const fields: any = [
	defineField({
		title: 'Note',
		name: 'note',
		type: 'note',
		description: 'Newsletter signup block.'
	}),
	defineField({
		title: 'Call To Action',
		name: 'callToAction',
		type: 'string',
	}),
	defineField({
		title: 'Text',
		name: 'text',
		type: 'string'
	})
]

export const Newsletter = constructors.block({ name: 'Newsletter', fields, Icon: EnvelopeOpenIcon })