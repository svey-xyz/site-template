import 'server-only'

import * as queryStore from '@sanity/react-loader'

import {
	pageQuery,
	settingsQuery,
	archiveQuery,
	staticPagesQuery,
	staticArchivesQuery,
	documentQuery,
} from '@/sanity/queries/queries'

import type { ContentSourceMap, QueryOptions, QueryParams, SanityClient, SanityDocument } from "@sanity/client";
import { client } from "@/sanity/lib/client";
import { pluralize } from '@/lib/stringFunctions'
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

export const loadQuery =  (async <T>(query: string, params: QueryParams = {}, options: QueryOptions = {}, draft?: boolean) => {
	const {
		perspective = draft ? 'previewDrafts' : 'published',
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
		perspective
		// Enable stega if in Draft Mode, to enable overlays when outside Sanity Studio
	}) as Promise<{ data: T, sourceMap: ContentSourceMap }>
}) satisfies typeof queryStore.loadQuery

export const loadSettings = async (draft?: boolean) => {
	const initial = await loadQuery<SettingsPayload>(
		settingsQuery,
		{},
		{ next: { tags: ['settings', 'home', 'page'] } },
		draft

	)

	const data = initial.data
	return data
}

export const load_singleArticle = async <T>(type: string, slug: string, draft?: boolean) => {
	const partial =
		(Object.keys(_PARTIAL_ARTICLE_QUERIES).includes(type)) ?
		_PARTIAL_ARTICLE_QUERIES[type as keyof typeof _PARTIAL_ARTICLE_QUERIES] :
		''

	const initial = await loadQuery<T>(
		single_Article(partial),
		{ type, slug, partial },
		{ next: { tags: [type, pluralize(type), 'article', 'articles'] } },
		draft

	)

	const data = initial.data
	return data
}

export const loadArticles = async <T>(type: string, taxonomies?: Array<taxonomy>, draft?: boolean) => {
	const partial =
		(Object.keys(_PARTIAL_ARTICLE_QUERIES).includes(type)) ?
			_PARTIAL_ARTICLE_QUERIES[type as keyof typeof _PARTIAL_ARTICLE_QUERIES] :
			''

	const initial = await loadQuery<Array<T>>(
		bundle_Articles(partial, taxonomies),
		{ type, partial },
		{ next: { tags: [type, pluralize(type), 'article', 'articles'] } },
		draft

	)

	const data = initial.data
	return data
}

export const loadPage = async (slug: string, draft?: boolean) => {
	const initial = await loadQuery<PagePayload | null>(
		pageQuery,
		{ slug },
		{ next: { tags: [`page:${slug}`, 'home'] } },
		draft
	)

	const data = initial.data
	return data
}

export const loadDocument = async (id: string, draft?: boolean) => {
	const initial = await loadQuery<SanityDocument | null>(
		documentQuery,
		{ id },
		{ },
		draft
	)

	const data = initial.data
	return data
}

export const loadArchive = async (archiveID: string, draft?: boolean) => {
	const initial = await loadQuery<ArchivePayload | null>(
		archiveQuery,
		{ archiveID },
		{ next: { tags: [`archive:${archiveID}`, 'archive'] } },
		draft

	)

	const data = initial.data
	return data
}

export const loadStaticPages = async (draft?: boolean) => {
	const initial = await loadQuery<Array<PagePayload> | null>(
		staticPagesQuery,
		{ },
		{ next: { tags: [`pages`, 'page'] } },
		draft

	)

	const data = initial.data
	return data
}

export const loadStaticArchives = async (draft?: boolean) => {
	const initial = await loadQuery<Array<ArchivePayload> | null>(
		staticArchivesQuery,
		{},
		{ next: { tags: ['archive', 'archives'] } },
		draft

	)

	const data = initial.data
	return data
}