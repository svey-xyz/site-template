import 'server-only'

import type { ContentSourceMap, QueryOptions, QueryParams, SanityClient, SanityDocument } from "@sanity/client";
import { client } from "@/sanity/lib/client";
import { token } from '@/sanity/lib/token';
import { queryStore } from '@/sanity/loader/queryStore';

export const serverClient: SanityClient = client.withConfig({
	token
})


queryStore.setServerClient(serverClient)

const usingCdn = serverClient.config().useCdn

export const queryClient = (async <T>(query: string, params: QueryParams = {}, options: QueryOptions = {}, draft?: boolean) => {
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
	}) as Promise<{ data: T, sourceMap: ContentSourceMap }>
}) satisfies typeof queryStore.loadQuery