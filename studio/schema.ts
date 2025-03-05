import { DocumentDefinition } from 'sanity'

import PAGES from './schemas/documents/pages'

import ARTICLES from './schemas/documents/articles'

const ARTICLE_TYPES = (() => {
	let types: DocumentDefinition[] = []

	ARTICLES.forEach((article) => {
		types.push(article.document)
	})

	return types
})()

/**
 * Objects
 */
import { social } from './schemas/objects/social'
import { link } from './schemas/objects/link'
import { basicDate } from './schemas/objects/basicDate'
import { contact } from './schemas/objects/contact'
import { markdownSchemaType } from './schemas/objects/mdx'
import { note } from './schemas/objects/note'
import { navGroup } from './schemas/objects/navGroup'


const _objects = [social, link, basicDate, contact, markdownSchemaType, note, navGroup]

/**
 * Documents
 */
import { settings } from './schemas/singletons/settings'
import { taxonomy } from './schemas/documents/taxonomies'


const _documents = [settings, taxonomy]

export const types = [..._objects, ..._documents, ...PAGES, ...ARTICLE_TYPES];
