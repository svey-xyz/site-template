const ACTIVE_THEME =
	process.env.NEXT_PUBLIC_THEME || undefined

export const getActiveTheme = async (): Promise<THEME.theme | undefined> => {
	try {
		const theme = (await import(`@/theme/${ACTIVE_THEME}/`)).default as THEME.theme
		return theme
	} catch (e) {
		console.log(`Theme not found: `, ACTIVE_THEME)
		return undefined
	}
}