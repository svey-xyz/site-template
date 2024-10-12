import { section } from '@/types';
import React, { ReactNode } from 'react';
import { Standard } from './Standard'
import { Blocks } from '@/components/Pages/Blocks';

interface ColourMap {
	[key: string]: string
}

const BgColourList: ColourMap = {
	accent: 'bg-accent',
	standard: 'bg-bg',
	'accent-secondary': 'bg-accent-secondary'
}

const FgColourList: ColourMap = {
	accent: 'prose-headings:!text-bg prose:!text-bg text-bg',
	'accent-secondary': 'prose-headings:!text-bg prose:!text-bg text-bg',
	standard: ''
}

export const Colour = ({ data, index }: { data: section, index: number }) => {
	const bgColour = BgColourList[data?.colour || 'standard']
	const fgColour = FgColourList[data?.colour || 'standard']

	return (
		<div
			className={`section ${bgColour} ${fgColour}`}
		>
			<div className={`relative main-padding flex flex-col h-full w-full gap-6`}>
				{data.header &&
					<h2 className=''>
						{data.header}
					</h2>
				}
				<div className={`relative flex flex-col h-full w-full z-10 gap-12 justify-center
					${(data.columns) && 'md:flex-wrap md:!flex-row'}`}>
					{data.blocks &&
						<Blocks blocks={data?.blocks} blockClasses={`section-block`} />
					}
				</div>
			</div>
		</div>
		// <Standard data={ data } index={ index } className={`${bgColour} ${fgColour}`} />
	);
};

export default Colour
