import { Suspense } from 'react'
import { Skeleton } from './loading'
import { Text as TextComponent } from './Text'
import { Text_block } from '@next-app/sanity.types'

const TextWithLoader = ({ data, className }: { data: Text_block , className?: string }) => {
	return (
		<Suspense fallback={<Skeleton />}>
			<TextComponent data={data} className={className}  />
		</Suspense>
	)
}

export const Text = TextWithLoader

export default TextWithLoader