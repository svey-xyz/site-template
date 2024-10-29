import { MdxNodeType } from "@mdxeditor/editor"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"


export const MDXText = async ({ text }: { text?: string | MdxNodeType }) => {
	if (!text) return

	const mdxSource = await serialize(text)
	return (
		<div className="">
			<MDXRemote { ...mdxSource } />
		</div>
	)

}

export default MDXText