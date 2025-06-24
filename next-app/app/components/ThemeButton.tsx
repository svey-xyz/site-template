"use client";

import React, { useEffect, useRef, useState } from "react";
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { Button } from '@headlessui/react';
import { themes } from "@components.next-app/ThemeHandler";
import { useTheme } from "next-themes";
import { StudioThemeColorSchemeKey, useColorSchemeSetValue, useColorSchemeValue } from "sanity";

export const ThemeButton = ({className}:{className?:string}) => {

	const [mounted, setMounted] = useState(false)
	const refThemeButton = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		setMounted(true)
	}, [])

	const { theme, setTheme } = useTheme()
	let setSanityTheme: false | ((nextScheme: StudioThemeColorSchemeKey) => void)

	try {
		setSanityTheme = useColorSchemeSetValue()
	} catch(e) {
		// console.log('Not in studio environment')
	}

	const changeTheme = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const curThemeIndex = themes.findIndex((t) => theme == t)
		const nextTheme = (curThemeIndex + 1) < (themes.length) ? themes[curThemeIndex + 1] : themes[0]
		setTheme(nextTheme)

		if (setSanityTheme)
			setSanityTheme(theme == 'light' ? 'dark' : 'light')

	})

	if (!mounted) return <MoonIcon className="z-10 block relative h-icon w-icon hover-button" />

	return (
		<Button id='themeSwitcher' aria-label="Theme Switcher" ref={refThemeButton} className={className}
			onClick={(e) => { if (mounted) changeTheme(e) }} >
			<SunIcon className="hidden dark:block z-10 h-icon w-icon hover-button" />
			<MoonIcon className="block dark:hidden z-10 h-icon w-icon hover-button" />
		</Button>
	)
}

export default ThemeButton;