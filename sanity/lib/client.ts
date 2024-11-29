import { createClient } from 'next-sanity'

import { projectId, dataset, apiVersion, configStudioBasePath } from './api'

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
	perspective: 'published'
})

export default client