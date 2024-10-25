// BLOCKS
import { _ARTICLE_TYPES } from './articles'

export interface _block extends inherentObjectData {
	hiddenOnMobile?: boolean
}

export interface _block_FeaturedTaxonomies extends block {
	taxonomies: Array<taxonomy_Business>,
}

export interface _block_Text extends block {
	text?: PortableTextBlock,
	link?: object_Link,
}

export interface _block_Image extends block {
	image?: sanityImage,
	accented?: boolean
}

export interface _block_Gallery extends block {
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
	description?: PortableTextBlock,
	archiveType: documentTypesWithArchives,
	filterable?: boolean,
	featuredTaxonomies?: Array<taxonomy>,
}

export interface _block_Contact extends block {
	buttonText: string
}

export type _BLOCK_TYPES = Array<block_FeaturedTaxonomies | block_Text | block_Newsletter | block_FeaturedArticles | block_Archive | block_Columns>

export type _BLOCK_MAP = {
	[key: string]: React.ComponentType<{ data: any, className?: string, siteData?: SettingsPayload | undefined }>
}