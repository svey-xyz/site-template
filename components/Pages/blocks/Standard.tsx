import { block } from '@/types';
import React from 'react';

export const Standard = ({data, className}:{data: block, className?:string}) => {
	return (
		<div className={`${className}`}>
			Block not found: { data._type }
		</div>
	);
};

export default Standard;