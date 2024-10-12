import React from 'react';
import { block_Image } from '@/types';
import ImageBuilder from '@/components/site/Image'

const Image = ({ data, className }: { data: block_Image | undefined, className?: string }) => {
	if (!data) return;

	return (
		<div className={`${className}`}>
			{ data.image &&
				<ImageBuilder
					image={data.image}
					size={{
						width: 1200, height: 1200,
						sizes: "(max-width: 1200px) 60vw, (max-width: 1200px) 50vw, 50vw",
					}}
				className={`h-auto w-auto max-w-fit max-h-[60lvh] ${data.accented ? 'shadow-xl rotate-2 md:max-h-[40lvh] mx-auto' : ''}`}
				/>
			}
		</div>
	);
};

export default Image;