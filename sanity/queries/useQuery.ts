import {
	type QueryParams,
	useEncodeDataAttribute,
	type UseQueryOptions,
} from '@sanity/react-loader/rsc'

import { queryStore } from './queryStore'

// Custom hook for `queryStore.useQuery` to simplify usage of `encodeDataAttribute`
export const useQuery = <
	QueryResponseResult = unknown,
	QueryResponseError = unknown,
>(
	query: string,
	params?: QueryParams,
	// options?: UseQueryOptions<QueryResponseResult>,
	options?: any,
) => {
	const snapshot = queryStore.useQuery<QueryResponseResult, QueryResponseError>(
		query,
		params,
		options,
	)

	// Generate data attributes for overlays using Sanity's data
	const encodeDataAttribute = useEncodeDataAttribute(
		snapshot.data,
		snapshot.sourceMap,
		'/studio',  // Replace with your Sanity Studio URL
	)

	// Consistent error handling by throwing any caught errors
	if (snapshot.error) {
		throw snapshot.error
	}

	// Return the query results along with the `encodeDataAttribute` function
	return {
		...snapshot,
		encodeDataAttribute,
	}
}

// Export `useLiveMode` for enabling real-time updates in the `VisualEditing` component
export const { useLiveMode } = queryStore