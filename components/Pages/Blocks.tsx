import React from 'react';
import dynamic from 'next/dynamic'
import { loadSettings } from '@/sanity/queries/loadQuery';
import { BlockList } from './blocks/'
import { getActiveTheme } from '@/lib/getTheme';

export const Blocks = async ({ blocks, blockClasses }: { blocks: BLOCK_TYPES, blockClasses?: string }) => {
	const settings = await loadSettings()
	const theme = await getActiveTheme()
	const themeBlocks: BLOCK_MAP = theme?.blocks ?? {}

	return blocks.map((block, i) => {
		console.log('Block: ', block)
		const BlockComponent = BlockList[block._type] ??
			themeBlocks[block._type] ??
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