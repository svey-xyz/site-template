const StudioHeader = (props: any) => {
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
			<>{props.renderDefault(props)}</>
		</div>
	)
}

export default StudioHeader
