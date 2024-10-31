import { type DefaultDocumentNodeResolver } from 'sanity/structure'
import { Iframe } from 'sanity-plugin-iframe-pane'
import { type SanityDocument } from 'sanity'
import { resolveHrefFromSlug } from '@/lib/resolveHref'

// Customise this function to show the correct URL based on the current document
function getPreviewUrl(doc: SanityDocument) {
	const _id = doc?._id
	const _type = doc?._type
	const _slug = (doc?.slug as any)?.current

	return _slug
		? `http://localhost:3000/api/preview?slug=${_slug}&type=${_type}`
		: `localhost:3000`
}

// Import this into the deskTool() plugin
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
	// Only show preview pane on `movie` schema type documents
	console.log('Preview of schema: ', schemaType)
	switch (schemaType) {
		case `page`:
			// console.log
			return S.document().views([
				S.view.form(),
				S.view
					.component(Iframe)
					.options({
						// url: (doc: SanityDocument) => {
						// 	const previewURL = getPreviewUrl(doc)
						// 	console.log('preview url: ', previewURL)
						// 	return previewURL
						// },
						url: {
							origin: 'same-origin', // or 'same-origin' if the app and studio are on the same origin
							preview: (doc: SanityDocument) => {
								const slug = (doc?.slug as any)?.current
								const href = resolveHrefFromSlug(slug ?? ``, doc._type)

								return slug ? href : new Error('Missing slug')
							},
							draftMode: '/api/preview' // the route you enable draft mode, see: https://github.com/sanity-io/visual-editing/tree/main/packages/preview-url-secret#sanitypreview-url-secret
						},
						showDisplayUrl: true,
						defaultSize: `desktop`,
						reload: {
							button: true,
						},
					})
					.title('Preview Page'),
			])
		default:
			return S.document().views([S.view.form()])
	}
}