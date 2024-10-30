import type { Metadata, ResolvingMetadata } from 'next'
import { loadPage, loadStaticPages } from '@/sanity/queries/loadQuery'
import Pages from '@/components/Pages'
import { draftMode } from 'next/headers';

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
	params: Promise<{ slug: Array<string> }>
}

export const generateMetadata = async (props: Props, parent: ResolvingMetadata): Promise<Metadata> => {
    const params = await props.params;
		const draft = (await draftMode()).isEnabled
		
    const page = await loadPage(params.slug[0], draft)

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