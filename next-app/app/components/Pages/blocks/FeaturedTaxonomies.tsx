'use client';

import React from 'react';
import { resolveArchiveHrefFromTaxonomy } from '@lib.next-app/resolveHref';
import { FeaturedTaxonomies_block } from '@next-app/sanity.types';

export const FeaturedTaxonomies = ({ data, className } : { data: FeaturedTaxonomies_block, className?: string }
) => {
	if (!data) return;
	return (
		<div className="flex flex-row flex-wrap justify-center w-full h-4/6 gap-y-4">
			{/* {data.taxonomies?.map((tax, i, arr) => {
				const brightness = 100 - (i * 10)

				return (
					<a
						key={tax._id}
						href={`${resolveArchiveHrefFromTaxonomy(tax)}?filter=${encodeURIComponent(tax.prefLabel)}`} 
						className='group relative flex flex-col gap-4 flex-grow px-5 pt-4 lg:pb-16 pb-8 text-bg justify-end'>
						<div className='absolute inset-0 -z-1'
							style={{
								WebkitFilter: `brightness(${brightness}%)`,
								filter: `brightness(${brightness}%)`,
							}}/>
						<span className='text-lg font-bold opacity-80 group-hover:opacity-100 leading-tight' style={{ whiteSpace: "pre-line" }}>
							{ tax.prefLabel }
						</span>
					</a>
				)
			})} */}
		</div>
	);
};

export default FeaturedTaxonomies