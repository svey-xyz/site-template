// components/SuspenseBoundary.tsx
import React, { ReactNode, Suspense } from 'react';

// Loading spinner component
const Spinner = () => (
	<div className="flex items-center justify-center">
		<div className="animate-spin rounded-full h-icon w-icon border-2 border-fg/40 border-solid border-b-accent"></div>

	</div>
);

export default Spinner;