export const resolveArticleHref = (
	article: article,
): string | undefined => {

	return `/article/${article._type}/${article.slug}`
}

export const resolvePageHref = (page: ArchivePayload | PagePayload): string => {
	const slug = page._type == 'page' ? `/${(page as PagePayload).slug}` : `/archives/${(page as ArchivePayload)._id}`

	return slug
}

export const resolveArchiveHrefFromArticle = (articleType: string): string => {
	const slug = `/archives/${articleType}`

	return slug
}

export const resolveArchiveHrefFromTaxonomy = (taxonomy: taxonomy): string => {
	const typeParts = taxonomy._type.split('Taxonomy')
	return resolveArchiveHrefFromArticle(typeParts[0])
}

export const resolveContactHref = (contact: object_Contact | undefined): string => {
	if (!contact) return ''
	
	if (contact.website) return contact.website
	if (contact.socials) return contact.socials[0].url

	return ''
}