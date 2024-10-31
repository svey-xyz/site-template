import { notFound } from 'next/navigation'

import { Page } from '@/components/Pages/Page'
import { loadSingle_Page } from '@/sanity/queries/loader'

type Props = {
	params: { slug: Array<string> }
}

export const PageRoute = async ({ params }: Props) => {

	const data = await loadSingle_Page(params.slug[0])

	if (!data) {
		notFound()
	}

	return <Page data={data} />
}