export const resolveArticleHref = (
	article: article,
): string | undefined => {

	return `/article/${article._type}/${article.slug}`
}

export const resolveHrefFromSlug = (slug: string, type: string): string => {
	const href = type == 'page' ? `/${slug}` : `/archives/${slug}`

	return href
}

export const resolvePageHref = (page: ArchivePayload | PagePayload): string => {
	const slug = page._type == 'page' ? `/${(page as PagePayload).pathname?.current}` : `/archives/${(page as ArchivePayload)._id}`

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
	
	if (contact.website?.link) return contact.website.link
	if (contact.socials) return contact.socials[0].url

	return ''
}