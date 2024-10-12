import { Standard } from './Standard';
import urlFor from '@/lib/urlFor';
import { section, sanityImage } from '@/types';
import React, { ReactNode } from 'react';

export const Image = ({ index, data }: { index: number, data: section }) => {
	const BG_URL = data?.image ? urlFor(data?.image).url() : ''
	return (

		<Standard data={ data } index={ index } className={`
			${ index == 0 && '-mt-[--total-header-height]' }
			bg-fixed bg-no-repeat bg-cover bg-center text-accent
			after:absolute after:inset-0 after:bg-bg/30 after:backdrop-blur`}
			style={{
				backgroundImage: `url(${BG_URL})`
			}}
			/>
	);
};

export default Image;