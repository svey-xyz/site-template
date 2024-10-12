import React from 'react';
import { article, article_News } from '@/types';
import { notFound } from 'next/navigation'
import TextBlock from '@/components/site/TextBlock';
import ImageBuilder from '@/components/site/Image'

export interface NewsPageProps {
	data: article_News | article
}

export const News = async ({ data }: NewsPageProps) => {
	if (!data) return notFound();
	if (data._type !== 'news') throw new Error(`Wrong article type - '${data._type}' - passed to News article.)`)

	return (
		<article className='py-12 max-h-fit overflow-hidden'>
			<div className='relative z-10 flex flex-col gap-4 main-padding'>
				<h1 className='text-accent text-5xl font-bold max-w-prose'>
					{data.title}
				</h1>

				{ data.image &&
					<ImageBuilder
						image={data.image}
						size={{
							width: 1200, height: 1200,
							sizes: "(max-width: 1200px) 60vw, (max-width: 1200px) 50vw, 50vw",
						}}
						className={`h-auto w-auto max-w-fit max-h-[60lvh]`}
					/>
				}

				{data.description &&
					<div className='text-sm max-w-prose-full'>
						<TextBlock text={data.description} />
					</div>
				}
			</div>
		</article>
	);
};

export default News