import React, { Suspense } from 'react';
import dynamic from 'next/dynamic'
import { BlockList } from './blocks'

export const Blocks = ({ blocks, blockClasses, draft }: 
	{ blocks: any, blockClasses?: string, draft?: boolean }
) => {

	// return []

	return blocks.map((block: any) => {
		const BlockComponent = BlockList[block._type] ??
			dynamic(() => import('@components.next-app/Pages/blocks/Standard'))

		return (
			<BlockComponent
				key={block._key}
				data={block}
				draft={draft}
				className={`${blockClasses} main-padding`}
			/>
		)
	})
};
