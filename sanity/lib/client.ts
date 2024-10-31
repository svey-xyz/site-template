// import { createClient } from '@sanity/client'
// import { projectId, dataset, apiVersion, configStudioBasePath } from './api'

// export const client = createClient({
// 	projectId,
// 	dataset,
// 	apiVersion,
// 	useCdn: false,
// 	perspective: "published",
// 	stega: {
// 		enabled: false,
// 		studioUrl: configStudioBasePath,
// 	},
// })

// export default client;

import { createClient } from 'next-sanity'

import { projectId, dataset, apiVersion, configStudioBasePath } from './api'

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	// If webhook revalidation is setup we want the freshest content, if not then it's best to use the speedy CDN
	// useCdn: revalidateSecret ? false : true,
	useCdn: false,
	perspective: 'published',
	stega: {
		studioUrl: configStudioBasePath,
		logger: console,
		filter: (props) => {
			if (props.sourcePath.at(-1) === 'title') {
				return true
			}

			return props.filterDefault(props)
		},
	},
})

export default client

console.warn(
	'This template is using stega to embed Content Source Maps, see more information here: https://www.sanity.io/docs/loaders-and-overlays#26cf681fadd4',
)