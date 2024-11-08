'use client'

import { Page } from '@/components/Pages/Page'
import { useQuery } from '@/sanity/loader/useQuery'
import { pageQuery } from '@/sanity/queries/queries'
import { type QueryResponseInitial } from '@sanity/react-loader'

type Props = {
	initial: QueryResponseInitial<PagePayload | null>
}

export function useSingle_Page(initial: QueryResponseInitial<PagePayload | null>) {
	const pathname = `${initial?.data?.pathname?.current}`
	return useQuery<PagePayload | null>(pageQuery, { pathname }, { initial })
}

const PagePreview = (props: Props) => {
	const { initial } = props
	const { data, encodeDataAttribute } = useSingle_Page(initial)

	if (!data) {
		return (
			<div className="main-padding text-center">
				Please start editing your document to see the preview!
			</div>
		)
	}

	return <Page data={data} draft={true} />
}

export default PagePreview