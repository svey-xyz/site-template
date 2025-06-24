import React from 'react';
import { Filter } from '@components.next-app/Pages/blocks/Archive/Filter';
// import { loadBundle_Articles } from '@/sanity/queries/loader';

export const Archive = ({ data, className }: { data: any, className?:string }) => {
	if (!data) return

	// const articles = await loadBundle_Articles<article>(data.archiveType, data.featuredTaxonomies)
	// if (!articles) return []

	// const archiveTitle = `${pluralize(camelCaseToWords(data.archiveType))} Archive`

	return (
		<div className={`${className}`}>
			{/* <Filter articles={articles} archive={data} /> */}
		</div>
	);
};