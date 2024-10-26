import ThemeButton from "@/components/ui/ThemeButton"
import { useTheme } from '@sanity/ui'

const StudioHeader = (props: any) => {
	const theme = useTheme()
	console.log('Dark Theme: ', theme.sanity.v2?.color._dark)
	
	return (
		<div>
			{/* <div className="flex items-center justify-between p-5">
				<Link href="/" target="_blank" className="text-oam-accent flex items-center">
					<CgWebsite className="h-6 w-6 text-oam-accent mr-2" />
					Main Site
				</Link>
				<Link href="/api/preview" target="_blank" className="text-oam-accent flex items-center">
					Preview
					<MdPreview className="h-6 w-6 text-oam-accent ml-2" />
				</Link>
			</div> */}
			<ThemeButton />

			<>{props.renderDefault(props)}</>

		</div>
	)
}

export default StudioHeader
