import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

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

export const sanityStudioPreviewURL =
	process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

export const sanityStudioHost =
	process.env.SANITY_STUDIO_HOST || 'localhost'

export const config = {
	projectId,
	dataset,
	baseUrl: 'http://localhost:3333',
}

function assertValue<T>(v: T | undefined, errorMessage: string): T {
	console.log('Value: ', v);
	if (v === undefined) {
		throw new Error(errorMessage)
	}
	return v
}