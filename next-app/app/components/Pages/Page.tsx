import { EncodeDataAttributeCallback } from '@sanity/react-loader';
import React from 'react';
import { urlForImage } from '@sanity.next-app/lib/image';
import { Blocks } from '@components.next-app/Pages/Blocks';

export interface PageProps {
	data: any // PagePayload | ArchivePayload | null
	encodeDataAttribute?: EncodeDataAttributeCallback
	draft?: boolean
}

export const Page = ({ data, encodeDataAttribute, draft }: PageProps) => {
	if (!data) return;

	const BG_URL = data.heroImage ? urlForImage(data.heroImage).url() : ''

	return (
		<article className='relative flex flex-grow max-w-full'>
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

			{ data.blocks &&
				<Blocks blocks={data.blocks} blockClasses={`section-block`} draft={draft} />
			}
		</article>
	);
};