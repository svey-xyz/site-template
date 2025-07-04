"use client";

import { SanityDocument } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";

import { _BLOCK_TYPES } from "@root.site-template/DocumentTypes";
import { dataAttr } from "@sanity.next-app/lib/utils";
import { config } from "@sanity.next-app/lib/api";
import React from "react";
import { Page } from "@next-app/sanity.types";
import { BlockComponent } from "@components.next-app/Pages/blocks";

type Sections = Page['sections']
type Section = ArrElement<Sections>

type Blocks = Section['blocks']
type Block = ArrElement<Blocks>

export const BlockBuilder = ({ section, page }: { section: Section, page: Page }) => {
	// Reconcile References. https://www.sanity.io/docs/enabling-drag-and-drop#ffe728eea8c1
	const blocksObject = useOptimistic<
		Blocks,
		SanityDocument<Page>
		>(section.blocks, (state, action) => {
			if (action.id !== page?._id) return state;

			return action.document.sections?.find((s) => s._key == section._key)?.blocks?.map((block: ArrElement<Blocks>) =>
				state?.find((b: Block) => b._key === block?._key) || block
			)
	});
	
	if (!blocksObject?.length) return null

	return blocksObject.map((block: Block) => 
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
			<BlockComponent data={block} />
		</div>
	)
}
