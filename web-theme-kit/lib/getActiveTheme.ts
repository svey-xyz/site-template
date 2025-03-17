import type { WEB_THEME_KIT } from "../types/theme";
import fs from 'fs'
import path from 'path'

const ACTIVE_THEME =
	process.env.WEB_THEME_KIT || undefined

export const getActiveTheme = async (themePath: string): Promise<WEB_THEME_KIT.theme | undefined> => {
	if (!ACTIVE_THEME) return undefined

	try {
		const FULL_PATH = path.join(themePath, ACTIVE_THEME)
		// const theme = (await import(FULL_PATH)).default as WEB_THEME_KIT.theme
		// return theme
	} catch (e) {
		console.log(`Theme not found: `, ACTIVE_THEME)
		return undefined
	}
}