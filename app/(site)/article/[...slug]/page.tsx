import type { Metadata, ResolvingMetadata } from 'next'
import Pages from '@/components/Pages'
import { _ARTICLE_TYPES } from '@/sanity/schemas/articles/types';
import { loadSingle_Article, loadBundle_Articles } from '@/sanity/queries/loader';

type Params = {
	slug: string[];
}

export const generateStaticParams = async () => {
	try {
		const TypeArray = Object.keys(_ARTICLE_TYPES)
		let articlePaths: Array<Params> = []

		TypeArray.map(async (ArticleType) => {
			const articles = await loadBundle_Articles<article>(ArticleType)
			if (!articles) return []

			articles.map((article) => {
				articlePaths.push({
					slug: [article._type, article.slug]
				})
			});
		});

		return articlePaths
	} catch (error) {
		console.error("Error fetching archives:", error);
		throw new Error("Failed to fetch archives");
	}
}


type Props = {
	params: Promise<{ slug: string }>
}

export const generateMetadata = async (props: Props, parent: ResolvingMetadata): Promise<Metadata> => {
    const params = await props.params;
    const { slug } = params
    const article = await loadSingle_Article<article>(slug[0], slug[1])

    return {
		title: article?.title
		// description: page?.overview
		// 	? toPlainText(page.overview)
		// 	: (await parent).description,
	}
}

const Page = async (props: Props) => {
    const params = await props.params;
    const { slug } = params

    return <Pages.ArticleRoute type={slug[0]} slug={slug[1]} />
}

export default Page