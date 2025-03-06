'use client'

import { Page } from '@components.next-app/Pages/Page'
import { useQuery } from '@sanity.next-app/loader/useQuery'
import { pageQuery } from '@sanity.next-app/queries/queries'
import { type QueryResponseInitial } from '@sanity/react-loader'

type Props = {
	initial: QueryResponseInitial<any | null>
}

export function useSingle_Page(initial: QueryResponseInitial<any | null>) {
	const pathname = `${initial?.data?.pathname?.current}`
	return useQuery<any | null>(pageQuery, { pathname }, { initial })
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

	return <>
	Preview
		<Page data={data} draft={true} />
	</>
}

export default PagePreview