import type { Metadata, ResolvingMetadata } from 'next'
import { loadPage, loadStaticPages } from '@/sanity/queries/loadQuery'
import Pages from '@/components/Pages'

export const generateStaticParams = async () => {
	try {
		const pages = await loadStaticPages();
		if (!pages) return []

		return pages.map((page) => ({
			slug: page.slug.split('/'),
		}));
	} catch (error) {
		console.error("Error fetching pages:", error);
		throw new Error("Failed to fetch pages");
	}
}

type Props = {
	params: { slug: Array<string> }
}

export const generateMetadata = async(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> => {
	const page = await loadPage(params.slug[0])

	return {
		title: page?.title,
		// description: page?.overview
		// 	? toPlainText(page.overview)
		// 	: (await parent).description,
	}
}

const Page = ({ params }: Props) => {
	return <Pages.PageRoute params={params} />
}

export default Page