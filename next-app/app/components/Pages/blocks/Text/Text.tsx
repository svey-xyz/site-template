import React, { Suspense } from 'react';
import {MDXText} from '@components.next-app/MDX';

export const Text = ({ data, className, draft }: { data: any | undefined, className?:string, draft?:boolean }) => {
	if (!data) return;

	return (
		<div className={`${className}`}>
			<div className='relative flex flex-col max-w-prose-full'>
				{data.text &&
					<MDXText text={data.text} draft={draft} />
				}
			</div>
		</div>	
	);
};