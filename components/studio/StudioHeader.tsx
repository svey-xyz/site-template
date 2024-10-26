import ThemeButton from "@/components/ui/ThemeButton"

const StudioHeader = (props: any) => {
	return (
		<div className="flex flex-row w-screen">
			<div className="w-full">
				{props.renderDefault(props)}
			</div>

			{/* bvlyul is sanity built in class for bottom border? this might change, this solution is kinda jank */}
			<ThemeButton className='px-4 bvlyul' />

		</div>
	)
}

export default StudioHeader
