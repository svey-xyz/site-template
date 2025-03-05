import { getActiveTheme } from "@/next-app/lib/getTheme";
import { generateThemeCSS } from "@/next-app/lib/themeBuilder";

export const ThemeStyle = async () => {
	const theme = await getActiveTheme()
	const CSS = theme ? generateThemeCSS(theme) : ''

	return {
		CSS
	}

}