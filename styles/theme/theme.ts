import { getActiveTheme } from "@/lib/getTheme";
import { generateThemeCSS } from "@/lib/themeBuilder";

export const ThemeStyle = async () => {
	const theme = await getActiveTheme()
	const CSS = theme ? generateThemeCSS(theme) : ''

	return {
		CSS
	}

}