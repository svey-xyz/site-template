// components/SuspenseBoundary.tsx
import React, { ReactNode, Suspense } from 'react';

const PageLoader = ({ className }: { className?: string }) => {

	return (
		<div className={`relative main-padding flex items-center justify-center  ${className}`}>
			<div className='rounded-full shadow-extrude'>
				<div className="animate-spin rounded-full h-16 w-16 border-4 border-fg/40 border-solid border-b-accent shadow-inner bg-inherit" />
			</div>
		</div>
	)
};

export default PageLoader;