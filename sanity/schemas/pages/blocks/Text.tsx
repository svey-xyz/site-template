import { defineField, defineType, StringInputProps } from 'sanity';

import constructors from '@/sanity/schemas/pages/constructors';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid';
import InputMDX from '@/components/studio/InputMDX';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const fields = [
	defineField({
		title: 'Text',
		name: 'text',
		type: 'mdx',
	}),
]
const EditorComp = dynamic(() => import('@/components/studio/InputMDX'), { ssr: false })
const Editor = (props: StringInputProps) => {
	return (
		<Suspense fallback={null}>
			<EditorComp {...props} />
		</Suspense>
	)
}

export const markdownTypeName = 'mdx' as const
export const markdownSchemaType = defineType({
	type: 'string',
	name: markdownTypeName,
	title: 'Markdown',
	components: { input: Editor },
})

export const Text = constructors.block({ name: 'Text', fields, Icon: Bars3BottomLeftIcon })