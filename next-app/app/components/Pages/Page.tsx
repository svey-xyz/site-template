
import { EncodeDataAttributeCallback } from '@sanity/react-loader';
import { createDataAttribute } from '@sanity/visual-editing'
import React from 'react';
import { urlForImage } from '@sanity.next-app/lib/image';
import { BlockRenderer } from '@components.next-app/Pages/BlockRenderer';
import { config } from '@sanity.next-app/lib/api';
import PageBuilder from '@components.next-app/Pages/PageBuilder';

export interface PageProps {
	data: any // PagePayload | ArchivePayload | null
	encodeDataAttribute?: EncodeDataAttributeCallback
	draft?: boolean
}

export const Page = ({ data, encodeDataAttribute, draft }: PageProps) => {
	if (!data) return;

	console.log('Page: ', data)

	const BG_URL = data.heroImage ? urlForImage(data.heroImage).url() : ''
	return (
		<article
			className='relative flex flex-grow max-w-full main-padding'
			data-sanity={createDataAttribute({
				...config,
				id: data._id,
				type: data._type,
				path: 'blocks.blocks',
			}).toString()}
		>
			{	BG_URL &&
				<div
					className={`relative max-w-full bg-fixed bg-no-repeat bg-cover bg-center`}
					style={{
						backgroundImage: `url(${BG_URL})`
					}}
				>
					<div className='relative main-padding'>
						<h2 className='relative z-10'>
							{data.title}
						</h2>
					</div>
				</div>
			}

			<PageBuilder page={data} />

			{/* { data.blocks &&
				<BlockRenderer
					blocks={data.blocks}
					blockClasses={`section-block`}
					documentAttributes={{
						documentId: data._id,
						documentType: data._type,
					}}
					draft={draft}
					
				/>
			} */}
		</article>
	);
};