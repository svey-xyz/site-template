const assertValue = <T>(v: T | undefined, errorMessage: string): T => {
	if (v === undefined) {
		throw new Error(errorMessage)
	}
	return v
}

/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

export const dataset = assertValue(
	process.env.SANITY_STUDIO_DATASET,
	'Missing environment variable: SANITY_STUDIO_DATASET',
)

// export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = assertValue(
	process.env.SANITY_STUDIO_PROJECT_ID,
	'Missing environment variable: SANITY_STUDIO_PROJECT_ID',
)

export const sanityAPIReadToken = process.env.SANITY_API_READ_TOKEN

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion =
	process.env.SANITY_STUDIO_API_VERSION || '2024-10-14'

export const configStudioBasePath =
	process.env.SANITY_STUDIO_BASE_PATH || '/studio'

export const configStudioName =
	process.env.SANITY_STUDIO_NAME || 'studio'

export const sanityStudioPreviewURL =
	process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

export const sanityStudioHost =
	process.env.SANITY_STUDIO_HOST || 'localhost'

export const configStudioTitle =
	process.env.SANITY_STUDIO_TITLE || 'studio'

export const config = {
	projectId,
	dataset,
	baseUrl: 'http://localhost:3333',
}