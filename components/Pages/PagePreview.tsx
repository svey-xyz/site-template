// 'use client'

// import { Page } from './Page'
// import { PagePayload } from '@/types'
// import { useQuery } from '@sanity/lib/useQuery'
// import { pageQuery } from '@/sanity/lib/queries'

// type Props = {
// 	params: { slug: string }
// 	initial: any,
// }

// export const PagePreview = (props: Props) => {
// 	const { params, initial } = props
// 	// Using the `useQuery` hook to fetch the most current data based on the page slug
// 	const { data } = useQuery<PagePayload | null>(pageQuery, params, {
// 		initial,
// 	})

// 	return <Page data={data!} />
// }

// export default PagePreview