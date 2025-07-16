import { SectionBuilder } from '@components.next-app/Pages/builders/SectionBuilder';
import { PageQueryResult } from '@next-app/sanity.types';
import { sanityFetch } from '@sanity.next-app/lib/live';
import { blocksToText } from '@sanity.next-app/lib/utils';
import { pagesSlugs, pageQuery } from '@sanity.next-app/queries/queries';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
	const { data } = await sanityFetch({
		query: pagesSlugs,
		// Use the published perspective in generateStaticParams
		perspective: "published",
		stega: false,
	}) as {
		data: Array<{ slug: string }>
	};

	const slugs = data?.flatMap((page) => {
		return { slug: page.slug.split('/') }
	})
	return slugs;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = await props.params;
	const { data } = await sanityFetch({
		query: pageQuery,
		params,
		// Metadata should never contain stega
		stega: false,
	}) as {
		data: PageQueryResult;
	}

	return {
		title: data?.title,
		description: (data?.description) ? blocksToText(data.description) : 'No page description available',
	} satisfies Metadata;
}

type Props = {
	params: Promise<{ slug: Array<string> }>
}

const Page = async (props: Props) => {
  const params = await props.params;

	const [{ data: page }] = await Promise.all([
		sanityFetch({ query: pageQuery, params: { slug: params?.slug[0] } }),
	]);

	if (!page) notFound()

	return (
		<article className='relative flex flex-col flex-grow max-w-full'>
			<SectionBuilder page={page} />
		</article>
	)
}

export default Page