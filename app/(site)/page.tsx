import { loadSettings } from '@/sanity/queries/loadQuery';
import Pages from '@/components/Pages';

const Page = async() => {
	const settings = await loadSettings()

	if (!settings || !settings.homepage) {
		return (
			<div className="text-center">
				No homepage set.
			</div>
		)
	}

	return <Pages.PageRoute params={{ slug: [settings.homepage.slug] }} />
}

export default Page