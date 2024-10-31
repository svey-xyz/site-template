import { pageQuery } from '@/sanity/queries/queries'
import { queryStore } from '@/sanity/loader/queryStore'
import {
	type QueryParams,
	type QueryResponseInitial,
	type UseQueryOptionsDefinedInitial,
} from '@sanity/react-loader'

/**
 * Exports to be used in client-only or components that render both server and client
 */
export const useQuery = <
	QueryResponseResult = unknown,
	QueryResponseError = unknown,
>(
	query: string,
	params?: QueryParams,
	options?: UseQueryOptionsDefinedInitial<QueryResponseResult>,
) => {
	const snapshot = queryStore.useQuery<QueryResponseResult, QueryResponseError>(
		query,
		params,
		options,
	)

	// Always throw errors if there are any
	if (snapshot.error) {
		throw snapshot.error
	}

	return snapshot
}

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */
export function useSingle_Page(initial: QueryResponseInitial<PagePayload | null>) {
	return useQuery<PagePayload | null>(pageQuery, {}, { initial })
}