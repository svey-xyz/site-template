import React from 'react';
// import { settings } from "@lib/data/data";
import NewsletterForm from '@components/site/NewsletterForm'
import Socials from '@components/site/Socials'
import { loadSettings } from '@/sanity/queries/loadQuery';

const Footer = async ({}:{}) => {
	const initial = await loadSettings()
	if (!initial) return

	const settings = initial.data
	
	return (
		<section className='relative w-full bg-bg-secondary'>
			<div className='main-padding py-8 text-bg flex flex-col md:flex-row gap-x-8 gap-y-2 md:items-center'>
				<span className='font-bold'>{ settings.motto && settings.motto }</span>
				<NewsletterForm />
				{ settings.contact?.socials &&
					<Socials socials={settings.contact.socials} className='text-bg' />
				}
			</div>

		</section>
	);
};

export default Footer;