import { DocumentDefinition } from 'sanity'

import PAGES from '@/sanity/schemas/pages'

import ARTICLES from '@/sanity/schemas/articles'

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
import { social } from '@/sanity/schemas/objects/social'
import { link } from '@/sanity/schemas/objects/link'
import { basicDate } from '@/sanity/schemas/objects/basicDate'
import { contact } from '@/sanity/schemas/objects/contact'
import { markdownSchemaType } from '@/sanity/schemas/objects/mdx'
import { note } from '@/sanity/schemas/objects/note'
import { navGroup } from '@/sanity/schemas/objects/navGroup'


const _objects = [social, link, basicDate, contact, markdownSchemaType, note, navGroup]

/**
 * Documents
 */
import { settings } from '@/sanity/schemas/documents/settings'
import { taxonomy } from '@/sanity/schemas/documents/taxonomies'


const _documents = [settings, taxonomy]

export const types = [..._objects, ..._documents, ...PAGES, ...ARTICLE_TYPES];
