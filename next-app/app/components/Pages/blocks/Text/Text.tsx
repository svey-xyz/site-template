import React, { Suspense } from 'react';
import { CustomPortableText } from '@components.next-app/PortableText';

export const Text = ({ data, className, draft }: { data: any | undefined, className?:string, draft?:boolean }) => {
	if (!data) return;

	return (
		<div className={`${className}`}>
			<div className='relative flex flex-col max-w-prose-full'>
				{data.text &&
					<CustomPortableText text={data.text} />
				}
			</div>
		</div>	
	);
};