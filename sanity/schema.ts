import { DocumentDefinition } from 'sanity'

import PAGES from '@/sanity/schemas/pages'

import ARTICLES from '@/sanity/schemas/articles'

const ARTICLE_TYPES = (() => {
	let types: DocumentDefinition[] = []

	ARTICLES.forEach((article) => {
		types.push(article.document)
		types.push(article.taxonomy)
	})

	return types
})()

/**
 * Objects
 */
import { social } from '@/sanity/schemas/objects/social'
import { link } from '@/sanity/schemas/objects/link'
import { basicDate } from '@/sanity/schemas/objects/basicDate'
import { contact } from '@/sanity/schemas/objects/contact'
import { markdownSchemaType } from '@/sanity/schemas/objects/mdx'
import { note } from '@/sanity/schemas/objects/note'

const _objects = [social, link, basicDate, contact, markdownSchemaType, note]

/**
 * Documents
 */
import { settings } from '@/sanity/schemas/documents/settings'

const _documents = [settings]

export const types = [..._objects, ..._documents, ...PAGES, ...ARTICLE_TYPES];
