import { StructureBuilder, ListItem, ListItemBuilder, Divider, DefaultDocumentNodeResolver, StructureResolverContext } from "sanity/structure";
import { DocumentActionComponent, DocumentActionsContext, Template } from "sanity";

import { types } from "@/sanity/schema";
import ARTICLES from "@/sanity/schemas/articles";
import { camelCaseToWords, pluralize } from "@/lib/stringFunctions";
import { ReferenceList } from "@/components/studio/ReferenceList";

import { DocumentTextIcon, ArchiveBoxIcon, Cog6ToothIcon, TagIcon } from "@heroicons/react/24/solid";
import { ComponentType } from "react";

// abstraction required for sanity typescript check
const _DocumentTextIcon = () => <DocumentTextIcon />;
const _ArchiveBoxIcon = () => <ArchiveBoxIcon />;
const _Cog6ToothIcon = () => <Cog6ToothIcon />;
const _TagIcon = () => <TagIcon />;


// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["siteSettings", "navigation", "theme", "about", "archive"])

const archivePages = (S: StructureBuilder) => ARTICLES.flatMap(article => {
	const archiveName = `${pluralize(camelCaseToWords(article.type))} Archive`

	return S.listItem().title(archiveName).child(
		(S.document().title(archiveName).schemaType('archive').documentId(`${article.document.name}`))
	).icon(_ArchiveBoxIcon)
}).filter((item)=>{ return item !== undefined})

const typesList = (S: StructureBuilder) => ARTICLES.flatMap(article => {
	const Title = camelCaseToWords(article.type)

	let listItems: (ListItemBuilder | ListItem | Divider )[] = [
		S.documentTypeListItem(article.taxonomy.name).title(`${Title} Taxonomies`).icon(_TagIcon),
		S.divider(),
		S.documentTypeListItem(article.document.name).title(pluralize(Title)).icon(article.document.icon as ComponentType)
	]

	return S.listItem().title(pluralize(Title)).icon(article.document.icon as ComponentType).child(
		S.list().title(pluralize(Title)).items(listItems),
	)
})

export const structure = (S: StructureBuilder, context: StructureResolverContext) =>
	S.list().title('Content').items([
		/** ABOUT */
		S.listItem().title('Site Settings').icon(_Cog6ToothIcon).child(
			S.document().title('Site Settings').schemaType('siteSettings').documentId('siteSettings')
		),
		S.listItem().title('Archives').icon(_ArchiveBoxIcon).child(
			S.list().title('Archives').items([
				...archivePages(S)
			])
		),
		S.documentTypeListItem('page').title('Pages'),


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