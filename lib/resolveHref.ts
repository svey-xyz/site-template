import { ArchivePayload, article, object_Contact, PagePayload } from "@/types"

export const resolveArticleHref = (
	article: article,
): string | undefined => {

	return `/article/${article._type}/${article.slug}`
	// switch (documentType) {
	// 	case 'page':
	// 		return slug ? `/${slug}` : undefined
	// 	case 'project':
	// 		return slug ? `/projects/${slug}` : undefined
	// 	default:
	// 		console.warn('Invalid document type:', documentType)
	// 		return undefined
	// }
}


export const resolvePageHref = (page: ArchivePayload | PagePayload): string => {
	const slug = page._type == 'page' ? `/${(page as PagePayload).slug}` : `/archives/${(page as ArchivePayload)._id}`

	return slug
}

export const resolveArchiveHref = (articleType: string): string => {
	const slug = `/archives/${articleType}`

	return slug
}

export const resolveContactHref = (contact: object_Contact | undefined): string => {
	if (!contact) return ''
	
	if (contact.website) return contact.website
	if (contact.socials) return contact.socials[0].url

	return ''
}