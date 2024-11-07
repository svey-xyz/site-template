'use client'

import { Popover, PopoverButton, PopoverPanel, CloseButton } from '@headlessui/react';
import React from 'react';
import Link from 'next/link'
import { resolvePageHref } from '@/lib/resolveHref';

type NavigationItemParams = {
	group: object_NavigationGroup,
}

export const NavigationItem = ({ group }: NavigationItemParams) => {

	if (!group.items) return []

	const title = group.title ?? group.items[0].title ?? group.items[0].page.title

	if (group.items.length > 1) return PopoverNavigation({title, items: group.items})
	return StaticNavigation({ title, page: group.items[0].page })

};

export default NavigationItem;

type NavigationTitleParams = {
	title?: string,
	className?: string,
	chevron?: boolean
}

const NavigationTitle = ({ title, className, chevron }: NavigationTitleParams) => {
	return (
		<span className={`${className} px-4 py-1 flex flex-row items-center justify-center gap-1`}>
			{title}
		</span>
	)
}

type StaticNavigationParams = {
	title?: string,
	page: PagePayload | ArchivePayload,
}

const StaticNavigation = ({ title, page }: StaticNavigationParams) => {
 return (
	 <Link href={resolvePageHref(page)} className='group'>
		 <NavigationTitle title={title} className={``} />
	</Link>
 )
}

type PopoverParams = {
	title?: string,
	items: Array<{
		title?: string,
		page: ArchivePayload | PagePayload
	}>,
}

const PopoverNavigation = ({ title, items }: PopoverParams) => {

	return (
	<Popover className="group relative z-10">
		<PopoverButton className={`flex flex-row`} >
			<NavigationTitle title={title} chevron={true}
				className='' />
		</PopoverButton>
		<PopoverPanel>
			{({ close }) => {
				const navLinks = items.flatMap((item) => {
					const linkTitle = title ?? item.title ?? item.page.title
					return (
						<Link href={resolvePageHref(item.page)} key={item.page._id} className='relative z-10 px-4 py-2' onClick={() => { close() }}>
							{ linkTitle }
						</Link>
					)
				})
				return (
					<div className="absolute flex flex-col z-50 w-full gap-1 py-4 h-fit mt-1">
						{ navLinks }
					</div>
				)
			}}
		</PopoverPanel>
	</Popover>
	)
}