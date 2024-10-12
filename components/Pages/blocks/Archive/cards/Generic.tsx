import React from 'react';
import Image from '@components/site/Image'

import { article } from '@/types'
import { resolveArticleHref } from '@/lib/resolveHref';

type args = {
	article: article,
	filtered?: boolean,
}

export const GenericArchiveCard = async ({ article, filtered = true }: args) => {

	return (
		<a href={resolveArticleHref(article) || ''} className={`${filtered ? 'block' : "hidden"} relative flex flex-col group cursor-pointer`} >
			<div className='relative flex flex-col'>
				<div className='relative min-h-48 max-h-48 overflow-hidden'>
					{ article.image ?
						<div className='relative flex flex-col w-full h-full items-center justify-center'>
							<Image
								image={article.image}
								size={{ width: 400, height: 400 }}
								style={{ objectFit: 'contain', width: 'auto', height: '100%' }}
								className='p-2'
							/>
							<Image
								image={article.image}
								size={{ width: 400, height: 400 }}
								style={{ objectFit: 'cover', width: '100%', height: '100%', filter: 'blur(50px)' }}
								className='absolute inset-0 -z-1 opacity-60'
							/>
						</div>
						:
						<div className='absolute inset-0 bg-accent-secondary/80 flex flex-col items-center justify-center'>
							<span className='text-2xl font-black text-bg text-center'>
								{article.title}
							</span>
						</div>
					}
				</div>
				
				<div className='py-2 bg-bg w-full flex flex-col gap-4'>
					<span className='text-xl text-accent font-black'>
						{article.title}
					</span>
				</div>
			</div>
		</a>
	);
};

export default GenericArchiveCard;