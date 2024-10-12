import { notFound } from 'next/navigation'

import { Page } from '@/components/Pages/Page'
import { loadArticles, loadPage } from '@/sanity/queries/loadQuery'

type Props = {
	params: { slug: Array<string> }
}

export const PageRoute = async ({ params }: Props) => {
	const initial = await loadPage(params.slug[0])

	if (!initial.data) {
		notFound()
	}

	return <Page data={initial.data} />
}