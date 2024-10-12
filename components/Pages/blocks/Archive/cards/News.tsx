import React from 'react';
import Image from '@components/site/Image'

import { article, article_News } from '@/types'
import { resolveArticleHref } from '@/lib/resolveHref';
import Link from 'next/link'
import { readableDate } from '@/lib/stringFunctions';
import TextBlock from '@/components/site/TextBlock';

type args = {
	article: article,
	filtered?: boolean,
}

const NewsArchiveCard = async ({ article, filtered = true }:args) => {
	if (!article || !article.slug) return []

	if (article._type !== 'news') throw new Error(`Wrong article type - '${article._type}' - passed to News card.)`)
	const news = article as article_News

	return (
		<a href={resolveArticleHref(news) || ''} className={`${filtered ? 'block' : "hidden"} relative flex flex-col group cursor-pointer`} >
			<div className='relative flex flex-col'>
				<div className='relative min-h-48 max-h-48 overflow-hidden'>
					{	news.image ?
						<div className='flex flex-col relative w-full h-full items-center justify-center'>
							<div className='w-auto h-full'>
								<Image
									image={news.image}
									size={{ width: 400, height: 400 }}
									style={{ objectFit: 'contain', width: 'auto', height: '100%' }}
								/>
							</div>
						</div>
						:
						<div className='absolute inset-0 bg-accent-secondary/80 flex flex-col items-center justify-center'>
							<span className='text-2xl font-black text-bg text-center'>
								{news.title}
							</span>
						</div>
					}
				</div>

				<div className='py-2 bg-bg w-full flex flex-col gap-4'>
					<span className='text-xl text-accent font-black'>
						{news.title}
					</span>
					<span>
						<TextBlock text={news.description} />
					</span>
					<span className='text-sm text-accent-secondary-dark'>
						{ readableDate(news.date) }
					</span>
				</div>
			</div>
		</a>
	);

	// return (
	// 	<div className={`${filtered ? 'block' : "hidden"} relative flex flex-col group cursor-pointer`} >
	// 		<div className='relative flex flex-col bg-accent text-bg h-96 w-full'>
				
	// 			{news.image &&
	// 				<Image
	// 				image={news.image}
	// 					size={{width:400, height:400}}
	// 					style={{objectFit: 'cover', width: '100%', height: '100%'}}
	// 				/>
	// 			}

	// 			{/* {news.date &&
	// 				<div className='absolute bg-accent-secondary text-bg py-2 px-4 top-4 left-4'>
	// 					<span className=''>{readableDate(news.date)}</span>
	// 				</div>
	// 			} */}
				
	// 			<div className='absolute bottom-0 px-4 py-2 bg-accent/80 w-full flex flex-row items-end gap-4 border-transparent border-t-2 group-hover:border-accent-secondary group-hover:bg-accent/90'>
	// 				<a href={resolveArticleHref(article) || ''} aria-label="Link to news article"
	// 					className='font-bold text-2xl flex-grow leading-none'>
	// 					{news.title}
	// 				</a>
	// 				<span className='text-sm leading-tight text-right'>
	// 					{/* {readableDate(news.date)} */}
	// 				</span>		
	// 			</div>


	// 		</div>
		
			
	// 	</div>
	// );
};

export default NewsArchiveCard;