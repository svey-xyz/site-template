export class scriptUtils {
	constructor() {
	}

	noop = () => { };

	requestTimeout = (fn: () => void, delay: number, registerCancel: any = this.registerCancel) => {
		const start = new Date().getTime();

		const loop = () => {
			const delta = new Date().getTime() - start;

			if (delta >= delay) {
				fn();
				registerCancel(this.noop);
				return;
			}

			const raf = requestAnimationFrame(loop);
			registerCancel(() => cancelAnimationFrame(raf));
		};

		const raf = requestAnimationFrame(loop);
		registerCancel(() => cancelAnimationFrame(raf));
	};

	cancel = this.noop;
	registerCancel = (fn: () => void) => this.cancel = fn;
}