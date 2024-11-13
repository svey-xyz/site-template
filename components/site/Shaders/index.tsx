'use client'

import { useRef, useEffect } from "react";
import { shader } from "./shaderBase";
import { Utils, colour } from './utils'

import * as THREE from 'three';

const frag = `
#define GLSLIFY 4
// Common uniforms
uniform float u_time;
uniform vec2 u_posSeed;
uniform vec3 u_bgColour;

/*
 * GLSL textureless classic 2D noise "cnoise",
 * with an RSL-style periodic variant "pnoise".
 * Author:  Stefan Gustavson (stefan.gustavson@liu.se)
 * Version: 2011-08-22
 *
 * Many thanks to Ian McEwan of Ashima Arts for the
 * ideas for permutation and gradient selection.
 *
 * Copyright (c) 2011 Stefan Gustavson. All rights reserved.
 * Distributed under the MIT license. See LICENSE file.
 * https://github.com/stegu/webgl-noise
 *
 * Stefan's work is used for the base noise function
 */

vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float cnoise(vec2 P) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod289(Pi);
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;

    vec4 i = permute(permute(ix) + iy);

    vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0;
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;

    vec2 g00 = vec2(gx.x, gy.x);
    vec2 g10 = vec2(gx.y, gy.y);
    vec2 g01 = vec2(gx.z, gy.z);
    vec2 g11 = vec2(gx.w, gy.w);

    vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;

    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));

    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.2 * n_xy; // bigger number = layers closer together
}

// Mix noise val with time
float mixNoiseVals(float m, vec2 p, vec2 t) {
    return m * cnoise(15.0 * t) + cnoise(15.0 * p);
}

// The main stuff
void main() {
	float t = u_time * 0.0012;
	float scale = 0.000125;
	float m = 1.8; // amount of movement between phases

	float noise = mixNoiseVals(m, vec2((gl_FragCoord.xy + u_posSeed.xy) * scale), vec2(t));

	float steps = 3.0; // how many layers
	float brightness = 2.2; // controls how much of the canvas is white

	float layer = floor(noise * steps + brightness) / steps;

	gl_FragColor = vec4(u_bgColour, layer); // return layers of white with opacity
}
`

const vert = `
// Common varyings - not used currently
// varying vec3 v_position;
// varying vec3 v_normal;

void main() {
	gl_Position = vec4(position, 1.0);
}
`

// const vertShader: String = require('../blobShader/shaders/vert-Abstract.glsl');
// const fragShader: String = require('../blobShader/shaders/frag-Abstract.glsl');

const uniforms = {
	u_time: {
		// type: "f",
		value: 0.0
	},
	u_posSeed: {
		// type: "v2",
		value: new THREE.Vector2(1000, 1000)
	},
	u_bgColour: {
		// type: "v3",
		value: new THREE.Vector3(200 / 255, 120 / 255, 169 / 255)
	}
};

type shaderArgs = {
	vertShader?: string,
	fragShader?: string,
	uniforms?: { [uniform: string]: THREE.IUniform },
	initLogic?: () => void,
	loopLogic?: () => void
}

export const ShaderContainer = ({ args, className}: { args: shaderArgs, className?: string }) => {

	const myLogic = () => {
		// shader()
	}

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const myClassInstance = new blobShader(ref.current, { vertShader: vert, fragShader: frag, uniforms: uniforms });
		// myClassInstance.logComponent();
	}, []);
	
	return (
		<div ref={ref} className={className} />
	)
}

class blobShader extends shader {
	uniforms: { [uniform: string]: THREE.IUniform } | undefined = {}

	rgbBg: colour = {r:0, g:0, b:0 }
	period: number = 8
	amplitude: number = 2

	// Initializes the sketch
	constructor(container: HTMLDivElement | null, args: shaderArgs) {
		if (!container) return
		super(container);

		this.uniforms = args.uniforms
		super.initializeShader(this.uniforms, { vert: args.vertShader, frag: args.fragShader });
		// this.render();

	}

	init() {
		super.init();
		this.uniforms?.u_posSeed.value.set(this.randomBetween(), this.randomBetween());

	}

	// Renders the sketch
	render() {
		super.render();

		// this.uniforms?.u_time.value = Math.cos(this.clock.getElapsedTime() / this.period) * this.amplitude;

		// this.uniforms?.u_bgColour.value = new THREE.Vector3(this.rgbBg.r / 255, this.rgbBg.g / 255, this.rgbBg.b / 255);
	}

	touchStart(e: Event): void {
		super.touchStart(e);
	}



	randomBetween(min = 0, max = 100000) { // min and max included 
		var randBetween = Math.floor(Math.random() * (max - min + 1) + min);
		return (Math.random() > 0.5 ? randBetween : -randBetween);
	}
}