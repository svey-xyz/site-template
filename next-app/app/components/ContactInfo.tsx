import Socials from '@/components/Socials';
import { resolveContactHref } from '@/next-app/lib/resolveHref';
import React from 'react';

export const ContactInfo = ({contact}:{contact: object_Contact}) => {
	
	return (
		<div className='flex flex-col gap-2'>
			{ contact.website &&
				<a href={resolveContactHref(contact)} target='_blank'>
					Website
				</a>
			}
			{ contact.email &&
				<a href={`mailto:${contact.email}`}>
					{ contact.email }
				</a>
			}
			{ contact.phone &&
				<a href={`tel:${contact.phone}`}>
					{ contact.phone }
				</a>
			}
			{ contact.socials &&
				<Socials socials={contact.socials}/>
			}
		</div>
	);
};

// export default ContactInfo;