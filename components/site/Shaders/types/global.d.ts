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
		uniforms?: Array<UniformValue>,
		logic?: LogicStrings
	}

	type UniformValue = {
		name: string,
		type: UniformType,
		value: any
	}

	type UniformType =
		| "float"
		| "vec2"
		| "vec3"
		| "vec4"
		| "int"
		| "ivec2"
		| "ivec3"
		| "ivec4"
		| "mat2"
		| "mat3"
		| "mat4";
}



export { };
