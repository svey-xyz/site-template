import { Page } from "@next-app/sanity.types"

import React from "react";
import {BlockBuilder} from "@components.next-app/Pages/builders/BlockBuilder";

type Sections = Page['sections']

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
	? ElementType
	: never;

type Section = ArrElement<Sections>

export const Section = ({ data, page }: { data: Section, page: Page }) => {
	const cols = (() => {
		switch (data.layout) {
			case "1": return 'grid-cols-[1fr]'
			case "1-1": return 'grid-cols-[1fr_1fr]'
			case "1-1-1": return 'grid-cols-[1fr_1fr_1fr]'
			case "2-1": return 'grid-cols-[2fr_1fr]'
			case "1-2": return 'grid-cols-[1fr_2fr]'
			case "2-1-1": return 'grid-cols-[2fr_1fr_1fr]'
			case "1-2-1": return 'grid-cols-[1fr_2fr_1fr]'
			case "1-1-2": return 'grid-cols-[1fr_1fr_2fr]'
			default: return '1fr'
		}
	})()

	return (
		<section id={data.title} className={`relative grid ${cols}`}>
			<BlockBuilder section={data} page={page} />
		</section>
	)
}

// + data.background == 'opaque' ? `mt-12 border-t border-accent-secondary/40 dark:shadow-xl shadow-lg -mb-[--bottom-spacing] pb-[--bottom-spacing] z-10
// after:inset-0 after:absolute after:-z-1 after:backdrop-blur-2xl after:bg-gradient-to-b
// after:from-bg/50 after:to-bg after:to-75% dark:after:from-bg/70 dark:after:to-bg` : ''