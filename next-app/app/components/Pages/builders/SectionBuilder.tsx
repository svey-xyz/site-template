'use client'

import { Page } from "@next-app/sanity.types"
import { dataAttr } from "@sanity.next-app/lib/utils";
import { SanityDocument } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
import { config } from "shared-config";
import React from "react";
import { Section } from "@components.next-app/Pages/sections";

type Sections = Page['sections']
type Section = ArrElement<Sections>

export const SectionBuilder = ({ page }: { page: Page }) => {
	// Reconcile References. https://www.sanity.io/docs/enabling-drag-and-drop#ffe728eea8c1
	const sectionsObject = useOptimistic<
		Sections,
		SanityDocument<Page>
	>(page.sections, (state, action) => {
		if (action.id !== page._id) return state;

		return action.document.sections?.map((section: Section) => 
			state?.find((s: Section) => s._key === section?._key) ?? section
		)
	})

	if (!sectionsObject?.length) return null

	return (
		<div
			className="flex flex-col grow"
			data-sanity={dataAttr({
				...config,
				id: page._id,
				type: page._type,
				path: `sections`,
			}).toString()}
		>
			{ sectionsObject.map((section: Section) =>
				<div
					key={section._key}
					className="relative flex flex-col grow h-full"
					aria-label="section"
					data-sanity={dataAttr({
						...config,
						id: page._id,
						type: page._type,
						path: `sections[_key=="${section._key}"]`,
					}).toString()}
				>
					<Section data={section} page={page} />
				</div>
			) }
		</div>
	)
	
	
	
}