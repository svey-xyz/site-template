import { LinkIcon } from '@heroicons/react/24/solid';
import dynamic from 'next/dynamic';

export const socialIcon = (socialType: string) => {
	switch (socialType) {
		case ('facebook'):
			return dynamic(() => import('@public.next-app/icons/socials/facebook.svg'));
		case ('instagram'):
			return dynamic(() => import('@public.next-app/icons/socials/instagram.svg'));
		case ('twitter'):
			return dynamic(() => import('@public.next-app/icons/socials/x.svg'));
		case ('mastodon'):
			return dynamic(() => import('@public.next-app/icons/socials/mastodon.svg'));
		case ('github'):
			return dynamic(() => import('@public.next-app/icons/socials/github.svg'));
		default:
			return LinkIcon;
	}
}