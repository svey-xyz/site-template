// components/SuspenseBoundary.tsx
import React, { ReactNode, Suspense } from 'react';

// Loading spinner component
const Spinner = () => (
	<div className="flex items-center justify-center">
		<div className="animate-spin rounded-full h-icon w-icon border-t-2 border-accent border-opacity-75"></div>
	</div>
);

export default Spinner;