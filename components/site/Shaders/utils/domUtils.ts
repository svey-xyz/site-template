import { Utils } from "../utils";

export class domUtils {
	constructor() {
	}

	relativeLocation(obj: HTMLElement, ev: MouseEvent): { x: number, y: number } {
		return getEventLocation(obj, ev);

		/**
		 * Return the location of the element (x,y) being relative to the document.
		 * 
		 * @param {Element} obj Element to be located
		 */
		function getElementPosition(obj: any) {
			var curleft = 0, curtop = 0;
			if (obj.offsetParent) {
				do {
					curleft += obj.offsetLeft;
					curtop += obj.offsetTop;
				} while (obj = obj.offsetParent);
				return { x: curleft, y: curtop };
			}
			return undefined;
		}

		/** 
		 * return the location of the click (or another mouse event) relative to the given element (to increase accuracy).
		 * @param {DOM Object} element A dom element (button,canvas,input etc)
		 * @param {DOM Event} event An event generate by an event listener.
		 */
		function getEventLocation(element: HTMLElement, event: MouseEvent): { x: number, y: number } {
			// Relies on the getElementPosition function.
			var pos = getElementPosition(element)!;

			return {
				x: (event.pageX - pos.x),
				y: (event.pageY - pos.y)
			};
		}
	}

	copyObj(obj: {}): {} {
		let copy: any = {}
		Object.entries(obj).forEach(([key, value]) => {
			copy[key] = value
		})
		return copy;
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

	getVH(): number {
		// return Number(document.documentElement.style.getPropertyValue('--vh'));
		return 100;
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


	/**
	 * Function to update URL params; from Matthew Wilcoxson on StackOverflow
	 *
	 * @memberof domUtils
	 */
	updateURLParameter(url: string, param: string, paramVal: string) {
		var TheAnchor: string | null = null;
		var newAdditionalURL = "";
		var tempArray = url.split("?");
		var baseURL = tempArray[0];
		var additionalURL = tempArray[1];
		var temp = "";

		if (additionalURL) {
			var tmpAnchor = additionalURL.split("#");
			var TheParams = tmpAnchor[0];
			TheAnchor = tmpAnchor[1];
			if (TheAnchor)
				additionalURL = TheParams;

			tempArray = additionalURL.split("&");

			for (var i = 0; i < tempArray.length; i++) {
				if (tempArray[i].split('=')[0] != param) {
					newAdditionalURL += temp + tempArray[i];
					temp = "&";
				}
			}
		}
		else {
			var tmpAnchor = baseURL.split("#");
			var TheParams = tmpAnchor[0];
			TheAnchor = tmpAnchor[1];

			if (TheParams)
				baseURL = TheParams;
		}

		if (TheAnchor)
			paramVal += "#" + TheAnchor;

		var rows_txt = temp + "" + param + "=" + paramVal;
		return baseURL + "?" + newAdditionalURL + rows_txt;
	}
}