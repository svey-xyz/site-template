import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion, configStudioBasePath } from './api'

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false,
	perspective: "published",
	stega: {
		enabled: false,
		studioUrl: configStudioBasePath,
	},
})

export default client;