import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { load_singleArticle } from '@/sanity/queries/loadQuery'

type ArticleRouteProps = {
	type: string,
	slug: string
}

interface ArticleMap {
	[key: string]: React.ComponentType<{
		data: article
	}>
}

const ArticleList: ArticleMap = {
	Default: dynamic(() => import('@/components/Pages/Articles/Default')),
}

export const ArticleRoute = async ({ type, slug }: ArticleRouteProps) => {


	const articlePayload = await load_singleArticle<article>(type, slug)
	const article = articlePayload.data
	if (!article) return notFound()

	const ArticlePage = ArticleList[article._type] ?? ArticleList.Default

	return <ArticlePage data={articlePayload.data} />

}