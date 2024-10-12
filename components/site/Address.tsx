import { article_Address } from '@/types';
import React from 'react';

export const Address = ({ address }: { address: article_Address }) => {
	const Unit = (address.unit && address.number) ? `${address.number}.${address.unit}` : address.number ? `${address.number}` : null
	const Street = (address.street) ? `${address.street}` : null
	const FullAddress = (Unit && Street) ? `${Unit} ${Street}` : Unit ? Unit : Street ? Street : ''

	return (
		<div className='flex flex-col gap-2'>
			{ FullAddress &&
				<span className=''>
					{ FullAddress }
				</span>
			}
			{ address.postalCode &&
				<span className=''>
					{ address.postalCode }
				</span>
			}
		</div>
	);
};

// export default Address;