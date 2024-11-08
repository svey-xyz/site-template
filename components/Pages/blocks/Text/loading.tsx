import React from 'react';

export const Skeleton = ({className}:{className?:string}) => {
	return (
		<div className={`${className}`}>
			<div className="flex flex-col gap-4 max-w-prose-full">
				<div className="h-2 bg-fg/90 rounded max-w-prose-short animate-pulse" />
				<div className="flex flex-row flex-wrap gap-4">
					<TextBar w={20} a={0.8} />
					<TextBar w={50} a={0.7} />
					<TextBar w={40} a={0.7} />
					<TextBar w={80} a={0.7} />
					<TextBar w={90} a={0.2} />
				</div>
			</div>
		</div>
	);
};

const TextBar = ({ w, a = 1 }:{ w:number, a?: number}) => {
	return (
		<div
			className={`animate-pulse`}
			style={{
				width: `${w}%`
			}}
		>
			<div
				className={`h-2 bg-fg rounded`}
				style={{
					opacity: `${a}`
				}}
			/>

		</div>
	)
}

// export default TextSkeleton;