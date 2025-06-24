import PAGES from './documents/pages'
import ARTICLES from './documents/articles'
import { _BASE_ARTICLE } from '@schemas.studio/documents/articles/utils/baseArticle'


/**
 * Objects
 */
import { Blocks, BlockTypes } from './objects/blocks'
import { social } from './objects/social'
import { link } from './objects/link'
import { basicDate } from './objects/basicDate'
import { contact } from './objects/contact'
import { note } from './objects/note'
import { navGroup } from './objects/navGroup'

const _objects = [social, link, basicDate, contact, note, navGroup, Blocks, ...BlockTypes]

/**
 * Documents
 */
import { settings } from './singletons/settings'
import { taxonomy } from './documents/taxonomies'


const _documents = [settings, taxonomy]

export const types = [..._objects, ..._documents, ...PAGES, ...ARTICLES, _BASE_ARTICLE];
