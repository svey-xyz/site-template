import { queryClient } from "@/sanity/queries/queryClient"
import { SanityDocument } from "next-sanity"
import { draftMode } from "next/headers"
import pluralize from "pluralize"

import * as _PARTIAL_ARTICLE_QUERIES from '@/sanity/queries/partials'
import {
	pageQuery,
	settingsQuery,
	archiveQuery,
	staticPagesQuery,
	staticArchivesQuery,
	documentQuery,
} from '@/sanity/queries/queries'
import { single_Article, bundle_Articles } from "@/sanity/queries/buildArticleQuery"



export const loadSingle_Page = async (slug: string) => {
	const draft = (await draftMode()).isEnabled

	const initial = await queryClient<PagePayload | null>(
		pageQuery,
		{ slug },
		{ next: { tags: [`page:${slug}`, 'home'] } },
		draft
	)

	const data = initial.data
	return data
}

export const load_Settings = async () => {

	const initial = await queryClient<SettingsPayload>(
		settingsQuery,
		{},
		{ next: { tags: ['settings', 'home', 'page'] } },
	)

	const data = initial.data
	return data
}

export const loadSingle_Article = async <T>(type: string, slug: string) => {
	const draft = (await draftMode()).isEnabled

	const partial =
		(Object.keys(_PARTIAL_ARTICLE_QUERIES).includes(type)) ?
			_PARTIAL_ARTICLE_QUERIES[type as keyof typeof _PARTIAL_ARTICLE_QUERIES] :
			''

	const initial = await queryClient<T>(
		single_Article(partial),
		{ type, slug, partial },
		{ next: { tags: [type, pluralize(type), 'article', 'articles'] } },
		draft

	)

	const data = initial.data
	return data
}

export const loadBundle_Articles = async <T>(type: string, taxonomies?: Array<taxonomy>) => {

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
	const draft = (await draftMode()).isEnabled

	const initial = await queryClient<SanityDocument | null>(
		documentQuery,
		{ id },
		{},
		draft
	)

	const data = initial.data
	return data
}

export const loadSingle_Archive = async (archiveID: string) => {
	const draft = (await draftMode()).isEnabled

	const initial = await queryClient<ArchivePayload | null>(
		archiveQuery,
		{ archiveID },
		{ next: { tags: [`archive:${archiveID}`, 'archive'] } },
		draft

	)

	const data = initial.data
	return data
}

export const loadBundle_Pages = async () => {

	const initial = await queryClient<Array<PagePayload> | null>(
		staticPagesQuery,
		{},
		{ next: { tags: [`pages`, 'page'] } },

	)

	const data = initial.data
	return data
}

export const loadBundle_Archives = async () => {

	const initial = await queryClient<Array<ArchivePayload> | null>(
		staticArchivesQuery,
		{},
		{ next: { tags: ['archive', 'archives'] } },

	)

	const data = initial.data
	return data
}