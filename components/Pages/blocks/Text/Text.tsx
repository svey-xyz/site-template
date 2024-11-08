import React, { Suspense } from 'react';
import {MDXText} from '@/components/site/MDX/';

export const Text = async ({ data, className, draft }: { data: block_Text | undefined, className?:string, draft?:boolean }) => {
	if (!data) return;
	// await new Promise((resolve) => setTimeout(resolve, 300000));

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