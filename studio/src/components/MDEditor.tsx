// import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { StringInputProps } from 'sanity'
import EditorComp from './InputMDX'

export const MDEditor = (props: StringInputProps) => {
	return (
		<Suspense fallback={<>Loading...</>}>
			<EditorComp {...props} />
		</Suspense>
	)
}