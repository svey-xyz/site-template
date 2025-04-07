import MDXPreview from './Preview'
import MDX from './MDX'
import React from 'react'

export const MDXText = ({ text, draft }: { text: string, draft?: boolean }) => {
	// if (draft) return <MDXPreview text={text} />
	// return <MDX text={text} />
	return <MDXPreview text={text} />
}

export default MDXText


