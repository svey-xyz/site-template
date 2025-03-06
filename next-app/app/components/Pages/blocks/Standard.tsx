import React from 'react';

export const Standard = ({data, className}: any
	// {data: block, className?:string}
) => {
	return (
		<div className={`${className}`}>
			Block not found: { data._type }
		</div>
	);
};

export default Standard;