/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

export const dataset = assertValue(
	process.env.NEXT_PUBLIC_SANITY_DATASET,
	'Missing environment variable: SANITY_STUDIO_DATASET',
)

export const projectId = assertValue(
	process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	'Missing environment variable: SANITY_STUDIO_PROJECT_ID',
)

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion =
	process.env.SANITY_STUDIO_API_VERSION || '2024-10-14'

export const configStudioBasePath =
	process.env.NEXT_PUBLIC_SANITY_STUDIO_BASE_PATH || '/studio'

export const configStudioName =
	process.env.NEXT_PUBLIC_SANITY_STUDIO_NAME || 'studio'

// export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET

export const configStudioTitle =
	process.env.NEXT_PUBLIC_SANITY_STUDIO_TITLE || 'studio'

function assertValue<T>(v: T | undefined, errorMessage: string): T | undefined {
	// if (v === undefined) {
	// 	throw new Error(errorMessage)
	// }

	return v
}