import React from 'react';
import dynamic from 'next/dynamic'
import { BlockList } from './blocks/'

export const Blocks = async ({ blocks, blockClasses }: { blocks: BLOCK_TYPES, blockClasses?: string }) => {

	return blocks.map((block, i) => {
		const BlockComponent = BlockList[block._type] ??
			dynamic(() => import('@/components/Pages/blocks/Standard'))

		return (
			<BlockComponent
				data={block}
				// siteData={settings}
				className={`${blockClasses} main-padding`}
			/>
		)
	})
};