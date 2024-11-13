declare global {
	enum LogicProcesses {
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
}



export { };
