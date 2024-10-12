import React from 'react';
import { block_Text } from '@/types';
import TextBlock from '@/components/site/TextBlock';

const Text = ({ data, className }: { data: block_Text | undefined, className?:string }) => {
	if (!data) return;
	return (
		<div className={`${className}`}>
			<div className='relative flex flex-col max-w-prose-full'>
				{ data.text &&
					<TextBlock text={data.text} />
				}
			</div>
		</div>
	);
};

export default Text;