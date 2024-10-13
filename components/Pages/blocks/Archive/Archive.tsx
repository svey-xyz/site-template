import React from 'react';
import { loadArticles } from '@/sanity/queries/loadQuery';
import { Filter } from '@/components/Pages/blocks/Archive/Filter';

export const Archive = async ({ data, className }: { data: block_Archive, className?:string }) => {
	if (!data) return

	const articles = await loadArticles<article>(data.archiveType, data.featuredTaxonomies)
	if (!articles) return []

	// const archiveTitle = `${pluralize(camelCaseToWords(data.archiveType))} Archive`

	return (
		<div className={`${className}`}>
			<Filter articles={articles} archive={data} />
		</div>
	);
};