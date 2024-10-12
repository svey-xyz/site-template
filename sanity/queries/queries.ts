import { partial_ImageObject, partial_Sections } from "@/sanity/queries/partials";
import { groq } from "next-sanity";

export const settingsQuery: string = groq`
	*[_id == "siteSettings"][0] {
		...,
		logo {
			${partial_ImageObject}
		},
		homepage->{
			"slug":slug.current,
		},
		navigation[]{
			// ...,
			title,
			pages[]->{
				...,
				"slug":slug.current,
				${partial_Sections},
			},
		},
		address->,
	}
`

export const pageQuery: string = groq`
	*[_type=='page' && slug.current == $slug][0] {
  	...,
		"slug":slug.current,
		${partial_Sections},
	}
`

export const archiveQuery: string = groq`
	*[_type=='archive' && _id == $archiveID][0] {
  	...,
		${partial_Sections},
	}
`

