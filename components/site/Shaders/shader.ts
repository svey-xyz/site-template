import { domHandler } from "./base";
import * as THREE from 'three';

/**
 * Shader Base Class for interactive shader sections.
 *
 * @export
 * @class Shader
 * @extends {domHandler}
 */
export class Shader extends domHandler {
	uniforms: { [uniform: string]: THREE.IUniform } = {};
	logic: LogicFns = {};
	gl: WebGLRenderingContext;
	shaderProgram: WebGLProgram;
	vertexBuffer: WebGLBuffer;

	vertShader?: string = '';
	fragShader?: string = '';

	constructor(container: HTMLCanvasElement, args: shaderArgs) {
		super(container);
		this.gl = container.getContext('webgl') as WebGLRenderingContext;
		this.shaderProgram = this.initializeShader(args.vertShader, args.fragShader);
		this.vertexBuffer = this.initBuffers();

		// Initialize custom logic if provided
		if (args.logic) this.initializeLogic(args.logic);

		super.init();
		this.resize()
		this.startLoop(60);
	}

	// Initializes custom logic from provided args
	private initializeLogic(logic: { [key in LogicProcesses]?: string }): void {
		Object.entries(logic).forEach(([key, logicFunction]) => {
			const logicFn = new Function(`return ${logicFunction}`)() as (shader: Shader) => void;
			this.logic[key as LogicProcesses] = logicFn;
		});
	}

	private loadShader(gl: WebGLRenderingContext, type: GLenum, source: string = ''): WebGLShader | null {
		const shader = gl.createShader(type);
		if (!shader) return null;

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);
			return null;
		}

		return shader;
	}

	private initBuffers(): WebGLBuffer {
		const vertices = new Float32Array([
			1.0, 1.0,  // Top-right
			-1.0, 1.0,  // Top-left
			1.0, -1.0,  // Bottom-right corner
			-1.0, -1.0,  // Bottom-left corner
		]);

		const vertexBuffer = this.gl.createBuffer();
		if (!vertexBuffer) throw new Error('Failed to create vertex buffer');

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

		return vertexBuffer;
	}

	private initializeShader(vertShader?: string, fragShader?: string): WebGLProgram {
		const vertexShader = this.loadShader(this.gl, this.gl.VERTEX_SHADER, vertShader);
		const fragmentShader = this.loadShader(this.gl, this.gl.FRAGMENT_SHADER, fragShader);
		if (!vertexShader || !fragmentShader) throw new Error('Shader compilation failed');

		const shaderProgram = this.gl.createProgram();
		if (!shaderProgram) throw new Error('Failed to create shader program');

		this.gl.attachShader(shaderProgram, vertexShader);
		this.gl.attachShader(shaderProgram, fragmentShader);
		this.gl.linkProgram(shaderProgram);

		if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
			console.error('Shader program link error:', this.gl.getProgramInfoLog(shaderProgram));
			throw new Error('Unable to initialize the shader program');
		}
		return shaderProgram;
	}

	// Main render loop
	loop(): void {
		super.loop();
		this.logic.loop?.(this);
		this.render();
	}

	render(): void {
		const gl = this.gl;
		gl.clear(gl.COLOR_BUFFER_BIT);

		const vertexPosition = gl.getAttribLocation(this.shaderProgram, 'aVertexPosition');
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(vertexPosition);

		gl.useProgram(this.shaderProgram);
		gl.drawArrays(gl.TRIANGLES, 0, 3);
	}

	// Sets a uniform value for the shader
	setUniform(uniform: string, value: any): void {
		if (this.uniforms[uniform]) this.uniforms[uniform].value = value;
		const uLoc = this.gl.getUniformLocation(this.shaderProgram, uniform);
		this.gl.uniform1f(uLoc, value)
	}

	// Resize handler
	resize(e?: Event): void {
		super.resize(e);
		const { width, height } = this.container.getBoundingClientRect();
		this.container.width = width;
		this.container.height = height;
		this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);

		this.render(); // Render immediately on resize to avoid jitter waiting for render call
	}

	// Handles input events
	handleInput(e: Event): void {
		super.handleInput(e);
	}

	// Handles touch start events
	touchStart(e: Event): void {
		super.touchStart(e);
		this.logic.touch?.(this);
	}
}
