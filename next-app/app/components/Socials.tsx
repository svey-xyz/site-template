import Link from 'next/link';
import React from 'react';

import { socialIcon } from '@lib.next-app/SocialIcon';
import { Social } from '@next-app/sanity.types';
import { WithKey } from '@sanity.next-app/lib/utils';

export const SocialsArray = ({ socials, className }: { socials: Array<WithKey<Social>>, className?:string}) => {
	
	return (
		<div className={`${className} flex flex-row gap-4`}>
			{ socials.map((social) => {

				const Icon = socialIcon(`${social.socialType}`)

					return (
						<Link key={social._key} href={social.url} target="_blank" referrerPolicy="no-referrer" aria-label={`External link to social network: ${social.socialType}`}
							className="group relative inline-flex items-center justify-center w-icon h-icon hover-button" >
							<Icon className='fill-fg' />
						</Link >
					)
				})
			}
		</div>
	);
};

export default SocialsArray;