'use client'

import { useRef, useEffect } from "react";
import { Shader } from "./shader";

export const ShaderContainer = ({ args, className}: { args: shaderArgs, className?: string }) => {

	const ref = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		if (!ref.current) return
		const myClassInstance = new Shader(ref.current, args);
	}, []);
	
	return (
		<canvas ref={ref} className={`${className} w-full`} />
	)
}

