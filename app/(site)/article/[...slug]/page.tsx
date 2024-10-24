import type { Metadata, ResolvingMetadata } from 'next'
import { load_singleArticle, loadArticles } from '@/sanity/queries/loadQuery'
import Pages from '@/components/Pages'
import ARTICLES from '@/sanity/schemas/articles'
import { notFound } from 'next/navigation'

// export const generateStaticParams = async () => {
// 	return ARTICLES.flatMap(async (ArticleType) => {
// 		const articles = await loadArticles<article>(ArticleType.type);

// 		if (!articles) []

// 		return articles.map((article) => ({
// 			slug: [article._type, article.slug]
// 		}));
// 	})
	
// }


type Props = {
	params: { slug: string }
}

export const generateMetadata = async(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> => {
	const { slug } = params
	const article = await load_singleArticle<article>(slug[0], slug[1])

	return {
		title: article?.title
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