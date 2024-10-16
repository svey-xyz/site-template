import React from 'react';
import Socials from '@components/site/Socials'
import { loadSettings } from '@/sanity/queries/loadQuery';

const Footer = async ({}:{}) => {
	const settings = await loadSettings()
	if (!settings) return

	return (
		<section className='relative w-full'>
			<div className='main-padding py-8 flex flex-col md:flex-row gap-x-8 gap-y-2 md:items-center'>
				{ settings.contact?.socials &&
					<Socials socials={settings.contact.socials} className='' />
				}
			</div>

		</section>
	);
};

export default Footer;