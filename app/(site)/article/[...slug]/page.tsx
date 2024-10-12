import type { Metadata, ResolvingMetadata } from 'next'
import { loadArticles, loadPage } from '@/sanity/queries/loadQuery'
import Pages from '@/components/Pages'

type Props = {
	params: { slug: string }
}

export const generateMetadata = async(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> => {
	const { data: page } = await loadPage(params.slug)

	return {
		title: page?.title,
		// description: page?.overview
		// 	? toPlainText(page.overview)
		// 	: (await parent).description,
	}
}

const Page = ({ params }: Props) => {
	const { slug } = params

	return <Pages.ArticleRoute type={slug[0]} slug={slug[1]} />
}

export default Page