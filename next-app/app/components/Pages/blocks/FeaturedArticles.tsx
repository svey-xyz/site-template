import React from 'react';
import dynamic from 'next/dynamic'
import { FeaturedArticles_block } from '@next-app/sanity.types';

interface CardMap {
	[key: string]: React.ComponentType<{
		// article: article,
		filtered?: boolean,
	}>
}

const CardList: CardMap = {
	// Default: dynamic(() => import('@/components/Pages/blocks/Archive/cards/Default')),
}

export const FeaturedArticles = ({ data, className }: { data: FeaturedArticles_block, className?: string }
) => {
	if (!data) return

	return (
		<div className={`${className}`}>
			HIIIIIIIIIIIIIIIIII
			{/* <h2>
				{ data.title }
			</h2>
			<div className='relative flex flex-col lg:flex-row gap-8 items-center lg:items-start lg:justify-center'>
				{	data.articles?.map((article: any) => {

					const FeaturedCard = CardList[article._type] ?? CardList.Default

					return <FeaturedCard key={`${data._key}-${article._id}`} article={article} />
				})}
			</div> */}
		</div>
	);
};

export default FeaturedArticles;