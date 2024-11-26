// BLOCKS
import { _ARTICLE_TYPES } from './articles'

export interface _block extends inherentObjectData {

}

export interface _block_FeaturedTaxonomies extends block {
	taxonomies: Array<taxonomy>,
}

export interface _block_Text extends block {
	text?: string,
	link?: object_Link,
}

export interface _block_Image extends block {
	image?: sanityImage,
	accented?: boolean
}

export interface _block_Gallery extends block {
	style?: 'swiper' | 'gallery',
	images: Array<sanityImage>,
}

export interface _block_Newsletter extends block {
	callToAction: string,
	text: string,
}

export interface _block_FeaturedArticles extends block {
	title: string,
	articles?: _ARTICLE_TYPES,
}

export interface _block_Info extends block {
	title: string,
	items?: [
		{
			title?: string,
			subTitle?: string,
			infoType: 'icon' | 'number',
			icon?: icon,
			number?: number,
		},
	],
}

export interface _block_Archive extends block {
	description?: string,
	archiveType: documentTypesWithArchives,
	filterable?: boolean,
	featuredTaxonomies?: Array<taxonomy>,
}

export interface _block_Contact extends block {
	buttonText: string
}

export type _BLOCK_TYPES = Array<_block_FeaturedTaxonomies | _block_Text | _block_Newsletter | _block_FeaturedArticles | _block_Archive>

export type _BLOCK_MAP = {
	[key: string]: React.ComponentType<{ data: any, className?: string, siteData?: SettingsPayload | undefined }>
}