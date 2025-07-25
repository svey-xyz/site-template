'use client'

import NavigationItem from '@components.next-app/NavigationItem';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Bars2Icon } from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation'

export const Navigation = ({ navGroups, className }: { navGroups: Array<any>, className?:string }) => {
	const navContainer = useRef<HTMLDivElement>(null)
	const [gapWidth, setGapWidth] = useState<number>(0); // default width, detect on server.
	const _BREAK_POINT = 50 // the value in pixels when nav should break to menu

	const pathname = usePathname() // Hook to get the current path

	const handleResize = () => {
		const element = navContainer.current
		const parent = element?.parentElement
		if (!element || !parent) return

		setGapWidth(parent.clientWidth - element.clientWidth)
	}

	useEffect(() => {
		handleResize()
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		}
	}, [handleResize, pathname]);

	const MenuPopover = ({ navItems, className }: { navItems: Array<any>, className?: string }) => {
		return (
			<Popover className="absolute right-0 top-0 h-full flex flex-col items-center justify-center">
				<PopoverButton>
					<Bars2Icon className='w-icon h-icon' />
				</PopoverButton>
				<PopoverPanel modal={true} focus={true} className="fixed inset-0" >
					<div className='relative flex flex-col main-padding gap-4'>
						{navGroups.flatMap((item) => {
							return <NavigationItem key={item.title} group={item} />
						})}
					</div>
				</PopoverPanel>
			</Popover>
		)
	}

	return (
		<div className={`max-w-full w-full overflow-x-hiden overflow-y-visible ${className}`} autoFocus>
			<div
				className={`relative flex flex-row min-h-full items-center w-fit max-w-full ml-auto ${(gapWidth > _BREAK_POINT) ? 'visible' : 'invisible'}`}
				ref={navContainer}
			>
				{navGroups.flatMap((group) => {
					return <NavigationItem key={group.title} group={group} />
				})}
			</div>

			{(gapWidth <= _BREAK_POINT) &&
				<MenuPopover navItems={navGroups} />
			}
		</div>
	);
};



// export default Navigation;