import { MdxNodeType } from "@mdxeditor/editor"
import ReactMarkdown from "react-markdown"

export const MDXText = async ({ text }: { text: string | MdxNodeType }) => {
	return (
		<div className="">
			<ReactMarkdown>{text}</ReactMarkdown>
		</div>
	)

}

export default MDXText