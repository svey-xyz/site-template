import React from 'react';
import NewsletterForm from '@components/site/NewsletterForm'
import Socials from '@components/site/Socials'
import { loadSettings } from '@/sanity/queries/loadQuery';

const Footer = async ({}:{}) => {
	const initial = await loadSettings()
	if (!initial) return

	const settings = initial.data
	
	return (
		<section className='relative w-full'>
			<div className='main-padding py-8 flex flex-col md:flex-row gap-x-8 gap-y-2 md:items-center'>
				<span className=''>{ settings.motto && settings.motto }</span>
				<NewsletterForm />
				{ settings.contact?.socials &&
					<Socials socials={settings.contact.socials} className='' />
				}
			</div>

		</section>
	);
};

export default Footer;