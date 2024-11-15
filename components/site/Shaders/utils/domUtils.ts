import { Utils } from "../utils";

export class domUtils {
	constructor() {
	}

	/**
	 * Returns id for touch from a list.
	 * Returns -1 if not found.
	 *
	 * @param {number} idToFind
	 * @param {Array<Touch>} ongoingTouches
	 * @return {*}  {number}
	 * @memberof domUtils
	 */
	ongoingTouchIndexById(idToFind: number, ongoingTouches: Array<Touch>): number {
		for (var i = 0; i < ongoingTouches.length; i++) {
			var id = ongoingTouches[i].identifier;

			if (id == idToFind) {
				return i;
			}
		}
		return -1;    // not found
	}

	/**
	 * Debounce functions for better performance
	 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
	 * @param  {Function} fn The function to debounce
	 */
	debounce(this: any, fn: any, delay: number = 0) {

		// Setup a timer
		let timeout: number;

		// Return a function to run debounced
		return () => {

			// Setup the arguments
			let context: any = this;
			let args: any = arguments;

			// If there's a timer, cancel it
			if (timeout) {
				window.cancelAnimationFrame(timeout);
			}
			// Setup the new requestAnimationFrame()
			timeout = window.requestAnimationFrame(function () {
				Utils.scriptUtils.requestTimeout(fn, delay);
			});

		}
	};
}