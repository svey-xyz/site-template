"use client";

import React, { useEffect, useRef, useState } from "react";
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { Button } from '@headlessui/react';
import { StudioThemeColorSchemeKey, useColorSchemeSetValue, useColorSchemeValue } from "sanity";
import { useTheme } from '@sanity/ui'

export const ThemeButton = ({ className }: { className?: string }) => {

	const refThemeButton = useRef<HTMLButtonElement>(null)
	const [mounted, setMounted] = useState(false)
	const theme = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	let setSanityTheme: false | ((nextScheme: StudioThemeColorSchemeKey) => void)

	try {
		setSanityTheme = useColorSchemeSetValue()
	} catch (e) {
		// console.log('Not in studio environment')
	}

	const sanityTheme = useColorSchemeValue()

	const changeTheme = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

		if (setSanityTheme)
			setSanityTheme(sanityTheme == `dark` ? 'light' : 'dark')

	})

	const iconColour = theme.sanity.v2?.color.icon

	return (
		<Button aria-label="Theme Switcher" ref={refThemeButton} className={`${className}`}
			onClick={(e) => { if (mounted) changeTheme(e) }} >
			<SunIcon
				className={`
					block ${sanityTheme == 'light' && 'hidden'} z-10 h-icon w-icon hover-button
				`}
				style={{
					fill: iconColour
				}}
			/>
			<MoonIcon
				className={`
					block ${sanityTheme == 'dark' && 'hidden'} z-10 h-icon w-icon hover-button
				`}
				style={{
					fill: iconColour
				}}
			/>
		</Button>
	)
}

export default ThemeButton;