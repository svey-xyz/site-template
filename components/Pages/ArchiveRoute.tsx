import { notFound } from 'next/navigation'

import { Page } from '@/components/Pages/Page'
import { loadArchive } from '@/sanity/queries/loadQuery'

type Props = {
	params: { slug: string }
}

export const ArchiveRoute = async ({ params }: Props) => {
	const initial = await loadArchive(params.slug)

	if (!initial.data) {
		notFound()
	}

	return <Page data={initial.data} />
}