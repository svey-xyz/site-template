import { colour, position } from "../utils";

export class mathUtils {

	cardinals: Array<position> = [
		{ x: -1, y: -1 },
		{ x: -1, y: 0 },
		{ x: -1, y: 1 },
		{ x: 0, y: 1 },
		{ x: 0, y: -1 },
		{ x: 1, y: -1 },
		{ x: 1, y: 0 },
		{ x: 1, y: 1 },
	]

	perlinNoise: perlin

	constructor() {
		this.perlinNoise = new perlin(Math.random);
	}

	/**
	 * Map a given range of numbers to a new range
	 *
	 * @export
	 * @param {number} x
	 * @param {number} cMin
	 * @param {number} cMax
	 * @param {number} nMin
	 * @param {number} nMax
	 * @return {*} 
	 * @memberof Functions
	 */
	map(x: number, cMin: number, cMax: number, nMin: number, nMax: number): number {
		return (x - cMin) * (nMax - nMin) / (cMax - cMin) + nMin;
	}

	/**
	 * Random number in a given range.
	 *
	 * @export
	 * @param {number} min
	 * @param {number} max
	 * @return {*}  {number}
	 * @memberof Functions
	 */
	rng(min: number, max: number): number {
		return (min + Math.random() * (max - min));
	}


	/**
	 * Random Gaussian number
	 *
	 * @export
	 * @param {number} standDev
	 * @param {number} mean
	 * @return {*}  {number}
	 * @memberof Functions
	 */
	randomGaussian(standDev: number, mean: number): number {
		function randn_bm(): number {
			let u = 0, v = 0;
			while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
			while (v === 0) v = Math.random();
			let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
			num = num / 10.0 + 0.5; // Translate to 0 -> 1
			if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
			return num
		}

		return ((randn_bm() * standDev) + mean);
	}

	/**
	 * Random colour
	 *
	 * @export
	 * @param {colour} cCol
	 * @return {*}  {colour}
	 * @memberof Functions
	 */
	randomCol(cCol: colour): colour {
		let r: number, g: number, b: number;
		r = Math.round(this.constrain(Math.random() * cCol.r, 0, 255));
		g = Math.round(this.constrain(Math.random() * cCol.g, 0, 255));
		b = Math.round(this.constrain(Math.random() * cCol.b, 0, 255));

		return { r: r, g: g, b: b, a: 255 };
	}

	/**
	 * Constrain a given value to a min and max.
	 *
	 * @export
	 * @param {number} v
	 * @param {number} min
	 * @param {number} max
	 * @return {*}  
	 * @memberof Functions
	 */
	constrain(v: number, min: number, max: number) {
		return Math.min(Math.max(v, min), max);
	}

	percentDifference(val1: number, val2: number): number {
		if (val1 > 0) {
			return (Math.abs(val1 - val2) / val1);
		} else {
			return val2;
		}
	}

	addPos(pos1: position, pos2: position): position {
		let z = (pos1.z && pos2.z) ? pos1.z + pos2.z : undefined
		let pos = z ? { x: pos1.x + pos2.x, y: pos1.y + pos2.y, z } : { x: pos1.x + pos2.x, y: pos1.y + pos2.y }
		return pos
	}

	cartesianIndex(pos: position, width: number): number {
		return (pos.y * width + pos.x);
	}

}

/**
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 */
class perlin {

	p = new Uint8Array(256);
	perm = new Uint8Array(512);
	permMod12 = new Uint8Array(512);

	G2 = (3.0 - Math.sqrt(3.0)) / 6.0;

	Grad = [
		[1, 1],
		[-1, 1],
		[1, -1],
		[-1, -1],
		[1, 0],
		[-1, 0],
		[1, 0],
		[-1, 0],
		[0, 1],
		[0, -1],
		[0, 1],
		[0, -1],
	];

	constructor(random = Math.random) {
		this.randomize(random);
	}

	randomize(random = Math.random): void {
		for (let i = 0; i < 256; i++) this.p[i] = i;

		let n: number;
		let q: number;
		for (let i = 255; i > 0; i--) {
			n = Math.floor((i + 1) * random());

			q = this.p[i];
			this.p[i] = this.p[n];
			this.p[n] = q;
		}

		for (let i = 0; i < 512; i++) {
			this.perm[i] = this.p[i & 255];
			this.permMod12[i] = this.perm[i] % 12;
		}
	}

	get(pos: position): number {
		// Skew the input space to determine which simplex cell we're in
		const s = (pos.x + pos.y) * 0.5 * (Math.sqrt(3.0) - 1.0); // Hairy factor for 2D
		const i = Math.floor(pos.x + s);
		const j = Math.floor(pos.y + s);
		const t = (i + j) * this.G2;
		const X0 = i - t; // Unskew the cell origin back to (x,y) space
		const Y0 = j - t;
		const x0 = pos.x - X0; // The x,y distances from the cell origin
		const y0 = pos.y - Y0;

		// Determine which simplex we are in.
		const i1 = x0 > y0 ? 1 : 0;
		const j1 = x0 > y0 ? 0 : 1;

		// Offsets for corners
		const x1 = x0 - i1 + this.G2;
		const y1 = y0 - j1 + this.G2;
		const x2 = x0 - 1.0 + 2.0 * this.G2;
		const y2 = y0 - 1.0 + 2.0 * this.G2;

		// Work out the hashed gradient indices of the three simplex corners
		const ii = i & 255;
		const jj = j & 255;
		const g0 = this.Grad[this.permMod12[ii + this.perm[jj]]];
		const g1 = this.Grad[this.permMod12[ii + i1 + this.perm[jj + j1]]];
		const g2 = this.Grad[this.permMod12[ii + 1 + this.perm[jj + 1]]];

		// Calculate the contribution from the three corners
		const t0 = 0.5 - x0 * x0 - y0 * y0;
		const n0 = t0 < 0 ? 0.0 : Math.pow(t0, 4) * (g0[0] * x0 + g0[1] * y0);

		const t1 = 0.5 - x1 * x1 - y1 * y1;
		const n1 = t1 < 0 ? 0.0 : Math.pow(t1, 4) * (g1[0] * x1 + g1[1] * y1);

		const t2 = 0.5 - x2 * x2 - y2 * y2;
		const n2 = t2 < 0 ? 0.0 : Math.pow(t2, 4) * (g2[0] * x2 + g2[1] * y2);

		// Add contributions from each corner to get the final noise value.
		// The result is scaled to return values in the interval [-1, 1]
		return 70.14805770653952 * (n0 + n1 + n2);
	}
}