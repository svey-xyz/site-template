import { partial_ImageObject, partial_Sections } from "@sanity.next-app/queries/partials";
import { groq } from "next-sanity";

export const settingsQuery: string = groq`
	*[_id == "siteSettings"][0] {
		...,
		logo {
			${partial_ImageObject}
		},
		homepage->{
			pathname
		},
		navigation[]{
			// ...,
			title,
			pages[]->{
				...,
				"slug":slug.current,
				${partial_Sections}
			}
		}
	}
`

export const pageQuery: string = groq`
	*[_type=='page' && pathname.current match $pathname][0] {
  	...,
		${partial_Sections}
	}
`

export const staticPagesQuery: string = groq`
	*[_type == 'page'] {
		...,
		"slug":slug.current,
		${partial_Sections}
	}
`

export const staticArchivesQuery: string = groq`
	*[_type == 'archive'] {
		...,
		${partial_Sections}
	}
`

export const documentQuery: string = groq`
	*[_id == $id][0] {
  	...,
		"slug":slug.current,
	}
`

export const archiveQuery: string = groq`
	*[_type=='archive' && _id == $archiveID][0] {
  	...,
		${partial_Sections}
	}
`

