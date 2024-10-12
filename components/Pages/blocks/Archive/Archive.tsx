import { article, block_Archive, taxonomy } from '@/types';
import React from 'react';
import { loadArticles } from '@/sanity/queries/loadQuery';
import { camelCaseToWords, pluralize } from '@/lib/stringFunctions';
import { Filter } from '@/components/Pages/blocks/Archive/Filter';
import { taxonomyTitle } from '@/sanity/schemas/articles/constructors/taxonomy';

export const Archive = async ({ data, className }: { data: block_Archive, className?:string }) => {
	if (!data) return

	const initialPayload = await loadArticles<article>(data.archiveType, data.featuredTaxonomies)
	if (!initialPayload) return []
	
	const archiveItems = initialPayload.data

	// const archiveTitle = `${pluralize(camelCaseToWords(data.archiveType))} Archive`

	return (
		<div className={`${className}`}>
			<Filter articles={archiveItems} archive={data} />
		</div>
	);
};