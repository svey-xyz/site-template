export type _ARTICLE_TYPES = [
	article_Article
]

export interface _article extends inherentDocumentData {
	title: string,
	slug: string,
	description?: string,
	image?: sanityImage,
	taxonomies?: Array<_taxonomy>,
}

export interface _article_Article extends article {
}

export interface _taxonomy extends inherentDocumentData {
	icon?: icon,
	prefLabel: string,
	definition?: string,
	related?: Array<taxonomy>,
	broader?: Array<taxonomy>,
	narrower?: Array<taxonomy>,
}