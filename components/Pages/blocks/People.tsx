import { block_People } from '@/types';
import React from 'react';

export const People = async ({ data, className }: { data: block_People, className?: string }) => {

	return (
		<div className={`${className}`}>
			<div className='relative grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(200px,1fr))] auto-rows-auto gap-12 max-w-full w-full'>
				{	data.people.map((person) => {
					return (
						<div key={person._id} className='flex flex-col items-left'>
							<h4 className='flex border-b-2 border-accent'>
								{person.name}
							</h4>
							<div className='flex flex-col text-md'>
								<span className='font-bold'>
									{person.position}
								</span>
								{person.businesses &&
									<span className='font-light'>
										<em>
											{person.businesses[0].title}
										</em>
									</span>
								}
							</div>
						</div>
					)
				})}
			</div>

		</div>
	);
};

export default People;