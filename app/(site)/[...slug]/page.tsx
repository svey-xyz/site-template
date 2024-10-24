import type { Metadata, ResolvingMetadata } from 'next'
import { loadPage, loadStaticPages } from '@/sanity/queries/loadQuery'
import Pages from '@/components/Pages'

export async function generateStaticParams() {
	
	try {
		const pages = await loadStaticPages();
		console.log('Pages: ', pages)
		if (!pages) return []

		return pages.map((page) => ({
			slug: page.slug.split('/'),
		}));
		// return ([{
		// 	slug: ['home']
		// }])
	} catch (error) {
		console.error("Error fetching products:", error);
		throw new Error("Failed to fetch products");
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