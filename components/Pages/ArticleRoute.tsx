import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { loadSingle_Article } from '@/sanity/queries/loader'

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
	Default: dynamic(() => import('@/components/Pages/articles/Default')),
}

export const ArticleRoute = async ({ type, slug }: ArticleRouteProps) => {

	const data = await loadSingle_Article<article>(type, slug)
	const article = data
	if (!article) return notFound()

	const ArticlePage = ArticleList[article._type] ?? ArticleList.Default

	return <ArticlePage data={data} />

}