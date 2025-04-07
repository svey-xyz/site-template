"use client";

import { SanityDocument } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
import Link from "next/link";

import { _BLOCK_TYPES } from "@root.site-template/DocumentTypes";
import BlockList from "@components.next-app/Pages/blocks";
import { dataAttr } from "@sanity.next-app/lib/utils";
import { config } from "@sanity.next-app/lib/api";
import React from "react";
import dynamic from "next/dynamic";

type PageBuilderSection = {
	_key: string;
	_type: string;
};

type PageData = {
	_id: string;
	_type: string;
	blocks?: PageBuilderSection[];
};


function renderEmptyState(page: any) {
	if (!page) return null;

	return (
		<div className="container">
			<h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
				This page has no content!
			</h1>
			<p className="mt-2 text-base text-gray-500">
				Open the page in Sanity Studio to add content.
			</p>
			<div className="mt-10 flex">
				<Link
					className="rounded-full flex gap-2 mr-6 items-center bg-black hover:bg-red-500 focus:bg-cyan-500 py-3 px-6 text-white transition-colors duration-200"
					href={`/structure/intent/edit/template=page;type=page;path=pageBuilder;id=${page._id}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					Add content to this page
				</Link>
			</div>
		</div>
	);
}

export default function BlockBuilder({ page }: { page: any }) {
	const blocksObject = useOptimistic<
		any,
		SanityDocument<any>
	>(page?.blocks || [], (currentBlocks, action) => {
		if (action.id !== page?._id) return currentBlocks;

		if (action.document.blocks) {
			// Reconcile References. https://www.sanity.io/docs/enabling-drag-and-drop#ffe728eea8c1
			return { blocks: action.document.blocks.blocks.map(
				(block: any) =>
					currentBlocks?.blocks?.find((b: any) => b._key === block?._key) || block,
			)
		} }

		return currentBlocks;
	});

	if (!page) return renderEmptyState(page);

	const StandardBlock = dynamic(() => import('@components.next-app/Pages/blocks/Standard'));

	return blocksObject ?
		blocksObject.blocks.map((block: any) => {
			const BlockComponent =
				!isBlockType(block._type) ?
					StandardBlock :
					BlockList[block._type as _BLOCK_TYPES] ?? StandardBlock
					
			return (
					<div
						key={block._key}
						className="h-fit my-4"
						aria-label="block"
						data-sanity={dataAttr({
							...config,
							id: page._id,
							type: page._type,
							path: `blocks.blocks[_key=="${block._key}"]`,
						}).toString()}
					>
						{ React.createElement(BlockComponent, {
							key: block._key,
							data: block,
							// className: `main-padding`
						}) }
					</div>
						
				)
		}) :
		renderEmptyState(page);
}


function isBlockType(value: string): value is _BLOCK_TYPES {
	return Object.values(_BLOCK_TYPES).includes(value as _BLOCK_TYPES);
}
