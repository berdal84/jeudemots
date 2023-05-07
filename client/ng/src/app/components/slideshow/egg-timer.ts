import {BehaviorSubject, Subject} from "rxjs";

type EggTimerOptions = {
    precision?: number;
};

export class EggTimer {
    /** in seconds */
    private timer: number = 0;
    /** in seconds */
    private initialTimer = 0;
    /** in milliseconds */
    private readonly precision;
    /** Triggered when paused or started */
    isPlaying$ = new BehaviorSubject(false);
    /** triggered when the egg time expired */
    timeout$ = new Subject<void>();

    constructor({precision = 100}: EggTimerOptions = {}) {
        this.precision = precision;
    }

    /**
     * Return a number between 0 (just started) and 1 (timeout)
     */
    get progress(): number {
        return  1 - this.timer / this.initialTimer;
    }

    /**
     * Reset the timer (without pausing/playing)
     * @param time the new time in second
     */
    reset(time: number) {
        this.timer = time;
        this.initialTimer = time;
    }

    /**
     * Starts the timer
     * @param time the new time in second
     */
    start(time?: number) {
        if ( time ) this.reset(time);

        this.isPlaying$.next(true);

        // Function to increment the egg timer and set a new page when necessary
        // It relies on setTimeout to be sure next increment cannot happen when page is loading
        const incrementEggTimer = async () => {
            if ( !this.isPlaying$.value ) return;
            this.timer -= this.precision / 1000;
            if ( this.timer < 0 ) {
                this.timer = 0; // set to 0 to ensure the progress computation won't be negative
                this.isPlaying$.next(false);
                this.timeout$.next();
            } else {
                window.setTimeout( incrementEggTimer, this.precision);
            }
        };

        // Bootstrap the first increment
        window.setTimeout( incrementEggTimer );
    }

    pause() {
        this.isPlaying$.next(false);
    }
}
