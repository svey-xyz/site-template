import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

type ArticleRouteProps = {
	type: string,
	slug: string
}

interface ArticleMap {
	[key: string]: React.ComponentType<{
		data:  any //article
	}>
}

const ArticleList: ArticleMap = {
	Default: dynamic(() => import('@components.next-app/Pages/articles/Default')),
}

export const ArticleRoute = async ({ type, slug }: ArticleRouteProps) => {
	return notFound()
	// const article = null
	// if (!article) return notFound()

	// const ArticlePage = ArticleList[article._type] ?? ArticleList.Default

	// return <ArticlePage data={data} />

}