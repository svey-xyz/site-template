'use client'

import { useRef, useEffect } from "react";
import { Shader } from "./shader";


export const ShaderContainer = ({
		args,
		className,
		loadedClass = 'loaded'
	}: {
		args: shaderArgs,
		className?: string,
		loadedClass?: string
	}) => {

	const ref = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		if (!ref.current) return
		const myClassInstance = new Shader(ref.current, args);

		// if (myClassInstance.)
	}, []);
	
	return (
		<canvas ref={ref} className={`${className} w-full`} />
	)
}

