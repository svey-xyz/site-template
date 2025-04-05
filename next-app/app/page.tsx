import Pages from '@components.next-app/Pages';
import { sanityFetch } from '@sanity.next-app/lib/live';
import { load_Settings } from '@sanity.next-app/loader/loader';
import { settingsQuery } from '@sanity.next-app/queries/queries';

const Page = async() => {
	// const settings = await load_Settings()

	const { data: settings } = await sanityFetch({
		query: settingsQuery,
		// Metadata should never contain stega
		stega: false,
	});
	// console.log('Settings: ', settings)

	if (!settings || !settings.homepage?.slug) {
		return (
			<div className="text-center">
				No homepage set.
			</div>
		)
	}

	return <Pages.PageRoute params={{ slug: [settings.homepage.slug.current] }} />
}

export default Page