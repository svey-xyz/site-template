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
import { Page } from "@next-app/sanity.types";

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

function isBlockType(value: string): value is _BLOCK_TYPES {
	return Object.values(_BLOCK_TYPES).includes(value as _BLOCK_TYPES);
}


type Sections = Page['sections']

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
	? ElementType
	: never;

type Section = ArrElement<Sections>
type Blocks = Section['blocks']
type Block = ArrElement<Blocks>

export const BlockBuilder = ({ section, page }: { section: Section, page: Page }) => {
	// Reconcile References. https://www.sanity.io/docs/enabling-drag-and-drop#ffe728eea8c1
	const blocksObject = useOptimistic<
		Blocks,
		SanityDocument<Page>
		>(section.blocks, (state, action) => {
		// console.log('Action ID: ', action.id, '\n Matches: ', action.id == page?._id)
		if (action.id !== page?._id) return state;

			// console.log('document: ', action.document)
		return action.document.sections?.find((s) => s._key == section._key)?.blocks?.map((block: ArrElement<Blocks>) =>
			state?.find((b: Block) => b._key === block?._key) || block
		)
	});

	// if (!page) return renderEmptyState(page);

	const StandardBlock = dynamic(() => import('@components.next-app/Pages/blocks/Standard'));

	return blocksObject?.map((block: Block) => {
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
						path: `sections[_key=="${section._key}"].blocks[_key=="${block._key}"]`,
					}).toString()}
				>
					{React.createElement(BlockComponent, {
						key: block._key,
						data: block,
						// className: `main-padding`
					})}
				</div>

			)
		})
}
