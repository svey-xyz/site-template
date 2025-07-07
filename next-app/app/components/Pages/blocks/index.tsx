import dynamic from 'next/dynamic'
import { Archive_block, Contact_block, FeaturedArticles_block, FeaturedTaxonomies_block, Gallery_block, Image_block, Info_block, Newsletter_block, Note_block, Text_block, Page } from '@next-app/sanity.types';
import React from 'react';

// import {FeaturedTaxonomies as FeaturedTaxonomiesComponent} from '@components.next-app/Pages/blocks/FeaturedTaxonomies';
// import {Text as TextComponent} from '@components.next-app/Pages/blocks/Text';
// import {Newsletter as NewsletterComponent} from '@components.next-app/Pages/blocks/Newsletter';
// import {FeaturedArticles as FeaturedArticlesComponent} from '@components.next-app/Pages/blocks/FeaturedArticles';
// import {Info as InfoComponent} from '@components.next-app/Pages/blocks/Info';
// import {Archive as ArchiveComponent} from '@components.next-app/Pages/blocks/Archive';
// import {Image as ImageComponent} from '@components.next-app/Pages/blocks/Image';
// import {Gallery as GalleryComponent} from '@components.next-app/Pages/blocks/Gallery';
// import {Contact as ContactComponent} from '@components.next-app/Pages/blocks/Contact';
// import {Note as NoteComponent} from '@components.next-app/Pages/blocks/Note';
// import {Standard as StandardComponent} from '@components.next-app/Pages/blocks/Standard';

const FeaturedTaxonomiesComponent = dynamic(() => import('@components.next-app/Pages/blocks/FeaturedTaxonomies'))
const TextComponent = dynamic(() => import('@components.next-app/Pages/blocks/Text'))
const NewsletterComponent = dynamic(() => import('@components.next-app/Pages/blocks/Newsletter'))
const FeaturedArticlesComponent = dynamic(() => import('@components.next-app/Pages/blocks/FeaturedArticles'))
const InfoComponent = dynamic(() => import('@components.next-app/Pages/blocks/Info'))
const ArchiveComponent = dynamic(() => import('@components.next-app/Pages/blocks/Archive'))
const ImageComponent = dynamic(() => import('@components.next-app/Pages/blocks/Image'))
const GalleryComponent = dynamic(() => import('@components.next-app/Pages/blocks/Gallery'))
const ContactComponent = dynamic(() => import('@components.next-app/Pages/blocks/Contact'))
const NoteComponent = dynamic(() => import('@components.next-app/Pages/blocks/Note'))
const StandardComponent = dynamic(() => import('@components.next-app/Pages/blocks/Standard'))

type _section = ArrElement<Page['sections']>
type _block = ArrElement<_section['blocks']>

interface genericBlockData {
	_type: _block['_type']
	[x: string]: unknown;
}

export const BlockComponent = ({ data }:{ data: genericBlockData }) => {
	switch (data._type) {
		case 'featuredTaxonomies_block': return <FeaturedTaxonomiesComponent data={data as FeaturedTaxonomies_block} />
		case 'text_block': return <TextComponent data={data as Text_block} />
		case 'newsletter_block': return <NewsletterComponent data={data as Newsletter_block} />
		case 'featuredArticles_block': return <FeaturedArticlesComponent data={data as FeaturedArticles_block} />
		case 'info_block': return <InfoComponent data={data as Info_block} />
		case 'archive_block': return <ArchiveComponent data={data as Archive_block} />
		case 'image_block': return <ImageComponent data={data as Image_block} />
		case 'gallery_block': return <GalleryComponent data={data as Gallery_block} />
		case 'contact_block': return <ContactComponent data={data as Contact_block} />
		case 'note_block': return <NoteComponent data={data as Note_block} />
		default: return <StandardComponent data={data} />
	}
}