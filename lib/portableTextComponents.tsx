// `components` object you'll pass to PortableText w/ optional TS definition
import { PortableTextComponents } from '@portabletext/react'

export const portableTextComponents: PortableTextComponents = {
	marks: {
		// Ex. 1: custom renderer for the em / italics decorator
		em: ({ children }) => <em className="font-semibold"> {children} </em>,

		// Ex. 2: rendering a custom `link` annotation
		link: ({ value, children }) => {
			const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
			return (
				<a href={value?.href} aria-label={`Link to ${children}`} target={target} rel={target === '_blank' ? 'noindex nofollow' : ''}>
					{children}
				</a>
			)
		},
	},
}