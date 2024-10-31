import rehypeStarryNight from 'rehype-starry-night'
import remarkGfm from 'remark-gfm'
import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

export const MDX = async ({ text }: { text: string }) => {

	const code = String(
		await compile(text, {
			outputFormat: 'function-body',
			rehypePlugins: [rehypeStarryNight],
			remarkPlugins: [remarkGfm]
		})
	)

	const { default: MDXContent } = await run(code, {
		...runtime,
		baseUrl: import.meta.url,
	})

	return <MDXContent />
}

export default MDX