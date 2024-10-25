'use client'

import { Icon } from '@iconify/react';
import React from 'react';

export const Info = ({ data, className }: { data: block_Info, className?: string }) => {
	return (
		<div className={`${className} w-full`}>
			{ data.title &&
				<h2>
					{data.title}
				</h2>
			}

			<div className='relative grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(200px,1fr))] auto-rows-auto gap-8 max-w-full w-full'>
				{ data.items?.map((item) => {
					return (
						<div key={item.title} className='flex flex-col items-start text-left'>
							{ item.icon &&
								<div className='rounded-full p-3 mb-2 w-fit'>
									<Icon icon={item.icon.name} />
								</div>
							}
							{ item.number &&
								<div className='p-3 mb-2'>
									{item.number}
								</div>
							}
							<h4>
								{item.title}
							</h4>
							<span className='max-w-48'>
								<em>{item.subTitle}</em>
							</span>
						</div>
					)
				}) }
			</div>

		</div>
	);
};

export default Info;