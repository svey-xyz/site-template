import PageLoader from '@/app/(site)/[...slug]/loading';
import Pages from '@/components/Pages'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs';

export async function generateStaticParams() {
	const staticSlugs = await generateStaticSlugs('page')
	return staticSlugs
}

type Props = {
	params: Promise<{ slug: Array<string> }>
}

const Page = async (props: Props) => {
  const params = await props.params;
	// return <Pages.PageRoute params={params} />
	return <PageLoader />
}

export default Page