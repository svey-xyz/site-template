import { Utils } from './utils'
export class domHandler {
	private _container: HTMLCanvasElement;
	sectionSize: { width: number, height: number } = { width: 0, height: 0 };
	loopActive: boolean = false;
	timer: any;
	touch: boolean = false;
	ongoingTouches: Array<Touch> = [];
	inputHandler: (e: Event) => void;
	resizeHandler: (e: Event) => void;

	// Clock properties
	private startTime: number = 0; // Time when the clock starts
	private elapsedTime: number = 0; // Time elapsed since start

	constructor(container: HTMLCanvasElement, args?: {}) {
		this._container = container;

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

	// Start the clock
	startClock() {
		this.startTime = performance.now(); // Use performance.now() for high-precision time
	}

	// Get the elapsed time in seconds
	getElapsedTime(): number {
		this.elapsedTime = (performance.now() - this.startTime) / 1000; // Convert to seconds
		return this.elapsedTime;
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
		if (this.timer) clearInterval(this.timer);
		this.touch = false;
	}

	resize(e?: Event): void { };

	setSize(): void {
		this.sectionSize.height = this.container.offsetHeight;
		this.sectionSize.width = document.documentElement.clientWidth || document.body.clientWidth;
	}

	startLoop = (refreshRate: number = 0) => {
		this.loopActive = true;
		this.mainLoop(refreshRate);
	}

	mainLoop = (refreshRate: number = 0) => {
		if (this.loopActive) {
			Utils.scriptUtils.requestTimeout(() => this.mainLoop(refreshRate), refreshRate);
			this.loop();
		}
	}

	loop(): void {
	}

	public get container(): HTMLCanvasElement {
		return this._container;
	}
}
