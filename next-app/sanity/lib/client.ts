import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion, configStudioBasePath } from '@sanity.next-app/lib/api'

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
	perspective: 'published',
	stega: {
		enabled: true,
		studioUrl: configStudioBasePath,
		logger: console,
	},
	resultSourceMap: 'withKeyArraySelector'
})