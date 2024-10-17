"use client"; // Required to set the onClick.

import { useTheme } from 'next-themes'
import { themes } from '@components/ThemeHandler'
import React, { useEffect, useRef, useState } from "react";
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { Button } from '@headlessui/react';

export const ThemeButton = () => {

	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()
	const refThemeButton = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		setMounted(true)
	}, [])

	const changeTheme = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

		const curThemeIndex = themes.findIndex((t) => theme == t)
		const nextTheme = (curThemeIndex + 1) < (themes.length) ? themes[curThemeIndex + 1] : themes[0]
		setTheme(nextTheme)
	})

	if (!mounted || !theme) return <MoonIcon className="z-10 block relative h-icon w-icon hover-button" />

	return (
		<Button id='themeSwitcher' aria-label="Theme Switcher" ref={refThemeButton}
			onClick={(e) => { if (mounted) changeTheme(e) }} >
			<SunIcon className="hidden dark:block z-10 h-icon w-icon hover-button" />
			<MoonIcon className="block dark:hidden z-10 h-icon w-icon hover-button" />
		</Button>
	)
}

export default ThemeButton;