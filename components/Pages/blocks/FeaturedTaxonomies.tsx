'use client';

import React from 'react';
import { block_FeaturedTaxonomies } from '@/types'
import { Icon } from '@iconify/react';
import { breakAdditionSign } from '@lib/stringFunctions'
import { resolveArchiveHref } from '@/lib/resolveHref';
import { taxTypeToArticleType } from '@/lib/taxTypeToArticleType';

export const FeaturedTaxonomies = ({ data, className } : { data: block_FeaturedTaxonomies | undefined, className?: string } ) => {
	if (!data) return;
	return (
		<div className="flex flex-row flex-wrap justify-center w-full h-4/6 gap-y-4">
			{data.taxonomies?.map((tax, i, arr) => {
				const brightness = 100 - (i * 10)

				return (
					<a
						key={tax._id}
						href={`${resolveArchiveHref(taxTypeToArticleType(tax))}?filter=${encodeURIComponent(tax.prefLabel)}`} 
						className='group relative flex flex-col gap-4 flex-grow px-5 pt-4 lg:pb-16 pb-8 text-bg justify-end border-transparent border-t-2 hover:border-accent-secondary'>
						<div className='absolute inset-0 -z-1 bg-accent/75 saturate-150'
							style={{
								WebkitFilter: `brightness(${brightness}%)`,
								filter: `brightness(${brightness}%)`,
							}}/>
						{ tax.icon?.name &&
							<Icon icon={tax.icon?.name} width={60} className='-rotate-12 group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-300'/>
						}
						<span className='text-lg font-bold opacity-80 group-hover:opacity-100 leading-tight' style={{ whiteSpace: "pre-line" }}>
							{ breakAdditionSign(tax.prefLabel) }
						</span>
					</a>
				)
			})}
		</div>
	);
};

export default FeaturedTaxonomies