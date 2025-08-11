import React from 'react';
import SocialsArray from '@components.next-app/Socials'
import ThemeButton from '@components.next-app/ThemeButton';
import { load_Settings } from '@sanity.next-app/loader/loader';

const Footer = async ({}:{}) => {
	const settings = await load_Settings()
	if (!settings) return

	return (
		<section className='relative w-full bg-primary-bg'>
			<div className='main-padding py-8 flex flex-row justify-between'>
				{ settings.contact?.socials &&
					<SocialsArray socials={settings.contact.socials} className='' />
				}
				<ThemeButton />
			</div>
		</section>
	);
};

export default Footer;