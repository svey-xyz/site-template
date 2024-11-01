import 'server-only'

import { groq } from 'next-sanity'

import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

// Used in `generateStaticParams`
export const generateStaticSlugs = async (type: string) => {
	// Not using loadQuery as it's optimized for fetching in the RSC lifecycle
	const pathnames = await client
		.withConfig({
			token,
			perspective: 'published',
			useCdn: false,
			stega: false,
		})
		.fetch<{ pathname?: {current?:string}}[]>(
			groq`*[_type == $type && defined(pathname.current)]{pathname}`,
			{ type },
			{
				next: {
					tags: [type],
				},
			},
		)

	return pathnames.flatMap((path) => {
		return { slug: [path.pathname?.current] }
	})
}