import React from 'react';
import Socials from '@components/site/Socials'
import ThemeButton from '@/components/ui/ThemeButton';
import { load_Settings } from '@/sanity/queries/loader';

const Footer = async ({}:{}) => {
	const settings = await load_Settings()
	if (!settings) return

	return (
		<section className='relative w-full'>
			<div className='main-padding py-8 flex flex-col md:flex-row gap-x-8 gap-y-2 md:items-center'>
				{ settings.contact?.socials &&
					<Socials socials={settings.contact.socials} className='' />
				}
				<ThemeButton />
			</div>
		</section>
	);
};

export default Footer;