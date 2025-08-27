import React from 'react';
import dynamic from 'next/dynamic'
import { AllSanitySchemaTypes, FeaturedArticles_block, internalGroqTypeReferenceTo } from '@next-app/sanity.types';
import { resolveReference, WithKey } from '@sanity.next-app/lib/utils';
import { GenericArchiveCard } from '@components.next-app/Pages/blocks/Archive/cards/Default';

export const FeaturedArticles = ({ data, className }: { data: WithKey<FeaturedArticles_block>, className?: string }
) => {
	if (!data) return

	return (
		<div className={`${className}`}>
			<h2>
				{data.title}
			</h2>
			<div className='relative flex flex-col gap-8'>
				{data.articles?.map((article) => {
					const referredDocument = resolveReference(article)
					// const FeaturedCard = CardList[referredDocument._type] ?? CardList.Default

					switch (referredDocument._type) {
						// case _BLOCK_TYPES.FEATURED_TAXONOMIES: return <FeaturedTaxonomiesComponent data={data as FeaturedTaxonomies_block} />
						default: return <GenericArchiveCard key={`${referredDocument._type}-${referredDocument._id}`} article={referredDocument} />
					}
					// return <FeaturedCard key={`${data._type}-${referredDocument._id}`} article={referredDocument} />
				})}
			</div>
		</div>
	);
};

export default FeaturedArticles;