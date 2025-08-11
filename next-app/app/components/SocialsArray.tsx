import Link from 'next/link';
import React from 'react';

import { socialIcon } from '@lib.next-app/SocialIcon';
import { Social } from '@next-app/sanity.types';
import { WithKey } from '@sanity.next-app/lib/utils';

export const SocialsArray = ({ socials, className }: { socials: Array<WithKey<Partial<Social>>>, className?:string}) => {
	
	return (
		<div className={`${className} flex flex-row gap-2`}>
			{ socials.flatMap((social) => {
				if (!social || !social.url || !social.socialType) return [];
				
				const Icon = socialIcon(`${social.socialType}`)

					return (
						<Link key={social._key} href={social.url} target="_blank" referrerPolicy="no-referrer" aria-label={`External link to social network: ${social.socialType}`}
							className="group relative inline-flex items-center justify-center w-icon-sm h-icon-sm hover-button" >
							<Icon className='fill-fg' />
						</Link >
					)
				})
			}
		</div>
	);
};

export default SocialsArray;