import groq from 'groq'

import { Observable, map } from "rxjs";
import {
	defineDocuments,
	defineLocations,
	DocumentLocationsState,
	PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
	// mainDocuments: defineDocuments([
	// 	{
	// 		route: '/:slug',
	// 		filter: `_type == "page" && slug.current == $slug`,
	// 	},
	// 	{
	// 		route: '/posts/:slug',
	// 		filter: `_type == "post" && slug.current == $slug || _id == $slug`,
	// 	},
	// ]),
	locations: (params, context) => {
		params.version = params.version || 'drafts'
		console.log('PARAMS: ', params)

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
				{ perspective: 'drafts' },
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
							console.log('Home: ', homeSlug)

							const isHomepage = homeSlug && (pageSlug === homeSlug)

							return {
								locations: docs
									?.map((doc) => {

										// const href = resolveHref(doc._type, doc?.slug?.current)
										const href = doc?.slug?.current

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
		return null
	}
	// locations: {
	// 	// Add more locations for other post types
	// 	page: defineLocations({
	// 		select: {
	// 			title: "title",
	// 			slug: "slug.current",
	// 		},
	// 		resolve: (doc) => ({
	// 			locations: [
	// 				{
	// 					title: doc?.title || "Untitled",
	// 					href: `/${doc?.slug}`,
	// 				},
	// 				{ title: "Home", href: `/` },
	// 			],
	// 		}),
	// 	}),
	// },
};