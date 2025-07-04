import { Suspense } from 'react'
import { Skeleton } from './loading'
import { Text } from './Text'
import { Text_block } from '@next-app/sanity.types'

const TextWithLoader = ({ data, className }: { data: Text_block , className?: string }) => {
	return (
		<Suspense fallback={<Skeleton />}>
			<Text data={data} className={className}  />
		</Suspense>
	)
}

export default TextWithLoader