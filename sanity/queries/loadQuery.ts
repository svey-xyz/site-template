import 'server-only'

import * as queryStore from '@sanity/react-loader'
import { draftMode } from 'next/headers'

import {
	pageQuery,
	settingsQuery,
	archiveQuery,
} from '@/sanity/queries/queries'

import {
	PagePayload,
	SettingsPayload,
	ArchivePayload,
	taxonomy,
} from '@/types'

import type { ContentSourceMap, QueryOptions, QueryParams, SanityClient } from "@sanity/client";
import { client } from "@/sanity/lib/client";
import { capitalize, pluralize } from '@/lib/stringFunctions'
import * as _PARTIAL_ARTICLE_QUERIES from '@/sanity/queries/partials'
import { single_Article, bundle_Articles } from '@/sanity/queries/buildArticleQuery'

export const token = process.env.SANITY_API_READ_TOKEN;

const serverClient: SanityClient = client.withConfig({
	token,
	// Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
	stega: process.env.VERCEL_ENV === 'preview',
})

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient)

const usingCdn = serverClient.config().useCdn

export const loadQuery = (<T>(query: string, params: QueryParams = {}, options: QueryOptions = {}) => {
	const {
		perspective = draftMode().isEnabled ? 'previewDrafts' : 'published',
	} = options
	// Don't cache by default
	let revalidate: NextFetchRequestConfig['revalidate'] = 0
	// If `next.tags` is set, and we're not using the CDN, then it's safe to cache
	if (!usingCdn && Array.isArray(options.next?.tags)) {
		revalidate = false
	} else if (usingCdn) {
		revalidate = 60
	}
	return queryStore.loadQuery(query, params, {
		...options,
		next: {
			revalidate,
			...(options.next || {}),
		},
		perspective,
		// Enable stega if in Draft Mode, to enable overlays when outside Sanity Studio
		stega: draftMode().isEnabled,
	}) as Promise<{ data: T, sourceMap: ContentSourceMap }>
}) satisfies typeof queryStore.loadQuery

export const loadSettings = () => {
	return loadQuery<SettingsPayload>(
		settingsQuery,
		{},
		{ next: { tags: ['settings', 'home', 'page'] } },
	)
}

export const load_singleArticle = async <T>(type: string, slug: string) => {
	const partial =
		(Object.keys(_PARTIAL_ARTICLE_QUERIES).includes(type)) ?
		_PARTIAL_ARTICLE_QUERIES[type as keyof typeof _PARTIAL_ARTICLE_QUERIES] :
		''

	return loadQuery<T>(
		single_Article(partial),
		{ type, slug, partial },
		{ next: { tags: [type, pluralize(type), 'article', 'articles'] } },
	)
}

export const loadArticles = async <T>(type: string, taxonomies?:Array<taxonomy>) => {
	const partial =
		(Object.keys(_PARTIAL_ARTICLE_QUERIES).includes(type)) ?
			_PARTIAL_ARTICLE_QUERIES[type as keyof typeof _PARTIAL_ARTICLE_QUERIES] :
			''

	return loadQuery<Array<T>>(
		bundle_Articles(partial, taxonomies),
		{ type, partial },
		{ next: { tags: [type, pluralize(type), 'article', 'articles'] } },
	)
}

export const loadPage = (slug: string) => {
	return loadQuery<PagePayload | null>(
		pageQuery,
		{ slug },
		{ next: { tags: [`page:${slug}`, 'home'] } },
	)
}

export const loadArchive = (archiveID: string) => {
	return loadQuery<ArchivePayload | null>(
		archiveQuery,
		{ archiveID },
		{ next: { tags: [`archive:${archiveID}`, 'archive'] } },
	)
}