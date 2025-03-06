import { DocumentDefinition } from 'sanity'

import PAGES from './documents/pages'

import ARTICLES from './documents/articles'

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
import { social } from './objects/social'
import { link } from './objects/link'
import { basicDate } from './objects/basicDate'
import { contact } from './objects/contact'
import { markdownSchemaType } from './objects/mdx'
import { note } from './objects/note'
import { navGroup } from './objects/navGroup'


const _objects = [social, link, basicDate, contact, markdownSchemaType, note, navGroup]

/**
 * Documents
 */
import { settings } from './singletons/settings'
import { taxonomy } from './documents/taxonomies'


const _documents = [settings, taxonomy]

export const types = [..._objects, ..._documents, ...PAGES, ...ARTICLE_TYPES];
