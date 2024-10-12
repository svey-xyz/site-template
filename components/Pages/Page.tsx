import dynamic from 'next/dynamic'
import { ArchivePayload, PagePayload, section } from '@/types';
import { EncodeDataAttributeCallback } from '@sanity/react-loader';
import React from 'react';
import { createDataAttribute } from "@sanity/visual-editing";
import urlFor from '@/lib/urlFor';

interface ContainerMap {
	[key: string]: React.ComponentType<{ data:section, index: number }>
}

export interface PageProps {
	data: PagePayload | ArchivePayload | null
	encodeDataAttribute?: EncodeDataAttributeCallback
}

const ContainerList: ContainerMap = {
	Standard: dynamic(() => import('@/components/Pages/sections/Standard')),
	Video: dynamic(() => import('@/components/Pages/sections/Video')),
	Image: dynamic(() => import('@/components/Pages/sections/Image')),
	Colour: dynamic(() => import('@/components/Pages/sections/Colour')),

}

export const Page = ({ data, encodeDataAttribute }: PageProps) => {
	if (!data) return;

	const BG_URL = data?.heroImage ? urlFor(data?.heroImage).url() : ''

	return (
		<article className=''>
			{	BG_URL &&
				<div
					className={`-mt-[--total-header-height] relative max-w-full bg-fixed bg-no-repeat bg-cover bg-center text-accent
						after:absolute after:inset-0 after:bg-gradient-to-t after:from-bg after:to-bg/0`}
					style={{
						backgroundImage: `url(${BG_URL})`
					}}
				>
					<div className='relative main-padding'>
						<h2 className='relative pt-80 pb-6 z-10'>
							{data.title}
						</h2>
					</div>
				</div>
			}

			{ data.sections &&
				data.sections.map((section, i) => {
					const Section = ContainerList[section.type] ?? ContainerList.Standard
					const attr = createDataAttribute({
						id: data._id,
						type: data._type,
						path: ['sections', i]
					});

					return (
						<div data-sanity={attr()} key={section._key}>
							<Section data={section} index={i} />
						</div>
					)
				})
			}
		</article>
	);
};