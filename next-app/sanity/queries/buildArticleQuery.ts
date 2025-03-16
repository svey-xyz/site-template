import { partial_Article } from "@sanity.next-app/queries/partials"
import { groq } from "next-sanity"

export const single_Article = (partial: string = '') => {
	return groq`
		*[_type == $type && slug.current == $slug][0] {
			${partial_Article},
			${partial}
		}
	`
}

export const bundle_Articles = (partial: string = '', taxonomies?: Array<any>) => {
	const taxonomyIDs = (taxonomies?.flatMap((tax) => {
		return `"${tax._id}"`
	}))

	const referenceString = taxonomyIDs ? `&& references(*[_id in [${taxonomyIDs}]]._id)` : ``

	return groq`
		*[_type == $type ${referenceString}] {
			${partial_Article},
			${partial}
		}
	`
}