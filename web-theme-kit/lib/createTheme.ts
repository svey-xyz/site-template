import type { _preGeneratedTheme, WEB_THEME_KIT } from "@types.web-theme-kit/theme";
import { generateThemeCSS } from "./generateThemeCSS";

export const createTheme = (theme: _preGeneratedTheme): WEB_THEME_KIT.theme => {
	return {
		...theme,
		CSS: generateThemeCSS(theme),
	}
}