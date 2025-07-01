import React from "react";
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Note_block } from "@next-app/sanity.types";
import { PortableText } from "next-sanity";

type tone = {
	icon: typeof InformationCircleIcon,
}

const defaultTones: Partial<Record<Note_block['style'], tone>> = {
	['info']: {
		icon: InformationCircleIcon
	}
}

export const Note = ({ data, className }: { data: Note_block, className?: string }) => {
	const CardTone = defaultTones[data.style] || {
		icon: InformationCircleIcon
	}

	return (
		<div className={`${className} relative flex flex-row items-center px-6 py-4 gap-4 my-8 w-auto max-w-fit rounded-md border pointer-events-none select-none
			after:bg-accent-secondary/20 border-accent-secondary/60 after:absolute after:inset-0 after:backdrop-blur-xl after:-z-1`}>
			<div className="">
				<CardTone.icon className="w-icon h-icon text-fg" />
				{ data.text && <PortableText value={data.text} /> }
			</div>
		</div>
	)
}

export default Note;