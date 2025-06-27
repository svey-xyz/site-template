import { queryClient } from "@sanity.next-app/loader/loadQuery"
import { SanityDocument } from "next-sanity"
import { pluralize } from "shared-lib/StringTransforms"

import * as _PARTIAL_ARTICLE_QUERIES from '@sanity.next-app/queries/partials'
import {
	settingsQuery,
	archiveQuery,
	staticPagesQuery,
	staticArchivesQuery,
	documentQuery,
} from '@sanity.next-app/queries/queries'
import { single_Article, bundle_Articles } from "@sanity.next-app/queries/buildArticleQuery"

export const load_Settings = async () => {

	const initial = await queryClient<any>(
		settingsQuery,
		{},
		{ next: { tags: ['settings', 'home', 'page'] } },
	)

	const data = initial.data
	return data
}

export const loadSingle_Article = async <T>(type: string, slug: string) => {

	const partial =
		(Object.keys(_PARTIAL_ARTICLE_QUERIES).includes(type)) ?
			_PARTIAL_ARTICLE_QUERIES[type as keyof typeof _PARTIAL_ARTICLE_QUERIES] :
			''

	const initial = await queryClient<T>(
		single_Article(partial),
		{ type, slug, partial },
		{ next: { tags: [type, pluralize(type), 'article', 'articles'] } },

	)

	const data = initial.data
	return data
}

export const loadBundle_Articles = async <T>(type: string, taxonomies?: Array<any>) => {

	const partial =
		(Object.keys(_PARTIAL_ARTICLE_QUERIES).includes(type)) ?
			_PARTIAL_ARTICLE_QUERIES[type as keyof typeof _PARTIAL_ARTICLE_QUERIES] :
			''

	const initial = await queryClient<Array<T>>(
		bundle_Articles(partial, taxonomies),
		{ type, partial },
		{ next: { tags: [type, pluralize(type), 'article', 'articles'] } },

	)

	const data = initial.data
	return data
}



export const loadSingle_Document = async (id: string) => {

	const initial = await queryClient<SanityDocument | null>(
		documentQuery,
		{ id },
		{},
	)

	const data = initial.data
	return data
}

export const loadSingle_Archive = async (archiveID: string) => {

	const initial = await queryClient<any | null>(
		archiveQuery,
		{ archiveID },
		{ next: { tags: [`archive:${archiveID}`, 'archive'] } },

	)

	const data = initial.data
	return data
}

export const loadBundle_Pages = async () => {

	const initial = await queryClient<Array<any> | null>(
		staticPagesQuery,
		{},
		{ next: { tags: [`pages`, 'page'] } },

	)

	const data = initial.data
	return data
}

export const loadBundle_Archives = async () => {

	const initial = await queryClient<Array<any> | null>(
		staticArchivesQuery,
		{},
		{ next: { tags: ['archive', 'archives'] } },

	)

	const data = initial.data
	return data
}