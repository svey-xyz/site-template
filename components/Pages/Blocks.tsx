import React from 'react';
import dynamic from 'next/dynamic'
import { loadSettings } from '@/sanity/queries/loadQuery';
import { BlockList } from './blocks'
import { BlockList as ThemeBlockList } from '@theme/blocks'

export const Blocks = async ({ blocks, blockClasses }: { blocks: BLOCK_TYPES, blockClasses?: string }) => {
	const settings = await loadSettings()

	return blocks.map(async(block, i) => {
		const BlockComponent = BlockList[block._type] ??
			ThemeBlockList[block._type] ??
			dynamic(() => import('@/components/Pages/blocks/Standard'))

		return (
			<BlockComponent
				data={block}
				siteData={settings}
				className={`${blockClasses} ${ block.hiddenOnMobile && 'hidden lg:flex' }`}
			/>
		)
	})
};