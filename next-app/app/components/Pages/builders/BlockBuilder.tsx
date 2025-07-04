"use client";

import { SanityDocument } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
import Link from "next/link";

import { _BLOCK_TYPES } from "@root.site-template/DocumentTypes";
import { dataAttr } from "@sanity.next-app/lib/utils";
import { config } from "@sanity.next-app/lib/api";
import React from "react";
import { Blocks, Page } from "@next-app/sanity.types";
import { BlockComponents } from "@components.next-app/Pages/blocks";

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

type _block = ArrElement<Blocks['blocks']>

export const BlockBuilder = ({ section, page }: { section: ArrElement<Page['sections']>, page: Page }) => {
	// Reconcile References. https://www.sanity.io/docs/enabling-drag-and-drop#ffe728eea8c1
	if (!section?.blocks) return []
	const blocksObject = useOptimistic<
		_block[],
		SanityDocument<Page>
		>(section.blocks, (state, action) => {
			if (action.id !== page?._id) return state;

			return (action.document.sections?.find((s) => s._key == section._key)?.blocks?.map((block: _block) =>
				state?.find((b: _block) => b._key === block?._key) || block) || state
		)
	});
	

	// if (!page) return renderEmptyState(page);

	return blocksObject?.flatMap((block: _block) => {
		if (!block) return []
		return (
			<div
				key={block._key}
				className="relative h-fit z-10"
				aria-label="block"
				data-sanity={dataAttr({
					...config,
					id: page._id,
					type: page._type,
					path: `sections[_key=="${section._key}"].blocks[_key=="${block._key}"]`,
				}).toString()}
			>
				<BlockComponents data={block} />
			</div>
		)
	})
}
