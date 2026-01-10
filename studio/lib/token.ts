
import 'server-only'
import { sanityAPIReadToken } from '@config'

export const token = sanityAPIReadToken

if (!token) {
	throw new Error('Missing SANITY_API_READ_TOKEN')
}