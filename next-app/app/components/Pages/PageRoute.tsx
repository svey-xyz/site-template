import { notFound } from 'next/navigation'

import { Page } from '@components.next-app/Pages/Page'
import { draftMode } from 'next/headers'
import dynamic from 'next/dynamic'
import { queryClient } from '@sanity.next-app/loader/loadQuery'
import { pageQuery } from '@sanity.next-app/queries/queries'
import { ResolvingMetadata, Metadata } from 'next'

type Props = {
	params: { slug: Array<string> }
}

const PagePreview = dynamic(
	() => import('@components.next-app/Pages/PagePreview'),
)

const loadSingle_Page = async (slug: string, draft?: boolean) => {
	const initial = await queryClient<any | null>(
		pageQuery,
		{ pathname: `${slug}` },
		{ next: { tags: [`page:${slug}`, 'home'] } },
		draft
	)
	return initial
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const { data: page } = await loadSingle_Page(params.slug.join(`/`))

	return {
		title: page?.title,
		description: page?.description
			? (page.description)
			: (await parent).description,
	}
}

export const PageRoute = async ({ params }: Props) => {
	const draft = await draftMode()
	const initial = await loadSingle_Page(params.slug[0], draft.isEnabled);

	if (draft.isEnabled) return <PagePreview initial={initial} />
	if (!initial.data) notFound()

	return <Page data={initial.data} draft={false} />
}