import MDXPreview from './Preview'
import MDX from './MDX'

export const MDXText = ({ text, draft }: { text: string, draft?: boolean }) => {
	if (draft) return <MDXPreview text={text} />
	return <MDX text={text} />
}

export default MDXText