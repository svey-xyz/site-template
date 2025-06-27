// import { createClient } from 'sanity'
import { projectId, dataset, apiVersion, configStudioBasePath } from '@sanity.next-app/lib/api'
import { createClient } from '@sanity/client'

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false,
	perspective: 'published',
	stega: {
		enabled: true,
		studioUrl: configStudioBasePath,
		logger: console,
	},
})