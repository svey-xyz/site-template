import React from 'react';
import ImageBuilder from '@components.next-app/Image'
import { Image_block } from '@next-app/sanity.types';

export const Image = ({ data, className }: { data: Image_block, className?: string }
) => {

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