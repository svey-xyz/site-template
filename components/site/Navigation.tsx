'use client'

import NavigationItem from '@/components/ui/NavigationItem';
import { object_NavigationItem } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Bars2Icon } from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation'

export const Navigation = ({ navItems, className }: { navItems: Array<object_NavigationItem>, className?:string }) => {
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

	const MenuPopover = ({ navItems, className }: { navItems: Array<object_NavigationItem>, className?: string }) => {
		return (
			<Popover className="absolute right-0 top-0 h-full flex flex-col items-center justify-center">
				<PopoverButton>
					<Button className='relative z-10'>
						<Bars2Icon className='w-icon h-icon text-accent-secondary stroke-1 stroke-accent-secondary' />
					</Button>
				</PopoverButton>
				<PopoverPanel modal={true} focus={true} className="fixed inset-0 bg-bg/80 backdrop-blur-xl pt-[--total-header-height]" >
					<div className='relative flex flex-col main-padding gap-4'>
						{navItems.flatMap((item) => {
							return <NavigationItem key={item.title} item={item} />
						})}
					</div>
				</PopoverPanel>
			</Popover>
		)
	}

	return (
		<div className={`relative max-w-full w-full overflow-x-hiden overflow-y-visible ${className}`} autoFocus>
			<div
				className={`relative flex flex-row min-h-full items-center w-fit max-w-full ml-auto ${(gapWidth > _BREAK_POINT) ? 'visible' : 'invisible'}`}
				ref={navContainer}
			>
				{ navItems.flatMap((item) => {
					return <NavigationItem key={item.title} item={item} />
				})}
			</div>

			{(gapWidth <= _BREAK_POINT) &&
				<MenuPopover navItems={navItems} />
			}
		</div>
	);
};



// export default Navigation;