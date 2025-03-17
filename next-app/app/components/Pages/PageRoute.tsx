import { notFound } from 'next/navigation'

import { Page } from '@components.next-app/Pages/Page'
import { draftMode } from 'next/headers'
import dynamic from 'next/dynamic'
import { queryClient } from '@sanity.next-app/loader/loadQuery'
import { getPageQuery, pageQuery } from '@sanity.next-app/queries/queries'
import { ResolvingMetadata, Metadata } from 'next'
import { sanityFetch } from '@sanity.next-app/lib/live'

type Props = {
	params: { slug: Array<string> }
}

const PagePreview = dynamic(
	() => import('@components.next-app/Pages/PagePreview'),
)

const loadSingle_Page = async (slug: string, draft?: boolean) => {
	const initial = await queryClient<any | null>(
		pageQuery,
		{ slug: `${slug}` },
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
	// const initial = await loadSingle_Page(params.slug[0]);

	console.log('PageRoute: ', params)

	const [{ data: page }] = await Promise.all([
		sanityFetch({ query: getPageQuery, params: { slug: params?.slug[0] } }),
	]);

	// if (draft.isEnabled) return <PagePreview initial={initial} />
	if (!page) notFound()

	return <Page data={page} draft={false} />
}