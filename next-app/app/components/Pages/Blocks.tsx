import React, { Suspense } from 'react';
import dynamic from 'next/dynamic'
import { BlockList } from './blocks'

export const Blocks = ({ blocks, blockClasses, draft }: any
	// { blocks: BLOCK_TYPES, blockClasses?: string, draft?: boolean }
) => {

	return []

	// return blocks.map((block, i) => {
	// 	const BlockComponent = BlockList[block._type] ??
	// 		dynamic(() => import('@/components/Pages/blocks/Standard'))

	// 	return (
	// 		<BlockComponent
	// 			key={block._key}
	// 			data={block}
	// 			draft={draft}
	// 			className={`${blockClasses} main-padding`}
	// 		/>
	// 	)
	// })
};
