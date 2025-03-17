import { partial_ImageObject, partial_Sections } from "@sanity.next-app/queries/partials";
import { defineQuery, groq } from "next-sanity";

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
		${partial_Sections}
  }
`);


export const settingsQuery: string = groq`
	*[_id == "siteSettings"][0] {
		...,
		logo {
			${partial_ImageObject}
		},
		homepage->{
			slug
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
	*[_type=='page' && slug.current match $slug][0] {
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

