import { BusinessMarker } from '@/components/Pages/blocks/Map';
import TextBlock from '@/components/site/TextBlock';
import { readableAddress } from '@/lib/stringFunctions';
import { resolveArticleHref, resolveContactHref } from '@/lib/resolveHref';
import { Button } from '@headlessui/react';
import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import Link from 'next/link'

export const InfoPanel = ({ marker, handler, className }: { marker: BusinessMarker, handler: () => void, className: string }) => {
	const address = marker.business.addresses ? readableAddress(marker.business.addresses[0]) : null

	return (
		<div
			className={`absolute top-0 left-0 h-full w-72 bg-white p-4 ${className} max-h-full overflow-y-scroll`}
		>
			<Button
				className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-700"
				onClick={handler}
			>
				<IoCloseSharp className='h-icon w-icon' />
			</Button>
			<div className=''>
				{ address  &&
					<p className='text-sm text-accent-secondary'>
						{ address }
					</p>
				}
				<Link href={resolveContactHref(marker.business.publicContact)} target="_blank">
					<h2 className="text-lg font-black text-accent underline">
						{marker.business.title}
					</h2>
				</Link>
				
				<TextBlock text={marker.business.description} />
			</div>
		</div>
	);
};

// export default InfoPanel;