import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { capitalize } from '@/lib/stringFunctions'
import { load_singleArticle } from '@/sanity/queries/loadQuery'
import { article } from '@/types'

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
	Standard: dynamic(() => import('@components/Pages/Articles/Generic')),
	news: dynamic(() => import('@components/Pages/Articles/News')),
	project: dynamic(() => import('@components/Pages/Articles/Project')),
}

export const ArticleRoute = async ({ type, slug }: ArticleRouteProps) => {


	const articlePayload = await load_singleArticle<article>(type, slug)
	const article = articlePayload.data
	if (!article) return notFound()

	const ArticlePage = ArticleList[article._type] ?? ArticleList.Standard

	return <ArticlePage data={articlePayload.data} />

}