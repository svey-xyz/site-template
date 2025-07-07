import PAGES from './documents/pages'
import ARTICLES from './documents/articles'

/**
 * Objects
 */
import { BlockTypes } from './objects/blocks'
import { social } from './objects/social'
import { link } from './objects/link'
import { basicDate } from './objects/basicDate'
import { contact } from './objects/contact'
import { note } from './objects/note'
import { navGroup } from './objects/navGroup'

const _objects = [social, link, basicDate, contact, note, navGroup, ...BlockTypes]

/**
 * Documents
 */
import { settings } from './singletons/settings'
import { taxonomy } from './documents/taxonomies'


const _documents = [settings, taxonomy]

export const types = [..._objects, ..._documents, ...PAGES, ...ARTICLES];
