import { load_Settings } from '@/sanity/loader/loader';

const Page = async () => {
	const settings = await load_Settings()

	return (
		<div className="text-center">
			Not found!
		</div>
	)

}

export default Page