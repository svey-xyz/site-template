import { section } from '@/types';
import React, { ReactNode } from 'react';
import { Standard } from './Standard'

export const Video = ({ data, index }: { data:section, index: number }) => {
	return (
		<Standard data={ data } index={ index } className={`
			${ (index == 0) && '-mt-[--total-header-height]' }
			h-[900px] after:absolute after:inset-0 after:bg-bg-secondary/[.65]
		`} >
			<div className="h-full w-full top-0 left-0 absolute overflow-hidden">
				<video autoPlay loop className="absolute min-w-full min-h-full object-cover">
					<source src={data?.video} type="video/mp4" />
				</video>
			</div>
		</Standard>
			
	);
};

export default Video;