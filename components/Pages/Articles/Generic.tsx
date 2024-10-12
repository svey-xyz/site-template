import React from 'react';
import { article } from '@/types';
import { notFound } from 'next/navigation'

export interface GenericArticlePageProps {
	data: article
}

export const Generic = async ({ data }: GenericArticlePageProps) => {
	if (!data) return notFound();
	return (
		<article className='py-12 max-h-fit overflow-hidden'>
			<div className='relative z-10 flex flex-col gap-4 main-padding'>
				<h1 className='text-accent text-5xl font-bold max-w-prose'>
					{ data.title }
				</h1>
			</div>
		</article>
	);
};

export default Generic