import { notFound } from 'next/navigation'

import { Page } from '@/components/Pages/Page'
import { loadArticles, loadPage } from '@/sanity/queries/loadQuery'
import { draftMode } from 'next/headers'

type Props = {
	params: { slug: Array<string> }
}

export const PageRoute = async ({ params }: Props) => {
	const draft = (await draftMode()).isEnabled

	const data = await loadPage(params.slug[0], draft)

	if (!data) {
		notFound()
	}

	return <Page data={data} />
}