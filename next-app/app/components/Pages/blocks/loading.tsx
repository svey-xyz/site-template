// components/SuspenseBoundary.tsx
import React, { ReactNode, Suspense } from 'react';

const Spinner = ({className}:{className?:string}) => {

	return (
		<div className={`relative ${className}`}>
			<div className="animate-spin rounded-full h-icon w-icon border-2 border-primary-fg/40 border-solid border-b-accent"></div>

		</div>
	)
};

export default Spinner;