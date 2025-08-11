import SocialsArray from '@components.next-app/SocialsArray';
import { resolveContactHref } from '@lib.next-app/resolveHref';
import React from 'react';

export const ContactInfo = ({contact}:{contact: any}) => {
	
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
				<SocialsArray socials={contact.socials}/>
			}
		</div>
	);
};

// export default ContactInfo;