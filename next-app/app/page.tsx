import { sanityFetch } from '@sanity.next-app/lib/live';
import { settingsQuery } from '@sanity.next-app/queries/queries';
import PageRoute from '@next-app/app/[...slug]/page';
import { SettingsQueryResult } from '@next-app/sanity.types';

const Page = async() => {
	const { data: settings } = await sanityFetch({
		query: settingsQuery,
		stega: false,
	}) as {
		data: SettingsQueryResult
	}

	if (!settings || !settings.homepage?.slug) {
		return (
			<div className="text-center">
				No homepage set.
			</div>
		)
	}

	return <PageRoute params={new Promise((resolve,reject) => { resolve({ slug: [settings.homepage?.slug.current || '']}) })} />
}

export default Page