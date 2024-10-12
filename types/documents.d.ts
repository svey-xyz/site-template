import { ImageAsset, Slug, PortableTextBlock, Image } from "sanity"
import { DocumentContainers } from '@/sanity/schemas/articles'

export interface _SettingsPayload extends inherentDocumentData {
	title: string,
	logo?: sanityImage,
	motto?: string,
	blurb?: string,
	contact?: object_Contact,
	about?: PortableTextBlock,
	homepage?: PagePayload,
	navigation?: Array<object_NavigationItem>,
}

export interface _PagePayload extends inherentDocumentData {
	title: string,
	slug: string,
	description?: PortableTextBlock,
	heroImage?: sanityImage,
	sections?: Array<section>
}

export interface _ArchivePayload extends inherentDocumentData {
	title?: string,
	sections?: Array<section>
	description?: PortableTextBlock,
	heroImage?: sanityImage,
}