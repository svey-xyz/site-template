import React from 'react';
import { Filter } from '@components.next-app/Pages/blocks/Archive/Filter';
import { Archive_block } from '@next-app/sanity.types';
import { loadBundle_Articles } from '@sanity.next-app/loader/loader';
import { StringTransforms } from "shared-lib"

export const Archive = ({ data, className }: { data: Archive_block, className?:string }) => {
	if (!data) return

	// const articles = await loadBundle_Articles(data.archiveType, data.featuredTaxonomies)
	// if (!articles) return []

	// const archiveTitle = `${StringTransforms.pluralize(StringTransforms.camelCaseToWords(data.archiveType))} Archive`

	return (
		<div className={`${className}`}>
			{/* <Filter articles={articles} archive={data} /> */}
		</div>
	);
};