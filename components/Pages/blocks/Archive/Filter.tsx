'use client';

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { block_Archive, article, taxonomy } from "@/types";
import dynamic from 'next/dynamic'
import { capitalize } from "@/lib/stringFunctions";
import { useSearchParams } from 'next/navigation';

const alltaxonomy: taxonomy = {
	_type: 'taxonomicTerm',
	_updatedAt: Date.now().toLocaleString(),
	_createdAt: Date.now().toLocaleString(),
	_rev: '1.0',
	_id: 'alltaxonomy',
	prefLabel: 'All',
}

type args = {
	articles: Array<article>,
	archive: block_Archive,
}

interface CardMap {
	[key: string]: React.ComponentType<{
		article: article,
		filtered?: boolean,
	}>
}

const CardList: CardMap = {
	Standard: dynamic(() => import('@/components/Pages/blocks/Archive/cards/Generic')),
	business: dynamic(() => import('@/components/Pages/blocks/Archive/cards/Business')),

}

export const Filter = ({ articles, archive }: args) => {

	const searchParams = useSearchParams();
	const filter = searchParams.get('filter');

	const [filteredEncodedLabel, setFilteredEncodedLabel] = useState<string>(alltaxonomy.prefLabel)
	const alltaxonomyRef = useRef<HTMLInputElement>(null)

	const ArchiveCard = CardList[archive.archiveType] ?? CardList.Standard

	let taxonomies: Array<taxonomy> = []
	let taxonomyNames: Array<string> = []
	
	articles.forEach(article => {
		if (!article.taxonomies) article.taxonomies = []
		article.taxonomies?.unshift(alltaxonomy) // TODO all taxonomy gets added every re-render but is being filtered out by code below, it should only be added once
		article.taxonomies?.forEach((taxonomy: taxonomy) => {
			if (taxonomyNames.indexOf(taxonomy.prefLabel) == -1) {
				taxonomies.push(taxonomy)
				taxonomyNames.push(taxonomy.prefLabel)
			}
		});
	});

	useEffect(() => {
		if (!filter) alltaxonomyRef.current ? alltaxonomyRef.current.checked = true : null

		if (filter) {
			setFilteredEncodedLabel(encodeURIComponent(String(filter)));
		}

	}, [filter])

	const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFilteredEncodedLabel(event.target?.value);
	}

	return (
		<div className="relative flex flex-col">
				{((taxonomies?.length > 1 && archive.filterable) &&
					<fieldset className="flex flex-row gap-x-8 gap-y-2 mb-8 flex-wrap">
						{taxonomies.map((taxonomy) => {
							return (
								<div key={taxonomy._id} className="group relative flex cursor-pointer w-auto flex-col items-center justify-center">
									<input type="radio" name="taxonomies" value={encodeURIComponent(taxonomy.prefLabel)}
										className="peer absolute left-1/2 -translate-x-1/2 h-full w-full appearance-none
											cursor-pointer transition-all duration-200
											origin-center"
										checked={filteredEncodedLabel == encodeURIComponent(taxonomy.prefLabel)} onChange={handleFilterChange} ref={(() => { if (filteredEncodedLabel == encodeURIComponent(taxonomy.prefLabel)) return alltaxonomyRef})() } />
									<label className="text-accent-secondary/60
										group-hover:text-accent peer-checked:text-accent-secondary peer-checked:brightness-75">
										{taxonomy.prefLabel}
									</label>
								</div>
							)
						})}
					</fieldset>
				)}
			<div className="relative grid gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 pb-4">
				{((articles && ArchiveCard) &&
					articles.map((article) => {
						let taxonomyInFilter: boolean = false;
						article.taxonomies?.forEach((taxonomy: taxonomy) => {
							if (encodeURIComponent(taxonomy.prefLabel) == filteredEncodedLabel) taxonomyInFilter = true;
						});
						return (
							<ArchiveCard key={article._id} article={article} filtered={taxonomyInFilter} />
						)
					})
				)}
			</div>
		</div>
	)
}

// export default ArchiveFilter;