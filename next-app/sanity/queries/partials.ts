import { groq } from "next-sanity"

export const partial_ImageObject: string = groq`
	...,
	"imageAsset":asset->
`

export const partial_Article: string = groq`
	...,
	title,
	"slug":slug.current,
	description,
	taxonomies[]->,
	image {
		${partial_ImageObject}
	}
`

export const partial_Blocks: string = groq`
	...,
	_type == "archive_block" => {
		...,
		featuredTaxonomies[]-> {
			...,
		} 
	},
	_type == "featuredTaxonomies_block" => {
		...,
		taxonomies[]->,
	},
	_type == "featuredArticles_block" => {
		...,
		articles[]-> {
			...,
			image {
				${partial_ImageObject}
			}
		},
	},
	_type == "image_block" => {
		...,
		image {
			${partial_ImageObject}
		}
	},
	_type == "gallery_block" => {
		...,
		images[] {
			${partial_ImageObject}
		}
	}
`

export const partial_Sections: string = groq`
	sections[] {
		...,
		blocks[] {
			${partial_Blocks},
		}
	}
`