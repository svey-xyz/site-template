import {
	_inherentDocumentData,
	_inherentObjectData
} from './inherent'

import {
	_ARTICLE_TYPES, _article, _taxonomy,
	_article_Article, _taxonomy_Article
} from './articles'

import {
	_SettingsPayload, _PagePayload, _ArchivePayload,
} from './documents'

import {
	_block, _BLOCK_TYPES,
	_block_Archive, _block_Contact, _block_FeaturedArticles, _block_FeaturedTaxonomies, _block_Gallery, _block_Image, _block_Info, _block_Newsletter, _block_Text,
} from './blocks'

import {
	_sanityImage, _icon, _section,
	_object_Contact, _object_Date, _object_Link, _object_NavigationItem, _object_Social,
} from './objects'



declare global {
	// INHERENT
	type inherentDocumentData = _inherentDocumentData;
	type inherentObjectData = _inherentObjectData;

	// ARTICLES
	type ARTICLE_TYPES = _ARTICLE_TYPES;
	type article = _article;
	type taxonomy = _taxonomy;
	type article_Article = _article_Article;
	type taxonomy_Article = _taxonomy_Article;

	// DOCUMENTS
	type SettingsPayload = _SettingsPayload;
	type PagePayload = _PagePayload;
	type ArchivePayload = _ArchivePayload;

	// BLOCKS
	type block = _block;
	type block_Archive = _block_Archive;
	type block_Contact = _block_Contact;
	type block_FeaturedArticles = _block_FeaturedArticles;
	type block_FeaturedTaxonomies = _block_FeaturedTaxonomies;
	type block_Gallery = _block_Gallery;
	type block_Image = _block_Image;
	type block_Info = _block_Info;
	type block_Newsletter = _block_Newsletter;
	type block_Text = _block_Text;
	type BLOCK_TYPES = _BLOCK_TYPES;

	// OBJECTS
	type sanityImage = _sanityImage;
	type icon = _icon;
	type section = _section;
	type object_Contact = _object_Contact;
	type object_Date = _object_Date;
	type object_Link = _object_Link;
	type object_NavigationItem = _object_NavigationItem;
	type object_Social = _object_Social;

	type sanityFields = FieldDefinition<"string" | "number" | "boolean" | "object" | "array" | "block" | "date" | "datetime" | "document" | "file" | "geopoint" | "image" | "reference" | "crossDatasetReference" | "slug" | "text" | "url" | "email" | "color", undefined>[]
}


export {};