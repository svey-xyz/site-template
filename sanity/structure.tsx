import { StructureBuilder, StructureResolverContext } from "sanity/structure";
import { DocumentActionComponent, DocumentActionsContext, Template } from "sanity";

import { types } from "@/sanity/schema";
import ARTICLES from "@/sanity/schemas/articles";
import { camelCaseToWords, pluralize } from "@/lib/stringFunctions";

import { Cog6ToothIcon, TagIcon } from "@heroicons/react/24/solid";
import { ComponentType } from "react";

// abstraction required for sanity typescript check
const _Cog6ToothIcon = () => <Cog6ToothIcon />;
const _TagIcon = () => <TagIcon />;


// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["settings"])

const typesList = (S: StructureBuilder) => ARTICLES.flatMap(article => {
	const Title = camelCaseToWords(article.type)

	return S.documentTypeListItem(article.document.name).title(pluralize(Title)).icon(article.document.icon as ComponentType)
})

export const structure = (S: StructureBuilder, context: StructureResolverContext) =>
	S.list().title('Content').items([
		/** ABOUT */
		S.listItem().title('Site Settings').icon(_Cog6ToothIcon).child(
			S.document().title('Site Settings').schemaType('settings').documentId('settings')
		),
		S.documentTypeListItem('taxonomy').title('Taxonomies').icon(_TagIcon),
		S.divider(),
		
		...typesList(S),
	])
	

export const schemaOptions = {
	types: types,
	// Filter out singleton types from the global “New document” menu options
	templates: (templates: Template<any, any>[]) => templates.filter(({ schemaType }: { schemaType: string }) => !singletonTypes.has(schemaType)),
}
export const documentOptions = {
	// For singleton types, filter out actions that are not explicitly included
	// in the `singletonActions` list defined above
	actions: (input: DocumentActionComponent[], context: DocumentActionsContext) =>
		singletonTypes.has(context.schemaType)
			? input.filter(({ action }) => action && singletonActions.has(action))
			: input,
}