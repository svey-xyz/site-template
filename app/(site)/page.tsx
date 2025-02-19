import Pages from '@/components/Pages';
import { load_Settings } from '@/sanity/loader/loader';

const Page = async() => {
	const settings = await load_Settings()

	if (!settings || !settings.homepage?.pathname?.current) {
		return (
			<div className="text-center">
				No homepage set.
			</div>
		)
	}

	return <Pages.PageRoute params={{ slug: [settings.homepage.pathname?.current] }} />
}

export default Page