import { getActiveTheme } from "@lib.next-app/getTheme";
import { generateThemeCSS } from "@lib.next-app/themeBuilder";

export const Head = async() => {
	const theme = await getActiveTheme()
	const themeCSS = theme ? generateThemeCSS(theme) : ''

	return (
		<head>
			{/* <title>{settings.title}</title> */}
			<style rel="stylesheet">{themeCSS}</style>
			<meta content="width=device-width, initial-scale=1"
				name="viewport" />
			<link rel="icon" href="./favicon.ico" />
		</head>
	)
}

export default Head