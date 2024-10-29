import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeStarryNight from 'rehype-starry-night'

const components = {
}

export const MDXText = async ({ text }: { text: string }) => {
	return (
		<div className="">
			<MDXRemote
				source={text}
				components={{ ...components }}
				options={{
					mdxOptions: {
						rehypePlugins: [rehypeStarryNight]
					}
				}}
			/>
		</div>
	)

}

export default MDXText