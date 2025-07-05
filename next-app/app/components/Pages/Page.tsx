import React from 'react';
import { urlForImage } from '@sanity.next-app/lib/image';
import { SectionBuilder } from '@components.next-app/Pages/builders/SectionBuilder';
import { Page as PageData} from '@next-app/sanity.types';

export interface PageProps {
	data: PageData
	draft?: boolean
}

export const Page = ({ data, draft }: PageProps) => {
	if (!data) return;

	const BG_URL = data.heroImage ? urlForImage(data.heroImage).url() : ''
	return (
		<article className='relative flex flex-col flex-grow max-w-full'>
			{/* {	BG_URL &&
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
			} */}

			<SectionBuilder page={data} />
		</article>
	);
};