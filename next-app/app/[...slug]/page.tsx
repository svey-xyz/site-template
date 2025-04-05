import Pages from '@components.next-app/Pages'
import { sanityFetch } from '@sanity.next-app/lib/live';
import { pagesSlugs } from '@sanity.next-app/queries/queries';

export async function generateStaticParams() {
	const { data } = await sanityFetch({
		query: pagesSlugs,
		// Use the published perspective in generateStaticParams
		perspective: "published",
		stega: false,
	}) as {
		data: Array<{ slug: string }>
	};

	const slugs = data.flatMap((page) => {
		return { slug: page.slug.split('/') }
	})
	return slugs;
}


type Props = {
	params: Promise<{ slug: Array<string> }>
}

const Page = async (props: Props) => {
  const params = await props.params;
	return <Pages.PageRoute params={params} />
}

export default Page