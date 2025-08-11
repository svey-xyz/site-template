import { LinkIcon } from '@heroicons/react/24/solid';

import facebook from '@public.next-app/icons/socials/facebook.svg';
import instagram from '@public.next-app/icons/socials/instagram.svg';
import twitter from '@public.next-app/icons/socials/x.svg';
import mastodon from '@public.next-app/icons/socials/mastodon.svg';
import github from '@public.next-app/icons/socials/github.svg';

export const socialIcon = (socialType: string) => {
	switch (socialType) {
		case ('facebook'): return facebook;
		case ('instagram'): return instagram;
		case ('twitter'): return twitter;
		case ('mastodon'): return mastodon;
		case ('github'): return github;
		default: return LinkIcon;
	}
}