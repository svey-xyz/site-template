import React from 'react';
import { Blocks } from '@next-app/sanity.types';

type _block_type = ArrElement<Blocks['blocks']>

export const Standard = ({ data, className }: { data: _block_type, className?: string}
) => {
	return (
		<div className={`${className}`}>
			Block not found: { data._type }
		</div>
	);
};

export default Standard;