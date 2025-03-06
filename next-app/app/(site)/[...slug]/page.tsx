import Pages from '@components.next-app/Pages'
import { generateStaticSlugs } from '@sanity.next-app/loader/generateStaticSlugs';

export async function generateStaticParams() {
	const staticSlugs = await generateStaticSlugs('page')
	return staticSlugs
}

type Props = {
	params: Promise<{ slug: Array<string> }>
}

const Page = async (props: Props) => {
  const params = await props.params;
	return <Pages.PageRoute params={params} />
}

export default Page