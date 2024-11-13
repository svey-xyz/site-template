import { advancedBase } from "./base";
import * as THREE from 'three';

/**
 * Shader Base Class for interactive shader sections
 *
 * @export
 * @class shader
 * @extends {Section}
 */
export class shader extends advancedBase {
	renderer: THREE.WebGLRenderer;
	scene: THREE.Scene;
	camera: THREE.OrthographicCamera;
	clock: THREE.Clock;
	uniforms?: { [uniform: string]: THREE.IUniform } | undefined = {};

	vertShader: string = '';
	fragShader: string = '';

	// Initializes the sketch
	constructor(container: HTMLElement) {
		super(container);

		// Initialize the WebGL renderer
		this.renderer = new THREE.WebGLRenderer({ alpha: true });
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.sectionSize.width, this.sectionSize.height);

		this.container.appendChild(this.renderer.domElement);

		// Initialize the scene
		this.scene = new THREE.Scene();

		// Initialize the camera
		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

		// Initialize the clock
		this.clock = new THREE.Clock(true);
	}

	initializeShader(uniforms: any, shaders: any) {
		this.uniforms = uniforms;
		this.vertShader = shaders.vert;
		this.fragShader = shaders.frag;

		// Create the plane geometry
		var geometry = new THREE.PlaneGeometry(2, 2);

		// Create the shader material
		var material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			transparent: true,
			vertexShader: this.vertShader,
			fragmentShader: this.fragShader,
		});

		// Create the mesh and add it to the scene
		var mesh = new THREE.Mesh(geometry, material);
		this.scene.add(mesh);
		this.startLoop();
	}

	loop(): void {
		super.loop();
		this.render();
	};

	// Renders the sketch
	render() {
		this.renderer.render(this.scene, this.camera);
	}

	setUniform(uniform: string, value: any): void {
		if (this.uniforms) this.uniforms[uniform].value = value
	}

	resize(e: Event) {
		super.resize(e)
		this.renderer.setSize(this.sectionSize.width, this.sectionSize.height);
		// Render on resize instead of waiting for animation frame to avoid jitter
		this.render();
	}

	handleInput(e: Event) {
		super.handleInput(e);
	}
}