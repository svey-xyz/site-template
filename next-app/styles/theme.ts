import { getActiveTheme, themeBuilder } from "web-theme-kit/lib";

export const ThemeStyle = async () => {
	const theme = await getActiveTheme(``)
	const CSS = theme ? themeBuilder(theme) : ''

	return {
		CSS
	}

}