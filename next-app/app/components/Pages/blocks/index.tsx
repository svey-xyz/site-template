import dynamic from 'next/dynamic'
import { Archive_block, Contact_block, FeaturedArticles_block, FeaturedTaxonomies_block, Gallery_block, Image_block, Info_block, Newsletter_block, Note_block, Text_block, Page, Socials_block } from '@next-app/sanity.types';
import React from 'react';
import { _BLOCK_TYPES } from '@root.site-template/DocumentTypes';
import { WithKey } from '@sanity.next-app/lib/utils';

import {FeaturedTaxonomies as FeaturedTaxonomiesComponent} from '@components.next-app/Pages/blocks/FeaturedTaxonomies';
import {Text as TextComponent} from '@components.next-app/Pages/blocks/Text';
import {Newsletter as NewsletterComponent} from '@components.next-app/Pages/blocks/Newsletter';
import {FeaturedArticles as FeaturedArticlesComponent} from '@components.next-app/Pages/blocks/FeaturedArticles';
import {Info as InfoComponent} from '@components.next-app/Pages/blocks/Info';
import {Archive as ArchiveComponent} from '@components.next-app/Pages/blocks/Archive';
import {Image as ImageComponent} from '@components.next-app/Pages/blocks/Image';
import {Gallery as GalleryComponent} from '@components.next-app/Pages/blocks/Gallery';
import {Contact as ContactComponent} from '@components.next-app/Pages/blocks/Contact';
import {Note as NoteComponent} from '@components.next-app/Pages/blocks/Note';
import {Socials as SocialsComponent} from '@components.next-app/Pages/blocks/Socials';

import {Standard as StandardComponent} from '@components.next-app/Pages/blocks/Standard';

interface genericBlockData {
	_type: _BLOCK_TYPES
	_key: string
	[x: string]: unknown;
}

export const BlockComponent = ({ data }:{ data: genericBlockData }) => {
	switch (data._type) {
		case _BLOCK_TYPES.FEATURED_TAXONOMIES: return <FeaturedTaxonomiesComponent data={data as FeaturedTaxonomies_block} />
		case _BLOCK_TYPES.TEXT: return <TextComponent data={data as Text_block} />
		case _BLOCK_TYPES.NEWSLETTER: return <NewsletterComponent data={data as Newsletter_block} />
		case _BLOCK_TYPES.FEATURED_ARTICLES: return <FeaturedArticlesComponent data={data as WithKey<FeaturedArticles_block>} />
		case _BLOCK_TYPES.INFO: return <InfoComponent data={data as WithKey<Info_block>} />
		case _BLOCK_TYPES.ARCHIVE: return <ArchiveComponent data={data as Archive_block} />
		case _BLOCK_TYPES.IMAGE: return <ImageComponent data={data as Image_block} />
		case _BLOCK_TYPES.GALLERY: return <GalleryComponent data={data as Gallery_block} />
		case _BLOCK_TYPES.CONTACT: return <ContactComponent data={data as Contact_block} />
		case _BLOCK_TYPES.NOTE: return <NoteComponent data={data as WithKey<Note_block>} />
		case _BLOCK_TYPES.SOCIALS: return <SocialsComponent data={data as WithKey<Socials_block>} />
		default: return <StandardComponent data={data} />
	}
}