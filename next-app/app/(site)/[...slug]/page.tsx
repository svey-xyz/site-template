import Pages from '@components.next-app/Pages'
import { sanityFetch } from '@sanity.next-app/lib/live';
import { generateStaticSlugs } from '@sanity.next-app/loader/generateStaticSlugs';
import { pagesSlugs } from '@sanity.next-app/queries/queries';

export async function generateStaticParams() {
	const { data } = await sanityFetch({
		query: pagesSlugs,
		// // Use the published perspective in generateStaticParams
		perspective: "published",
		stega: false,
	});
	return data;
}


type Props = {
	params: Promise<{ slug: Array<string> }>
}

const Page = async (props: Props) => {
  const params = await props.params;

	console.log('Page props: ', props)
	return <Pages.PageRoute params={params} />
}

export default Page