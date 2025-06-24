import { WEB_THEME_KIT } from "web-theme-kit";

export const Head = async({ theme }:{ theme?: WEB_THEME_KIT.theme }) => {
	return (
		<head>
			{/* <title>{settings.title}</title> */}
			{ theme &&
				<style rel="stylesheet">{theme?.CSS}</style>
			}

			<meta content="width=device-width, initial-scale=1"
				name="viewport" />
			<link rel="icon" href="./favicon.ico" />
		</head>
	)
}

export default Head