import { createQueryStore } from '@sanity/react-loader/rsc'

// The `queryStore` instance is shared in RSC and client components, keep this file tiny as it will be included in the client bundle
export const queryStore = createQueryStore({
	client: false,
	ssr: true,
})