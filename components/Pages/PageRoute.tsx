import { notFound } from 'next/navigation'

import { Page } from '@/components/Pages/Page'
import { loadSingle_Page } from '@/sanity/loader/loader'
import { draftMode } from 'next/headers'
import dynamic from 'next/dynamic'

type Props = {
	params: { slug: Array<string> }
}

const PagePreview = dynamic(
	() => import('@/components/Pages/PagePreview'),
)

export const PageRoute = async ({ params }: Props) => {

	const initial = await loadSingle_Page(params.slug[0]);

	const draft = await draftMode()
	if (draft.isEnabled) return <PagePreview initial={initial} />

	if (!initial.data) notFound()

	return <Page data={initial.data} />
}