import React, { Suspense } from 'react';
import dynamic from 'next/dynamic'
import { BlockList } from './blocks'
import { _BLOCK_TYPES } from '@root.site-template/DocumentTypes';

export const Blocks = ({ blocks, blockClasses, draft }: 
	{ blocks: any, blockClasses?: string, draft?: boolean }
) => {

	return blocks.blocks.map((block: any) => {
		if (!isBlockType(block._type)) return
		const BlockComponent = BlockList[block._type as _BLOCK_TYPES] ??
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

function isBlockType(value: string): value is _BLOCK_TYPES {
	return Object.values(_BLOCK_TYPES).includes(value as _BLOCK_TYPES);
}
