'use client'

import { useRef, useEffect } from "react";
import { shader } from "./shader";

export const ShaderContainer = ({ args, className}: { args: shaderArgs, className?: string }) => {

	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const myClassInstance = new shader(ref.current, args);
	}, []);
	
	return (
		<div ref={ref} className={className} />
	)
}

