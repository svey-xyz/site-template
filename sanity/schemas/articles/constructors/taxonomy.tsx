import { camelCaseToWords } from "@lib/stringFunctions";
import { defineField, defineType } from "sanity";
import React from "react";
import { Icon } from '@iconify/react';
import { FaTag } from "react-icons/fa6";

export const taxonomyTitle = (article: string) => {
	return `${article}Taxonomy`
}


const skosPrimerURL: string = "https://www.w3.org/TR/2009/NOTE-skos-primer-20090818"
function skosSectionLink(sec: string, text: string) {
	const url = `${skosPrimerURL}/#${sec}`
	return <a href={url} target="_blank">{text}</a>
}

const taxonomicTermDescription =
	<span>Terms aim to apply to {skosSectionLink('', 'SKOS guidelines')} but are adapted to fit the requirements of this site.</span>

export const taxonomy = (article: string) => {
	const TaxonomyTitle = taxonomyTitle(article)

	return defineType({
		title: camelCaseToWords(TaxonomyTitle),
		name: TaxonomyTitle,
		type: 'document',
		icon: FaTag,
		description: taxonomicTermDescription,
		fieldsets: [
			{
				name: 'unique',
				title: 'Unique',
				description: 'Fields unique to this group of taxonomies.',
			},
			{
				name: 'options',
				title: 'Options',
			},
			{
				name: 'relational',
				title: 'Relational',
				description: 'These fields could have future use',
			},
		],
		fields: [
			defineField({
				name: 'descriptiveNote',
				title: 'Note',
				type: 'note',
				description: taxonomicTermDescription,
			}),
			defineField({
				name: 'icon',
				title: 'Icon',
				type: 'icon',
			}),	

			/** OPTIONS */

			defineField({
				name: 'prefLabel',
				title: 'Title',
				type: 'string',
				description: skosSectionLink('seclabel', 'Preferred Lexical Label.'),
				fieldset: 'options',
				validation: (Rule) => Rule.required(),
			}),
			defineField({
				name: 'definition',
				title: 'Description',
				type: 'string',
				fieldset: 'options',
				description: skosSectionLink('secdocumentation', 'The description supplies a complete explanation of the term.')
			}),

			/** OPTIONS */

			defineField({
				name: 'related',
				title: 'Related Terms',
				type: 'reference',
				to: [{ type: TaxonomyTitle }],
				fieldset: 'relational',
				description: skosSectionLink('secassociative', 'Related terms that are not broader or narrower.'),
			}),
			defineField({
				name: 'broader',
				title: 'Broader Terms',
				type: 'reference',
				to: [{ type: TaxonomyTitle }],
				fieldset: 'relational',
				description: skosSectionLink('sechierarchy', 'More general terms.'),
			}),
			defineField({
				name: 'narrower',
				title: 'Narrower Terms',
				type: 'reference',
				to: [{ type: TaxonomyTitle }],
				fieldset: 'relational',
				description: skosSectionLink('sechierarchy', 'More specific terms.'),
			}),
		],
		preview: {
			select: {
				prefLabel: 'prefLabel',
				description: 'definition',
				icon: 'icon',
			},
			prepare(value: any) {
				return {
					title: value.prefLabel,
					description: value.description,
					media: value.icon ? <Icon icon={value.icon.name as string} /> : FaTag,
				}
			}
		},
	})
}