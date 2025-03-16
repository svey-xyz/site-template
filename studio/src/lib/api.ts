export const dataset = assertValue(
	process.env.SANITY_STUDIO_DATASET,
	'Missing environment variable: SANITY_STUDIO_DATASET',
)

export const projectId = assertValue(
	process.env.SANITY_STUDIO_PROJECT_ID,
	'Missing environment variable: SANITY_STUDIO_PROJECT_ID',
)

export const apiVersion =
	process.env.SANITY_STUDIO_API_VERSION || '2024-10-14'

export const configStudioBasePath =
	process.env.SANITY_STUDIO_BASE_PATH || '/studio'

export const configStudioName =
	process.env.SANITY_STUDIO_NAME || 'studio'

export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET

export const configStudioTitle =
	process.env.SANITY_STUDIO_TITLE || 'studio'

function assertValue<T>(v: T | undefined, errorMessage: string): T | undefined {
	// if (v === undefined) {
	// 	throw new Error(errorMessage)
	// }

	return v
}