import type { Metadata, ResolvingMetadata } from 'next'
import { loadArchive, loadStaticArchives } from '@/sanity/queries/loadQuery'
import Pages from '@/components/Pages'
import { notFound } from 'next/navigation';

export const generateStaticParams = async () => {
	const archives = await loadStaticArchives();

	if (!archives) return notFound()

	return archives.map((archive) => ({
		slug: archive._id,
	}));
}

type Props = {
	params: { slug: string }
}

export const generateMetadata = async(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> => {
	const archive = await loadArchive(params.slug)

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