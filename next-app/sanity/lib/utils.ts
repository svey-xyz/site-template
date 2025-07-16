import { AllSanitySchemaTypes, internalGroqTypeReferenceTo, Link } from "@next-app/sanity.types";
import { config as RootConfig } from "@sanity.next-app/lib/api";
import { createDataAttribute, CreateDataAttributeProps, PortableTextBlock } from "next-sanity";

type DataAttributeConfig = CreateDataAttributeProps &
	Required<Pick<CreateDataAttributeProps, "id" | "type" | "path">>;

export const dataAttr = (config: DataAttributeConfig) => {
	return createDataAttribute({
		projectId: RootConfig.projectId,
		dataset: RootConfig.dataset,
		baseUrl: RootConfig.baseUrl
	}).combine(config);
}


export const linkResolver = (link: Link | undefined) =>{
	if (!link) return null;

	switch (link.type) {
		case "internal":
			if (link?.page && typeof link.page === "string") {
				return `/${link.page}`;
			}
		case "external":
			return link?.link
		// case "post":
		// 	if (link?.post && typeof link.post === "string") {
		// 		return `/posts/${link.post}`;
		// 	}
		default:
			return null;
	}
}

const defaults = { nonTextBehavior: 'remove' }
export const blocksToText = (blocks: Partial<PortableTextBlock>[], opts = {}) => {
	const options = Object.assign({}, defaults, opts)
	return blocks
		.map(block => {
			if (block._type !== 'block' || !block.children) {
				return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
			}

			return block.children.map(child => child.text).join('')
		})
		.join('\n\n')
}


// Helper function to resolve references in Sanity documents from generated types
export function resolveReference<T>(obj: {
	_type: 'reference'
	[internalGroqTypeReferenceTo]?: T
}) {
	if (obj._type === 'reference')
		throw new Error('Asset reference has not been expanded!')
	return obj as unknown as Extract<AllSanitySchemaTypes, { _type: T }>
}

// Helper type to add keys to objects
export type WithKey<T> = T & { _key: string }