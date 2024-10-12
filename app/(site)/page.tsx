import { loadSettings } from '@/sanity/queries/loadQuery';
import Pages from '@/components/Pages';

const Page = async() => {
	const initial = await loadSettings()

	if (!initial || !initial.data.homepage) {
		return (
			<div className="text-center">
				You don&rsquo;t have a homepage yet
			</div>
		)
	}

	

	return <Pages.PageRoute params={{ slug: [initial.data.homepage.slug] }} />
}

export default Page