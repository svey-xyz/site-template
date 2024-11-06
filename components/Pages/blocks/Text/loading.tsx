import React from 'react';

export const Skeleton = ({}:{}) => {
	return (
		<div className="main-padding">
			<div className="animate-pulse flex space-x-4 max-w-prose-full">
				<div className="flex-1 space-y-6 py-1">
					<div className="h-2 bg-fg/80 rounded max-w-prose"></div>
					<div className="space-y-3">
						<div className="grid grid-cols-3 gap-4">
							<div className="h-2 bg-fg/80 rounded col-span-2"></div>
							<div className="h-2 bg-fg/80 rounded col-span-1"></div>
						</div>
						<div className="h-2 bg-fg/80 rounded"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

// export default TextSkeleton;