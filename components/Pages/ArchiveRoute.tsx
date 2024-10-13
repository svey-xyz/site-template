import { notFound } from 'next/navigation'

import { Page } from '@/components/Pages/Page'
import { loadArchive } from '@/sanity/queries/loadQuery'

type Props = {
	params: { slug: string }
}

export const ArchiveRoute = async ({ params }: Props) => {
	const data = await loadArchive(params.slug)

	if (!data) {
		notFound()
	}

	return <Page data={data} />
}