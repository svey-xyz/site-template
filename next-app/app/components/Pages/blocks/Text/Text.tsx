import React, { Suspense } from 'react';
import { CustomPortableText } from '@components.next-app/PortableText';
import { Text_block } from '@next-app/sanity.types';
import { PortableText } from 'next-sanity';

export const Text = ({ data, className }: { data: Text_block, className?:string }) => {
	if (!data) return;

	return (
		<div className={`${className}`}>
			<div className='relative flex flex-col max-w-prose-full'>
				{ data.text &&
					<PortableText value={data.text} />
				}
			</div>
		</div>	
	);
};