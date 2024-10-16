import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

import { LinkIcon } from '@heroicons/react/24/solid'

const Socials = ({ socials, className }: { socials: Array<object_Social>, className?:string}) => {
	
	return (
		<div className={`${className} flex flex-row gap-4`}>
			{ socials.map((social) => {
				const Icon = (() => {
					switch (social.socialType) {
						case ('facebook'):
							return dynamic(() => import('@public/icons/socials/facebook.svg'));
						case ('instagram'):
							return dynamic(() => import('@public/icons/socials/instagram.svg'));
						case ('twitter'):
							return dynamic(() => import('@public/icons/socials/x.svg'));
						case ('mastodon'):
							return dynamic(() => import('@public/icons/socials/mastodon.svg'));
						case ('github'):
							return dynamic(() => import('@public/icons/socials/github.svg'));
						default:
							return LinkIcon;
					}
				})()

					return (
						<Link key={social._key} href={social.url} target="_blank" referrerPolicy="no-referrer" aria-label={`External link to social network: ${social.socialType}`}
							className="group cursor-pointer relative inline-flex items-center justify-center w-icon h-icon" >
								{ Icon &&
									<Icon />
								}
						</Link >
					)
				})
			}
		</div>
	);
};

export default Socials;