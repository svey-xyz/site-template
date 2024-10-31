import type { Metadata, ResolvingMetadata } from 'next'
import Pages from '@/components/Pages'
import { loadSingle_Page, loadBundle_Pages } from '@/sanity/loader/loader';
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs';

export async function generateMetadata(
	props: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const params = await props.params;
	const { data: page } = await loadSingle_Page(params.slug[0])

	return {
		title: page?.title,
		description: page?.description
			? page?.description
			: (await parent).description,
	}
}

export async function generateStaticParams() {
	const staticSlugs = await generateStaticSlugs('page')
	const params = (staticSlugs.map((slug) => {
		return [slug]
	}))
	return params
}

type Props = {
	params: Promise<{ slug: Array<string> }>
}

const Page = async (props: Props) => {
    const params = await props.params;
    return <Pages.PageRoute params={params} />
}

export default Page