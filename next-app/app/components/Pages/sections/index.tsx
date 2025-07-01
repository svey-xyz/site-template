import { Page } from "@next-app/sanity.types"

import React from "react";
import {BlockBuilder} from "@components.next-app/Pages/builders/BlockBuilder";

type Sections = Page['sections']

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
	? ElementType
	: never;

type Section = ArrElement<Sections>

export const Section = ({ data, page }: { data: Section, page: Page }) => {
	return (
		<section id={data.title} className={`relative flex flex-col flex-grow` + data.background == 'opaque' ? `mt-12 border-t border-accent-secondary/40 dark:shadow-xl shadow-lg -mb-[--bottom-spacing] pb-[--bottom-spacing] z-10
		after:inset-0 after:absolute after:-z-1 after:backdrop-blur-2xl after:bg-gradient-to-b
		after:from-bg/50 after:to-bg after:to-75% dark:after:from-bg/70 dark:after:to-bg` : ''}>
			<BlockBuilder section={data} page={page} />
		</section>
	)
}