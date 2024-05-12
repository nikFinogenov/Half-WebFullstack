class Timer {
    constructor(title, delay, stopCount) {
        this.title = title;
        this.delay = delay;
        this.stopCount = stopCount;
        this.intervalId = null;
        this.remainingCycles = stopCount;
    }

    start() {
        console.log(`Timer ${this.title} started (delay=${this.delay}, stopCount=${this.stopCount})`);
        this.intervalId = setInterval(() => this.tick(), this.delay);
    }

    tick() {
        console.log(`Timer ${this.title} Tick! | cycles left ${this.remainingCycles}`);
        this.remainingCycles--;
        if (this.remainingCycles === 0) {
            this.stop();
        }
    }

    stop() {
        clearInterval(this.intervalId);
        console.log(`Timer ${this.title} stopped`);
    }
}
