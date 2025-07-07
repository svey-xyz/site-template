import { Page } from "@next-app/sanity.types"

import React from "react";
import {BlockBuilder} from "@components.next-app/Pages/builders/BlockBuilder";
import { dataAttr } from "@sanity.next-app/lib/utils";
import { config } from "process";

type Sections = Page['sections']
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
			default: return 'grid-cols-[1fr]'
		}
	})()

	return (
		<section id={data.title} className={`relative grid ${cols} gap-6
			${ (data.background?.match('opaque') != null) ?
				'mt-12 border-t border-accent-secondary/40 shadow-lg after:inset-0 after:absolute after:-z-1 after:backdrop-blur-2xl after:bg-gradient-to-b after:from-bg/50 after:to-bg after:to-75%' :
				''
			}
		`}>
			<div className="main-padding my-6">
				{ data.blocks && <BlockBuilder section={data} page={page}/> }
			</div>
		</section>
	)
}