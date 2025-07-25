import { Page } from "@next-app/sanity.types"
import { stegaClean } from "@sanity/client/stega"
import React from "react";
import {BlockBuilder} from "@components.next-app/Pages/builders/BlockBuilder";
import { dataAttr } from "@sanity.next-app/lib/utils";
import { config } from "process";

type Sections = Page['sections']
type Section = ArrElement<Sections>

export const Section = ({ data, page }: { data: Section, page: Page }) => {
	const bg = stegaClean(data.background)

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
		<section id={data.title} className={`relative grid ${cols} gap-6 grow
			${ (bg == 'opaque') ?
				'mt-12 border-t border-border shadow-lg translucent-bg' :
				''
			}
		`}>
			<div className="main-padding my-6">
				{ data.blocks && <BlockBuilder section={data} page={page}/> }
			</div>
		</section>
	)
}