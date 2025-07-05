import React from 'react';
import { Blocks } from '@next-app/sanity.types';

type _block = ArrElement<Blocks['blocks']>

interface genericBlockData {
	_type: _block['_type']
	[x: string]: unknown;
}


export const Standard = ({ data, className }: { data: genericBlockData, className?: string}
) => {
	return (
		<div className={`${className}`}>
			Block not found: { data._type }
		</div>
	);
};

export default Standard;