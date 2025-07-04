import { queryClient } from "@sanity.next-app/loader/loadQuery"
import { SanityDocument } from "next-sanity"

import {
	settingsQuery,
	archiveQuery,
	staticPagesQuery,
	staticArchivesQuery,
	documentQuery,
	articleQuery,
	bundleArticleQuery,
} from '@sanity.next-app/queries/queries'
import { ArticleQueryResult, BundleArticleQueryResult, SettingsQueryResult } from "@next-app/sanity.types"
import { _ARTICLE_TYPES } from "@root.site-template/DocumentTypes"
import { StringTransforms } from "shared-lib"


export const load_Settings = async () => {

	const initial = await queryClient<SettingsQueryResult>(
		settingsQuery,
		{},
		{ next: { tags: ['settings', 'home', 'page'] } },
	)

	const data = initial.data
	return data

}


export const loadSingle_Article = async (id: string) => {

	const initial = await queryClient<ArticleQueryResult>(
		articleQuery,
		{ id },
		{},
	)

	const data = initial.data
	return data
}

export const loadBundle_Articles = async (article: _ARTICLE_TYPES) => {

	const initial = await queryClient<BundleArticleQueryResult>(
		bundleArticleQuery,
		{ article },
		{ next: { tags: [`articles`, 'article', article, StringTransforms.pluralize(article)] } },

	)

	const data = initial.data
	return data
}

export const loadSingle_Document = async (id: string) => {

	const initial = await queryClient<SanityDocument>(
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