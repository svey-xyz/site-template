'use client'

import { useRef, useEffect } from "react";
import { shader } from "./shaderBase";
import * as THREE from 'three';

export enum LogicProcesses {
	TOUCH = 'touch',
	INIT = 'init',
	LOOP = 'loop',
}

type LogicStrings = {
	[key in LogicProcesses]?: string; // Note string is later converted to Fn
}

type LogicFns = {
	[key in LogicProcesses]?: ((shader: blobShader) => void);
}


type shaderArgs = {
	vertShader?: string,
	fragShader?: string,
	uniforms?: { [uniform: string]: THREE.IUniform },
	logic?: LogicStrings
}

export const ShaderContainer = ({ args, className}: { args: shaderArgs, className?: string }) => {

	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const myClassInstance = new blobShader(ref.current, args);
	}, []);
	
	return (
		<div ref={ref} className={className} />
	)
}

export class blobShader extends shader {
	uniforms?: { [uniform: string]: THREE.IUniform } | undefined = {}
	logic: LogicFns = {}


	constructor(container: HTMLDivElement | null, args: shaderArgs) {
		if (!container) return
		super(container);

		if (args.logic) Object.entries(args.logic).forEach((l) => {
			const logicFn = new Function(`return ${l[1]}`)() as ((shader: blobShader) => void)
			this.logic[l[0] as LogicProcesses] = (logicFn)
		})

		this.uniforms = args.uniforms
		super.initializeShader(this.uniforms, { vert: args.vertShader, frag: args.fragShader });
	}

	init() {
		super.init();
		if (this.logic.init) this.logic.init(this)
	}

	render() {
		super.render();
		if (this.logic.loop) this.logic.loop(this)

	}

	touchStart(e: Event): void {
		super.touchStart(e);
		if (this.logic.touch) this.logic.touch(this)
	}
}