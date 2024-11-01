'use client'

import rehypeStarryNight from 'rehype-starry-night'
import remarkGfm from 'remark-gfm'
import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import { useEffect, useState } from 'react'

export const MDXPreview = ({ text }: { text: string }) => {
	const [MDXModule, setMDXModule] = useState<any | null>(null)

	useEffect(() => {
		const setContent = async () => {
			const code = String(
				await compile(text, {
					outputFormat: 'function-body',
					rehypePlugins: [rehypeStarryNight],
					remarkPlugins: [remarkGfm]
				})
			)

			const obj = await run(code, {
				...runtime,
				baseUrl: import.meta.url,
			})

			setMDXModule(obj)
		}
		setContent()
	}, [MDXModule, setMDXModule]);

	if (!MDXModule) return <></>

	return (
		<MDXModule.default />
	)

}

export default MDXPreview