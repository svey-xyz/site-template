import dynamic from 'next/dynamic'
import { Blocks } from '@next-app/sanity.types';
import React from 'react';

type _block = ArrElement<Blocks['blocks']>

interface genericBlockData {
	_type: _block['_type']
	[x: string]: unknown;
}
export const BlockComponents = ({ data }:{ data: genericBlockData }) => {

	switch (data._type) {
		case 'featuredTaxonomies_block':
			const FeaturedTaxonomiesComponent = dynamic(() => import('@components.next-app/Pages/blocks/FeaturedTaxonomies'))
			const FeaturedTaxonomiesData = data as React.ComponentPropsWithoutRef<typeof FeaturedTaxonomiesComponent>['data']
			return <FeaturedTaxonomiesComponent data={FeaturedTaxonomiesData} />
		case 'text_block':
			const TextComponent = dynamic(() => import('@components.next-app/Pages/blocks/Text'))
			const TextData = data as React.ComponentPropsWithoutRef<typeof TextComponent>['data']
			return <TextComponent data={TextData} />
		case 'newsletter_block':
			const NewsletterComponent = dynamic(() => import('@components.next-app/Pages/blocks/Newsletter'))
			const NewsletterData = data as React.ComponentPropsWithoutRef<typeof NewsletterComponent>['data']
			return <NewsletterComponent data={NewsletterData} />
		case 'featuredArticles_block':
			const FeaturedArticlesComponent = dynamic(() => import('@components.next-app/Pages/blocks/FeaturedArticles'))
			const FeaturedArticlesData = data as React.ComponentPropsWithoutRef<typeof FeaturedArticlesComponent>['data']
			return <FeaturedArticlesComponent data={FeaturedArticlesData} />
		case 'info_block':
			const InfoComponent = dynamic(() => import('@components.next-app/Pages/blocks/Info'))
			const InfoData = data as React.ComponentPropsWithoutRef<typeof InfoComponent>['data']
			return <InfoComponent data={InfoData} />
		case 'archive_block':
			const ArchiveComponent = dynamic(() => import('@components.next-app/Pages/blocks/Archive'))
			const ArchiveData = data as React.ComponentPropsWithoutRef<typeof ArchiveComponent>['data']
			return <ArchiveComponent data={ArchiveData} />
		case 'image_block':
			const ImageComponent = dynamic(() => import('@components.next-app/Pages/blocks/Image'))
			const ImageData = data as React.ComponentPropsWithoutRef<typeof ImageComponent>['data']
			return <ImageComponent data={ImageData} />
		case 'gallery_block':
			const GalleryComponent = dynamic(() => import('@components.next-app/Pages/blocks/Gallery'))
			const GalleryData = data as React.ComponentPropsWithoutRef<typeof GalleryComponent>['data']
			return <GalleryComponent data={GalleryData} />
		case 'contact_block':
			const ContactComponent = dynamic(() => import('@components.next-app/Pages/blocks/Contact'))
			const ContactData = data as React.ComponentPropsWithoutRef<typeof ContactComponent>['data']
			return <ContactComponent data={ContactData} />
		case 'note_block':
			const NoteComponent = dynamic(() => import('@components.next-app/Pages/blocks/Note'))
			const NoteData = data as React.ComponentPropsWithoutRef<typeof NoteComponent>['data']
			return <NoteComponent data={NoteData} />
		default:
			const DefaultComponent = dynamic(() => import('@components.next-app/Pages/blocks/Standard'));
			return <DefaultComponent data={data} />

	}
}