import { Utils } from './utils'

/**
 * Base for handling all interactive sections.
 *
 * @export
 * @class Section
 */
export class domHandler {
	private _container: HTMLElement

	sectionSize: { width: number, height: number } = { width: 0, height: 0 }

	loopActive: boolean = false
	timer: any
	touch: boolean = false
	ongoingTouches: Array<Touch> = []

	inputHandler: (e: Event) => void;
	resizeHandler: (e: Event) => void;

	constructor(container: HTMLElement, args?: {}) {
		this._container = container

		// initialize listeners
		this.inputHandler = this.handleInput.bind(this);

		this.container.addEventListener('click', this.inputHandler, { passive: true });

		this.container.addEventListener('mousedown', this.inputHandler, { passive: true });
		this.container.addEventListener('mouseup', this.inputHandler, { passive: true });
		this.container.addEventListener('mouseleave', this.inputHandler, { passive: true });
		this.container.addEventListener('mouseenter', this.inputHandler, { passive: true });

		this.container.addEventListener('mousemove', this.inputHandler, { passive: true });
		this.container.addEventListener('touchstart', this.inputHandler, { passive: true });
		this.container.addEventListener('touchend', this.inputHandler, { passive: true });

		this.container.addEventListener('touchmove', this.inputHandler, { passive: true });

		this.resizeHandler = this.resize.bind(this);
		window.addEventListener('resize', Utils.domUtils.debounce(this.resizeHandler), { passive: true });

		this.container.classList.add('loaded');
		this.setSize();
	}

	init(): void { }
	handleInput(e: Event): void { };
	click(e: Event): void { };
	holdTouch(e: Event): void { };
	touchMove(e: Event): void { };
	touchStart(e: Event): void {
		this.timer = setInterval(() => {
			this.holdTouch(e)
		}, 100);
		this.touch = true;
	}
	touchEnd(e: Event) {
		if (this.timer) clearInterval(this.timer)
		this.touch = false;
	}

	resize(e: Event): void {

	};

	setSize(): void {
		this.sectionSize.height = this.container.offsetHeight
		this.sectionSize.width = document.documentElement.clientWidth || document.body.clientWidth;
	}

	startLoop = (refreshRate: number = 0) => {
		// this.cancel()
		this.loopActive = true
		this.mainLoop(refreshRate);

	}

	/**
		* Called to init the main loop. Override 'loop()' for logic.
		*
		* @memberof Section
		*/
	mainLoop = (refreshRate: number = 0) => {
		if (this.loopActive) {
			Utils.scriptUtils.requestTimeout(() => this.mainLoop(refreshRate), refreshRate);
			this.loop();
		}
	}

	/**
	 * Used for loop logic.
	 *
	 * @memberof Section
	 */
	loop(): void { }

	public get container(): HTMLElement {
		return this._container
	}
}

domHandler.prototype.handleInput = function (e: Event) {
	let touches: TouchList

	switch (e.type) {
		case ('click'):
			this.click(e);
			break;
		case ('mousedown'):
			this.touchStart(e);
			break;

		case ('touchstart'):
			touches = (<TouchEvent>e).changedTouches;
			for (var i = 0; i < touches.length; i++) {
				this.ongoingTouches.push(<Touch>Utils.domUtils.copyObj(touches[i]));
			}
			this.touchStart(e)
			break;

		case ('mouseup'):
			this.touchEnd(e);
			break;
		case ('mouseleave'):
			this.touchEnd(e);
			break;

		case ('mouseenter'):
			if ((<MouseEvent>e).buttons > 0) this.touchStart(e);
			break;

		case ('touchend'):
			touches = (<TouchEvent>e).changedTouches;

			for (var i = 0; i < touches.length; i++) {
				var idx = Utils.domUtils.ongoingTouchIndexById(touches[i].identifier, this.ongoingTouches);
				if (idx >= 0) this.ongoingTouches.splice(idx, 1);
			}
			this.touchEnd(e);
			break;

		case ('mousemove'):
			this.touchMove(e);
			break;

		case ('touchmove'):
			touches = (<TouchEvent>e).changedTouches;

			for (var i = 0; i < touches.length; i++) {
				var idx = Utils.domUtils.ongoingTouchIndexById(touches[i].identifier, this.ongoingTouches);

				if (idx >= 0) this.ongoingTouches.splice(idx, 1, <Touch>Utils.domUtils.copyObj(touches[i]));  // swap in the new touch record
			}
			this.touchMove(e);
			break;

		default:
			break;
	}

};

domHandler.prototype.resize = function (e: Event) {
	this.setSize();
};