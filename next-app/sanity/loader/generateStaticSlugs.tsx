import 'server-only'

import { groq } from 'next-sanity'

import { client } from '@sanity.next-app/lib/client'
import { token } from '@sanity.next-app/lib/token'

// Used in `generateStaticParams`
export const generateStaticSlugs = async (type: string) => {
	// Not using loadQuery as it's optimized for fetching in the RSC lifecycle
	const slugs = await client
		.withConfig({
			token,
			perspective: 'published',
			useCdn: false,
			stega: false,
		})
		.fetch<{ slug?: {current?:string}}[]>(
			groq`*[_type == $type && defined(slug.current)]{slug}`,
			{ type },
			{
				next: {
					tags: [type],
				},
			},
		)

	return slugs.flatMap((path) => {
		return { slug: [path.slug?.current] }
	})
}