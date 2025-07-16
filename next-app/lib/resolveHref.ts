import { Article, Contact, Page, Taxonomy } from "@next-app/sanity.types"
import { _ARTICLE_TYPES } from "@root.site-template/DocumentTypes"

export const resolveArticleHref = (article: Article): string => {
	return `/article/${article._type}/${article.slug}`
}

export const resolveHrefFromSlug = (slug: string, type: string): string => {
	const href = type == 'page' ? `/${slug}` : `/archives/${slug}`
	return href
}

export const resolvePageHref = (page: Page): string => {
	const slug = page._type == 'page' ? `/${(page).slug?.current}` : `/archives/${(page)._id}`
	return slug
}

export const resolveArchiveHrefFromArticle = (articleType: _ARTICLE_TYPES): string => {
	const slug = `/archives/${articleType}`
	return slug
}

export const resolveContactHref = (contact: Contact): string => {
	if (!contact) return ''
	
	if (contact.website?.link) return contact.website.link
	if (contact.socials) return contact.socials[0].url

	return ''
}