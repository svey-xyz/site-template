import React from 'react';
import dynamic from 'next/dynamic'
import { BlockList } from './blocks/'
import { load_Settings } from '@/sanity/queries/loader';

export const Blocks = async ({ blocks, blockClasses }: { blocks: BLOCK_TYPES, blockClasses?: string }) => {
	const settings = await load_Settings()

	return blocks.map((block, i) => {
		const BlockComponent = BlockList[block._type] ??
			dynamic(() => import('@/components/Pages/blocks/Standard'))

		return (
			<BlockComponent
				data={block}
				siteData={settings}
				className={`${blockClasses} main-padding`}
			/>
		)
	})
};