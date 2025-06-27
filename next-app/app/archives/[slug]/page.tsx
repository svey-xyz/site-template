import type { Metadata, ResolvingMetadata } from 'next'
import Pages from '@components.next-app/Pages'
import { loadSingle_Archive } from '@sanity.next-app/loader/loader';

// export const generateStaticParams = async () => {
// 	try {
// 		const archives = await loadBundle_Archives();
// 		if (!archives) return []

// 		return archives.map((archive) => ({
// 			slug: [archive._id],
// 		}));
// 	} catch (error) {
// 		console.error("Error fetching archives:", error);
// 		throw new Error("Failed to fetch archives");
// 	}
// }

type Props = {
	params: Promise<{ slug: string }>
}

export const generateMetadata = async (props: Props, parent: ResolvingMetadata): Promise<Metadata> => {
    const params = await props.params;
    const archive = await loadSingle_Archive(params.slug)

    return {
		title: archive?.title,
		// description: page?.overview
		// 	? toPlainText(page.overview)
		// 	: (await parent).description,
	}
}

const Page = async (props: Props) => {
    const params = await props.params;
    return <Pages.ArchiveRoute params={params} />
}

export default Page