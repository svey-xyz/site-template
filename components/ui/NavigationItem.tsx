'use client'

import { ArchivePayload, object_NavigationItem, PagePayload } from '@/types';
import { Popover, PopoverButton, PopoverPanel, CloseButton } from '@headlessui/react';
import React from 'react';
import Link from 'next/link'
import { resolvePageHref } from '@/lib/resolveHref';
import { FaChevronDown } from "react-icons/fa";

type NavigationItemParams = {
	item: object_NavigationItem,
}

export const NavigationItem = ({ item }: NavigationItemParams) => {
	const title = item.title

	if (!item.pages) return []
	if (item.pages.length > 1) return PopoverNavigation({title, pages: item.pages})
	return StaticNavigation({title, page: item.pages[0]})

};

export default NavigationItem;

type NavigationTitleParams = {
	title: string,
	className?: string,
	chevron?: boolean
}

const NavigationTitle = ({ title, className, chevron }: NavigationTitleParams) => {
	return (
		<span className={`${className} font-bold text-bg outline-none px-4 py-1 transition-colors duration-200 flex flex-row items-center justify-center gap-1`}>
			{title}
			{ chevron &&
				<FaChevronDown className='' />
			}
		</span>
	)
}

type StaticNavigationParams = {
	title: string,
	page: PagePayload | ArchivePayload,
}

const StaticNavigation = ({ title, page }: StaticNavigationParams) => {
 return (
	 <Link href={resolvePageHref(page)} className='group'>
		 <NavigationTitle title={title} className={`bg-accent-secondary/60 group-hover:bg-accent-secondary/80`} />
	</Link>
 )
}

type PopoverParams = {
	title: string,
	pages: ArchivePayload[] | PagePayload[],
}

const PopoverNavigation = ({ title, pages }: PopoverParams) => {

	return (
	<Popover className="group relative z-10">
		<PopoverButton className={`outline-none flex flex-row`} >
			<NavigationTitle title={title} chevron={true}
				className='bg-accent-secondary/60 group-hover:bg-accent-secondary/80 group-data-[open]:bg-accent/80 group-data-[open]:hover:bg-accent/60' />
		</PopoverButton>
		<PopoverPanel>
			{({ close }) => {
				const items = pages.flatMap((page) => {
					return (
						<Link href={resolvePageHref(page)} key={page._id} className='relative z-10 px-4 py-2 text-sm font-bold hover:underline' onClick={() => { close() }}>
							{page.title}
						</Link>
					)
				})
				return (
					<div className="absolute flex flex-col z-50 bg-bg w-full gap-1 py-4 h-fit mt-1">
						{ items }
					</div>
				)
			}}
		</PopoverPanel>
	</Popover>
	)
}