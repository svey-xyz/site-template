import { Suspense } from 'react'
import { Skeleton } from './loading'
import { Text } from './Text'

const TextWithLoader = ({ data, className, draft }: { data: block_Text | undefined, className?: string, draft?: boolean }) => {
	return (
		<Suspense fallback={<Skeleton />}>
			<Text data={data} className={className} draft={draft} />
		</Suspense>
	)
}

export default TextWithLoader