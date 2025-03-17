import {
	defineDocuments,
	defineLocations,
	PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
	mainDocuments: defineDocuments([
		{
			route: '/:slug',
			filter: `_type == "page" && slug.current == $slug || _id == $slug`,
		},
		{
			route: '/posts/:slug',
			filter: `_type == "post" && slug.current == $slug || _id == $slug`,
		},
	]),
	locations: {
		// Add more locations for other post types
		page: defineLocations({
			select: {
				title: "title",
				slug: "slug.current",
			},
			resolve: (doc) => ({
				locations: [
					{
						title: doc?.title || "Untitled",
						href: `/${doc?.slug}`,
					},
					{ title: "Home", href: `/` },
				],
			}),
		}),
	},
};