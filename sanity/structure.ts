import { MdSettings } from "react-icons/md";
import { StructureBuilder, ListItem, ListItemBuilder, Divider, DefaultDocumentNodeResolver, StructureResolverContext } from "sanity/structure";
import { DocumentActionComponent, DocumentActionsContext, Template } from "sanity";
import { AiFillInfoCircle } from "react-icons/ai";

import { types } from "@/sanity/schema";
import { RiGalleryView, RiPagesLine } from "react-icons/ri";
import ARTICLES from "@/sanity/schemas/articles";
import { camelCaseToWords, pluralize } from "@/lib/stringFunctions";
import { FaTag } from "react-icons/fa6";
import { ReferenceList } from "@/components/studio/ReferenceList";
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { TbChairDirector } from "react-icons/tb";
import { SiGithubsponsors } from "react-icons/si";
import { BsPeopleFill } from "react-icons/bs";

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, options) => {

	return S.document().views([
		S.view.form(),
		S.view.component(ReferenceList).title('Referenced In'), // Custom view
	]);
};

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["siteSettings", "navigation", "theme", "about", "archive"])

const archivePages = (S: StructureBuilder) => ARTICLES.flatMap(article => {
	const archiveName = `${pluralize(camelCaseToWords(article.type))} Archive`

	return S.listItem().title(archiveName).icon(RiPagesLine).child(
		(S.document().title(archiveName).schemaType('archive').documentId(`${article.document.name}`))
	)
}).filter((item)=>{ return item !== undefined})

const typesList = (S: StructureBuilder) => ARTICLES.flatMap(article => {
	const Title = camelCaseToWords(article.type)

	let listItems: (ListItemBuilder | ListItem | Divider )[] = [
		S.documentTypeListItem(article.taxonomy.name).title(`${Title} Taxonomies`).icon(FaTag),
		S.divider(),
		S.documentTypeListItem(article.document.name).title(pluralize(Title))
	]

	return S.listItem().title(pluralize(Title)).icon(article.document.icon as any).child(
		S.list().title(pluralize(Title)).items(listItems),
	)
})

export const structure = (S: StructureBuilder, context: StructureResolverContext) =>
	S.list().title('Content').items([
		/** ABOUT */
		S.listItem().title('About').icon(AiFillInfoCircle).child(
			S.list().title('About').items([
				S.listItem().title('Site Settings').icon(MdSettings).child(
					S.document().title('Site Settings').schemaType('siteSettings').documentId('siteSettings')
				),

				S.divider(),

				// S.documentTypeListItem('sponsor').title('Sponsors'),
				S.documentTypeListItem('person').title('People').icon(BsPeopleFill),
				orderableDocumentListDeskItem({
					type: 'sponsor',
					title: 'Sponsors',
					icon: SiGithubsponsors,
					menuItems: [], // allow an array of `S.menuItem()` to be injected to orderable document list menu
					// pass from the structure callback params above
					S,
					context,
				}),
			]),
		),
		S.listItem().title('Pages').icon(RiPagesLine).child(
			S.list().title('Pages').items([
				S.listItem().title('Archives').icon(RiGalleryView).child(
					S.list().title('Archives').items([
						...archivePages(S)
					])
				),

				S.divider(),

				S.documentTypeListItem('page').title('Pages').icon(RiPagesLine),

			]),
		),

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