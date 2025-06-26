export const resolveArticleHref = (
	article: any,
): string | undefined => {

	return `/article/${article._type}/${article.slug}`
}

export const resolveHrefFromSlug = (slug: string, type: string): string => {
	const href = type == 'page' ? `/${slug}` : `/archives/${slug}`

	return href
}

export const resolvePageHref = (page: any): string => {
	const slug = page._type == 'page' ? `/${(page).pathname?.current}` : `/archives/${(page)._id}`

	return slug
}

export const resolveArchiveHrefFromArticle = (articleType: string): string => {
	const slug = `/archives/${articleType}`

	return slug
}

export const resolveArchiveHrefFromTaxonomy = (taxonomy: any): string => {
	const typeParts = taxonomy._type.split('Taxonomy')
	return resolveArchiveHrefFromArticle(typeParts[0])
}

export const resolveContactHref = (contact: any | undefined): string => {
	if (!contact) return ''
	
	if (contact.website?.link) return contact.website.link
	if (contact.socials) return contact.socials[0].url

	return ''
}