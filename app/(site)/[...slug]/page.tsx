import type { Metadata, ResolvingMetadata } from 'next'
import Pages from '@/components/Pages'
import { loadSingle_Page, loadBundle_Pages } from '@/sanity/queries/loader';

export const generateStaticParams = async () => {
	try {
		const pages = await loadBundle_Pages();
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
	params: Promise<{ slug: Array<string> }>
}

export const generateMetadata = async (props: Props, parent: ResolvingMetadata): Promise<Metadata> => {
    const params = await props.params;
    const page = await loadSingle_Page(params.slug[0])

    return {
		title: page?.title,
		// description: page?.overview
		// 	? toPlainText(page.overview)
		// 	: (await parent).description,
	}
}

const Page = async (props: Props) => {
    const params = await props.params;
    return <Pages.PageRoute params={params} />
}

export default Page