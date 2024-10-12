import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion } from './api'

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false,
	perspective: "published",
	stega: {
		enabled: false,
		studioUrl: "/studio",
	},
})

export default client;