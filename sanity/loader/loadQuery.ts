import 'server-only'

import { draftMode } from 'next/headers'
import type { ContentSourceMap, QueryOptions, QueryParams, SanityClient, SanityDocument } from "@sanity/client";
import { client } from "@/sanity/lib/client";
import { token } from '@/sanity/lib/token';
import { queryStore } from '@/sanity/loader/queryStore';

export const serverClient: SanityClient = client.withConfig({
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

export const queryClient =  (async <T>(query: string, params: QueryParams = {}, options: QueryOptions = {}) => {
	const draft = await draftMode()
	const {
		perspective = draft.isEnabled ? 'previewDrafts' : 'published',
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