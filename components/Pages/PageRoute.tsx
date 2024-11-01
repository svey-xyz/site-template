import { notFound } from 'next/navigation'

import { Page } from '@/components/Pages/Page'
import { draftMode } from 'next/headers'
import dynamic from 'next/dynamic'
import { queryClient } from '@/sanity/loader/loadQuery'
import { pageQuery } from '@/sanity/queries/queries'

type Props = {
	params: { slug: Array<string> }
}

const PagePreview = dynamic(
	() => import('@/components/Pages/PagePreview'),
)

const loadSingle_Page = async (slug: string) => {
	const initial = await queryClient<PagePayload | null>(
		pageQuery,
		{ pathname: `${slug}` },
		{ next: { tags: [`page:${slug}`, 'home'] } },
	)
	return initial
}

export const PageRoute = async ({ params }: Props) => {

	const initial = await loadSingle_Page(params.slug[0]);

	const draft = await draftMode()
	if (draft.isEnabled) return <PagePreview initial={initial} />

	if (!initial.data) notFound()

	return <Page data={initial.data} draft={false} />
}