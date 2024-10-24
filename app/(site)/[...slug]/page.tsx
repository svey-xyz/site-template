import type { Metadata, ResolvingMetadata } from 'next'
import { loadPage, loadStaticPages } from '@/sanity/queries/loadQuery'
import Pages from '@/components/Pages'
import { notFound } from 'next/navigation';

export const generateStaticParams = async () => {
	const pages = await loadStaticPages();
	console.log('Pages: ', pages)
	if (!pages) notFound()

	return pages.map((page) => ({
		slug: page.slug,
	}));
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