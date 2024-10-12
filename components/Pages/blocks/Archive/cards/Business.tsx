import React from 'react';
import Image from '@components/site/Image'
import Link from 'next/link'

import { article_Business, article} from '@/types'
import { slugifyWithOptions } from '@/lib/stringFunctions';
import { GlobeAltIcon } from '@heroicons/react/24/solid'
import { resolveContactHref } from '@/lib/resolveHref';

type args = {
	article: article,
	filtered?: boolean,
}

export const BusinessArchiveCard = async ({ article, filtered = true }: args) => {
	if (!article || !article.slug) return []
	if (article._type !== 'business') throw new Error(`Wrong article type - '${article._type}' - passed to Business card.)`)

	const business = article as article_Business
	const image = business.image ? business.image : business.logo ? business.logo : undefined

	return (
		<div className={`${filtered ? 'block' : "hidden"} relative flex flex-col group`} >
			<div className='relative flex flex-col items-center justify-start h-full gap-2'>
				{/* after:absolute after:inset-0 after:bg-gradient-to-t after:from-bg/80 after:to-bg/0 */}

				<div className='relative overflow-hidden h-48 w-full'>
					{ image ?
						<div className='flex flex-col relative w-full h-full items-center justify-center'>
							<div className='w-auto h-full p-4'>
								<Image
									image={image}
									size={{ width: 400, height: 400 }}
									style={{ objectFit: 'contain', width: 'auto', height: '100%' }}
								/>
							</div>
							
							<Image
								image={image}
								size={{ width: 400, height: 400 }}
								style={{ objectFit: 'cover', width: '100%', height: '100%', filter: 'blur(50px)'}}
								className='absolute inset-0 -z-1 opacity-60'
							/>
						</div>
						:
						<div className='absolute inset-0 bg-accent-secondary/80 flex flex-col items-center justify-center'>
							<span className='text-2xl font-black text-bg text-center'>
								{business.title}
							</span>
						</div>
					}
				</div>
				<div className={`w-full flex flex-col gap-1 z-10`}>
					<span className='text-xl font-black text-accent leading-tight'>
						{business.title}
					</span>
					{ business.publicContact?.website &&
						<Link href={resolveContactHref(business.publicContact)} target="_blank"
							className='flex flex-row cursor-pointer items-center gap-2'
						>
							<GlobeAltIcon className='w-icon-sm h-icon-sm text-accent'/>
							<span className='text-accent-secondary text-sm font-bold'>
								Website
							</span>
						</Link>
					}
				</div>
			</div>
		</div>
	);
};

export default BusinessArchiveCard;