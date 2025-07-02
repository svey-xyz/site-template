import NewsletterForm from '@components.next-app/NewsletterForm';
import { Newsletter_block } from '@next-app/sanity.types';
import React from 'react';

export const Standard = ({ data, className }: { data: Newsletter_block, className?: string }
) => {
	return (
		<div className={`${className}`}>
			<h3>
				{ data.callToAction }
			</h3>
			<span>
				{ data.text }
			</span>
			<NewsletterForm stacked={true} className="max-w-prose" />
			<span>
				We do not share our mailing list.
			</span>
		</div>
	);
};

export default Standard;