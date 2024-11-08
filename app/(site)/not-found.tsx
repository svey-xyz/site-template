import { load_Settings } from '@/sanity/loader/loader';

const Page =  () => {
	// const settings = await load_Settings()

	return (
		<div className="relative main-padding flex-grow min-h-full">
			<div className='flex flex-col justify-center items-center min-h-full'>
				<h2 className=''>
					Not found!
				</h2>
				<span>
					Sorry the page you're looking for couldn't be found.
				</span>

			</div>
		</div>
	)

}

export default Page