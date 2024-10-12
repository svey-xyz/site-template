// import { resolveHref } from '@sanity/lib/sanity.links'
import groq from 'groq'
import { map, Observable } from 'rxjs'
import {
	DocumentLocationResolver,
	DocumentLocationsState,
} from 'sanity/presentation'

export const locate: DocumentLocationResolver = (params, context) => {
	if (params.type === 'siteSettings') {
		return {
			message: 'This document is used on all pages',
			tone: 'caution',
		} satisfies DocumentLocationsState
	}

	if (
		params.type === 'home' ||
		params.type === 'page'
	) {
		const doc$ = context.documentStore.listenQuery(
			groq`*[_id==$id || references($id)] {
				_id,
				_type,
				slug,
				title,
				homepage->,
			}`,
			params,
			{ perspective: 'previewDrafts' },
		) as Observable<
			| {
				_id: string
				_type: string
				slug?: { current: string }
				title: string | null,
				homepage?: {
					slug: { current: string }
				}
			}[]
			| null
		>
		return doc$.pipe(
			map((docs) => {
				const isReferencedBySettings = docs?.some(
					(doc) => doc._type === 'siteSettings',
				)
				switch (params.type) {
					case 'page':
						const homeSlug = docs?.find((doc) => doc._type === 'siteSettings')?.homepage?.slug.current
						const pageSlug = docs?.find((doc) => doc._id === params.id)?.slug?.current
						
						const isHomepage = homeSlug && (pageSlug === homeSlug)
						
						return {
							locations: docs
								?.map((doc) => {
									
									// const href = resolveHref(doc._type, doc?.slug?.current)
									const href = ''
								
									return {
										title: doc?.title || 'Untitled',
										href: href!,
									}
								})
								.filter((doc) => doc.href !== undefined),
							tone: isHomepage ?
								'caution' :
								isReferencedBySettings ?
								'positive' :
								'critical',
							message: isHomepage ?
								'This document is used to render the front page' :
							  isReferencedBySettings ?
								'The top menu is linking to this page' :
								"The top menu isn't linking to this page. It can still be accessed if the visitor knows the URL, or if it's linked another way.",
						} satisfies DocumentLocationsState
					default:
						return {
							message: 'Unable to map document type to locations',
							tone: 'critical',
						} satisfies DocumentLocationsState
				}
			}),
		)
	}


	// const doc$ = context.documentStore.listenQuery(
	// 	groq`*[references($id)] {
	// 		_id,
	// 		_type,
	// 		title,
	// 		slug
	// 	}`,
	// 	params,
	// 	{ perspective: 'previewDrafts' },
	// ) as Observable<
	// 	| {
	// 		_id: string
	// 		_type: string
	// 		title: string
	// 		slug?: { current: string }
	// 	}[]
	// 	| null
	// >
	// return doc$.pipe(
	// 	map((docs) => {
	// 		return {
	// 			locations: docs
	// 				?.map((doc) => {
	// 					// const href = resolveHref(doc._type, doc?.slug?.current)
	// 					// const href = `/studio/structure/${doc._type};${doc._id}`
	// 					// const href = resolveHref(doc._type, doc.slug?.current) || ''

	// 					// const path = [{
	// 					// 	id: doc._id,
	// 					// 	type: doc._type
	// 					// }]
	// 					return {
	// 						title: doc?.title || 'Untitled',
	// 						href: ''
	// 						// href,
	// 					}
	// 				}),
	// 				// .filter((doc) => doc.href !== undefined),
	// 			message: 'Document referenced in these locations.',
	// 			tone: 'positive',
	// 		} satisfies DocumentLocationsState
	// 	})
	// )

	return null
}