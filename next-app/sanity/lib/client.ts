import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion, configStudioBasePath } from '@root.site-template/env'

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