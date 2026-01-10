// import { assertValue } from 'shared-lib';

const assertValue = <T>(v: T | undefined, errorMessage: string): T => {
	if (v === undefined) {
		throw new Error(errorMessage)
	}
	return v
}

type EnvData = {
	[key: string]: string | undefined
}

const envData: EnvData = process.env as EnvData;

/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

export const dataset = assertValue(
	process.env.NEXT_PUBLIC_SANITY_DATASET,
	'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
)

export const projectId = assertValue(
	process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion =
	process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-14'

export const configStudioBasePath =
	process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '/'

export const configStudioName =
	process.env.NEXT_PUBLIC_SANITY_STUDIO_NAME || 'studio'

// export const revalidateSecret = env.SANITY_REVALIDATE_SECRET

export const configStudioTitle =
	process.env.NEXT_PUBLIC_SANITY_STUDIO_TITLE || 'studio'

export const sanityAPIReadToken = process.env.SANITY_API_READ_TOKEN

export const config = {
	projectId,
	dataset,
	baseUrl: 'http://localhost:3333',
}