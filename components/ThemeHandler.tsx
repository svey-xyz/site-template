"use client";

import { ThemeProvider, useTheme } from 'next-themes'
import { usePathname } from 'next/navigation';
import React, { ReactNode, useEffect, useState, useRef } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

export const themes = ['light', 'dark'] as const

export default function ThemeHandler({
	children
}: {
	children: ReactNode
}) {
	const [mounted, setMounted] = useState(false)

	const topChevron = useRef<HTMLDivElement>(null)

	const pathname = usePathname();
	const homePage = pathname == "/"

	useEffect(() => {
		if (mounted) return;
		setMounted(true);
		setSize();

		(async () => {
			const listener = () => {
				if (window.scrollY > 140) {
					topChevron?.current?.classList.add('is-visible')
				} else {
					topChevron?.current?.classList.remove('is-visible')
				}
			};
			window.addEventListener("scroll", listener);
		})()

	}, [mounted])

	const chevronClick = ((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	})

	return (
		<ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark"
			themes={themes.map((theme) => theme)}>


			<div ref={topChevron} className='reveal-section fixed bottom-8 w-full z-50'>
				<div className='relative main-padding flex flex-col justify-end items-end'>
					<ChevronUpIcon className="absolute w-icon h-icon hover-button"
						onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => { if (mounted) chevronClick(e) }} />
				</div>
			</div>
			{children}
		</ThemeProvider>
	)
}

function setSize() {
	const isMobile = (/Mobi|Android/i.test(navigator.userAgent)) ? true : false;

	let height: number | undefined
	if (!isMobile) height = window.innerHeight;
	const vh = height ? height * 0.01 : 0;

	document.documentElement.style.setProperty('--vh', `${vh}px`);
}