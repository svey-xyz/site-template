import { Utils } from './utils'
export class domHandler {
	private _container: HTMLCanvasElement;
	private sectionSize: { width: number, height: number } = { width: 0, height: 0 };
	private loopActive: boolean = false;
	private timer: any;
	private touch: boolean = false;
	private ongoingTouches: Array<Touch> = [];
	private inputHandler: (e: Event) => void;
	private resizeHandler: (e: Event) => void;

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

		this.setSize();
	}

	// Start the clock
	protected startClock() {
		this.startTime = performance.now(); // Use performance.now() for high-precision time
	}

	// Get the elapsed time in seconds
	public getElapsedTime(): number {
		this.elapsedTime = (performance.now() - this.startTime) / 1000; // Convert to seconds
		return this.elapsedTime;
	}

	protected init(): void { }

	protected handleInput(e: Event): void { };
	protected click(e: Event): void { };
	protected holdTouch(e: Event): void { };
	protected touchMove(e: Event): void { };
	protected touchStart(e: Event): void {
		this.timer = setInterval(() => {
			this.holdTouch(e)
		}, 100);
		this.touch = true;
	}

	protected touchEnd(e: Event) {
		if (this.timer) clearInterval(this.timer);
		this.touch = false;
	}

	protected resize(e?: Event): void { };

	protected setSize(): void {
		this.sectionSize.height = this.container.offsetHeight;
		this.sectionSize.width = document.documentElement.clientWidth || document.body.clientWidth;
	}

	protected startLoop = (refreshRate: number = 0) => {
		this.loopActive = true;
		this.mainLoop(refreshRate);
	}

	protected mainLoop = (refreshRate: number = 0) => {
		if (this.loopActive) {
			Utils.scriptUtils.requestTimeout(() => this.mainLoop(refreshRate), refreshRate);
			this.loop();
		}
	}

	protected loop(): void {
	}

	public get container(): HTMLCanvasElement {
		return this._container;
	}
}
