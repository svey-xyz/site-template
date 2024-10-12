import type { Metadata, ResolvingMetadata } from 'next'
import { loadArchive } from '@/sanity/queries/loadQuery'
import Pages from '@/components/Pages'

type Props = {
	params: { slug: string }
}

export const generateMetadata = async(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> => {
	const { data: archive } = await loadArchive(params.slug)

	return {
		title: archive?.title,
		// description: page?.overview
		// 	? toPlainText(page.overview)
		// 	: (await parent).description,
	}
}

const Page = ({ params }: Props) => {
	return <Pages.ArchiveRoute params={params} />
}

export default Page