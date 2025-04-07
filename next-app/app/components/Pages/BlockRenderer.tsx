import React, { Suspense } from 'react';
import dynamic from 'next/dynamic'
import { BlockList } from './blocks'

import { _BLOCK_TYPES } from '@root.site-template/DocumentTypes';
import { config } from '@sanity.next-app/lib/api';
import { dataAttr } from '@sanity.next-app/lib/utils';

type SanityDocumentAttributes = {
	documentId: string
	documentType: string
}

export const BlockRenderer = ({ block, blockClasses, documentAttributes }: 
	{ block: any, blockClasses?: string, documentAttributes: SanityDocumentAttributes }
) => {
	const StandardBlock = dynamic(() => import('@components.next-app/Pages/blocks/Standard'));
	const BlockComponent =
		!isBlockType(block._type) ?
			StandardBlock :
			BlockList[block._type as _BLOCK_TYPES] ?? StandardBlock

	return (
		<div
			data-sanity={dataAttr({
				...config,
				id: documentAttributes.documentId,
				type: documentAttributes.documentType,
				path: `blocks.blocks[_key=="${block._key}"]`,
			}).toString()}
		>
			{ React.createElement(BlockComponent, {
				key: block._key,
				data: block,
				className: `${blockClasses} main-padding`
			}) }
		</div>
			
	)
}

function isBlockType(value: string): value is _BLOCK_TYPES {
	return Object.values(_BLOCK_TYPES).includes(value as _BLOCK_TYPES);
}
