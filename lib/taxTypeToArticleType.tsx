import { taxonomy } from "@/types";

export const taxTypeToArticleType = (tax: taxonomy): string => {
	const typeParts = tax._type.split('Taxonomy')
	return typeParts[0]
}

// const taxonomyTitle = (article: string) => {
// 	return `${article}Taxonomy`
// }