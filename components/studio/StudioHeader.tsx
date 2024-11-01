import {ThemeButton} from "./ThemeButton"
import { Box, useTheme } from '@sanity/ui'

const StudioHeader = (props: any) => {
	const theme = useTheme()
	return (
		<div className="flex flex-row w-screen">
			<div className="w-full">
				{props.renderDefault(props)}
			</div>

			<Box className='h-full' style={{ borderBottom: `1px solid ${theme.sanity.v2?.color.border}` }}>
				<ThemeButton className='pr-4 h-full items-center justify-center' />
			</Box>

		</div>
	)
}

export default StudioHeader
