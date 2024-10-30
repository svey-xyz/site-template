import { type DefaultDocumentNodeResolver } from 'sanity/structure'
import { Iframe } from 'sanity-plugin-iframe-pane'
import { type SanityDocument } from 'sanity'

// Customise this function to show the correct URL based on the current document
function getPreviewUrl(doc: SanityDocument) {
	const _slug = (doc?.slug as any)?.current
	const _type = doc?._type

	return _slug
		? `${window.location.host}/api/preview?type=${_type}&slug=${_slug}`
		: `${window.location.host}`
}

// Import this into the deskTool() plugin
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
	// Only show preview pane on `movie` schema type documents
	switch (schemaType) {
		case `page`:
			return S.document().views([
				S.view.form(),
				S.view
					.component(Iframe)
					.options({
						url: (doc: SanityDocument) => getPreviewUrl(doc),
					})
					.title('Preview Page'),
			])
		default:
			return S.document().views([S.view.form()])
	}
}