import { domUtils } from './domUtils'
import { scriptUtils } from './scriptUtils'

/**
 * Utilities Class
 *
 * @export
 * @class utils
 */
class utils {
	private domUtilsStore: domUtils | undefined
	private scriptUtilsStore: scriptUtils | undefined

	constructor() {
	}

	/**
	 * Utilities for scripts.
	 *
	 * @readonly
	 * @type {scriptUtils}
	 * @memberof utils
	 */
	public get scriptUtils(): scriptUtils {
		return this.scriptUtilsStore ? this.scriptUtilsStore : this.scriptUtilsStore = new scriptUtils()
	}

	/**
	 * Utilities for interacting with the DOM.
	 *
	 * @readonly
	 * @type {domUtils}
	 * @memberof utils
	 */
	public get domUtils(): domUtils {
		return this.domUtilsStore ? this.domUtilsStore : this.domUtilsStore = new domUtils()
	}
}

export const Utils = new utils()