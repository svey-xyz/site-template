"use client";

import { Page } from "@next-app/sanity.types"
import { dataAttr } from "@sanity.next-app/lib/utils";
import { SanityDocument } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
import { config } from "@sanity.next-app/lib/api";

import React from "react";
import {BlockBuilder2} from "@components.next-app/Pages/PageBuilder";

type Section = Page['sections']

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
	? ElementType
	: never;

export const Section = ({ data }: { data: ArrElement<Section> }) => {

	return (
		<section id={data.title} className={`relative flex flex-col flex-grow` + data.background == 'opaque' ? `mt-12 border-t border-accent-secondary/40 dark:shadow-xl shadow-lg -mb-[--bottom-spacing] pb-[--bottom-spacing] z-10
		after:inset-0 after:absolute after:-z-1 after:backdrop-blur-2xl after:bg-gradient-to-b
		after:from-bg/50 after:to-bg after:to-75% dark:after:from-bg/70 dark:after:to-bg` : ''}>
			<BlockBuilder2 section={data} />
			
		</section>
	)
}

export default Section


export const SectionBuilder = ({ page }: { page: Page }) => {
	const sectionsObject = useOptimistic<
		any,
		SanityDocument<Page>
	>(page?.sections || [], (currentSections, action) => {
		if (action.id !== page?._id) return currentSections;

		if (action.document.sections) {
			// Reconcile References. https://www.sanity.io/docs/enabling-drag-and-drop#ffe728eea8c1
			return {
				sections: action.document.sections.map(
				(section: any) =>
						currentSections?.find((b: any) => b._key === section?._key) || section,
			)
		} }

		return currentSections;
	});

	// if (!page) return renderEmptyState(page);

	return sectionsObject.map((section: any) => {
			return (
					<div
						key={section._key}
						className="h-fit my-4"
						aria-label="section"
						data-sanity={dataAttr({
							...config,
							id: page._id,
							type: page._type,
							path: `sections[_key=="${section._key}"]`,
						}).toString()}
					>
					{React.createElement(Section, {
							key: section._key,
							data: section,
							// className: `main-padding`
						}) }
					</div>
						
				)
		})
}