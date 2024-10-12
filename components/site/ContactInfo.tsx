import Socials from '@/components/site/Socials';
import { object_Contact } from '@/types';
import React from 'react';

export const ContactInfo = ({contact}:{contact: object_Contact}) => {
	
	return (
		<div className='flex flex-col gap-2 underline text-accent-secondary'>
			{ contact.website &&
				<a href={contact.website} target='_blank' className=' hover:text-accent'>
					Website
				</a>
			}
			{ contact.email &&
				<a href={`mailto:${contact.email}`} className=' hover:text-accent'>
					{ contact.email }
				</a>
			}
			{ contact.phone &&
				<a href={`tel:${contact.phone}`} className=' hover:text-accent'>
					{ contact.phone }
				</a>
			}
			{ contact.socials &&
				<Socials socials={contact.socials} className='text-accent-secondary-dark' />
			}
		</div>
	);
};

// export default ContactInfo;