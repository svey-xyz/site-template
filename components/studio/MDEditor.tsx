import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { StringInputProps } from 'sanity'

const EditorComp = dynamic(() => import('@/components/studio/InputMDX'), { ssr: false })
export const MDEditor = (props: StringInputProps) => {
	return (
		<Suspense fallback={<>Loading...</>}>
			<EditorComp {...props} />
		</Suspense>
	)
}