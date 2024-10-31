'use client'

import { Page } from '@/components/Pages/Page'
import { pageQuery } from '@/sanity/queries/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { type QueryResponseInitial } from '@sanity/react-loader'

type Props = {
	initial: QueryResponseInitial<PagePayload | null>
}

const PagePreview = (props: Props) => {
	const { initial } = props
	const { data, encodeDataAttribute } = useQuery<PagePayload | null>(
		pageQuery,
		{},
		{ initial },
	)

	if (!data) {
		return (
			<div className="text-center">
				Please start editing your Home document to see the preview!
			</div>
		)
	}

	return <Page data={data} draft={true} />
}

export default PagePreview