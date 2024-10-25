import type { Metadata, ResolvingMetadata } from 'next'
import { loadArchive, loadStaticArchives } from '@/sanity/queries/loadQuery'
import Pages from '@/components/Pages'

export const generateStaticParams = async () => {
	try {
		const archives = await loadStaticArchives();
		if (!archives) return []

		return archives.map((archive) => ({
			slug: [archive._id],
		}));
	} catch (error) {
		console.error("Error fetching archives:", error);
		throw new Error("Failed to fetch archives");
	}
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