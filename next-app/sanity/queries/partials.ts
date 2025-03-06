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

const partial_Blocks: string = groq`
	...,
	_type == "Archive" => {
		...,
		featuredTaxonomies[]-> {
			...,
		} 
	},
	_type == "FeaturedTaxonomies" => {
		...,
		taxonomies[]->,
	},
	_type == "FeaturedArticles" => {
		...,
		articles[]-> {
			...,
			image {
				${partial_ImageObject}
			}
		},
	},
	_type == "Image" => {
		...,
		image {
			${partial_ImageObject}
		}
	},
	_type == "Gallery" => {
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