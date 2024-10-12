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

export const partial_Artist: string = groq`
	...,
	"slug":slug.current,
	tags[]->,
	image {
		${partial_ImageObject}
	}
`

export const project = groq`
	gallery[] {
		${partial_ImageObject}
	},
	artists[]->{
		${partial_Artist}
	},
	sponsors[]->{
		...,
		image {
			${partial_ImageObject}
		}
	}
`

export const business = groq`
	logo {
		${partial_ImageObject}
	},
	addresses[]->
`

export const partial_Person: string = groq`
	...,
	businesses[]-> {
		...,
		${partial_Article},
		${business}
	}
`

export const news = groq`
	authors[]->{
		${partial_Person}
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
	},
	_type == "People" => {
		...,
		people[]-> {
			${partial_Person}
		}
	},
	_type == "Map" => {
		...,
		featured_Businesses[]-> {
			...,
			${partial_Article},
			${business}
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