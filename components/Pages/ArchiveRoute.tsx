import { notFound } from 'next/navigation'

import { Page } from '@/components/Pages/Page'
import { loadSingle_Archive } from '@/sanity/loader/loader'

type Props = {
	params: { slug: string }
}

export const ArchiveRoute = async ({ params }: Props) => {
	const data = await loadSingle_Archive(params.slug)

	if (!data) {
		notFound()
	}

	return <Page data={data} />
}