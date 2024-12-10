import React from 'react';
import Socials from '@components/site/Socials'
import ThemeButton from '@/components/ui/ThemeButton';
import { load_Settings } from '@/sanity/loader/loader';

const Footer = async ({}:{}) => {
	const settings = await load_Settings()
	if (!settings) return

	return (
		<section className='relative w-full'>
			<div className='main-padding py-8 flex flex-row justify-between'>
				{ settings.contact?.socials &&
					<Socials socials={settings.contact.socials} className='' />
				}
				<ThemeButton />
			</div>
		</section>
	);
};

export default Footer;