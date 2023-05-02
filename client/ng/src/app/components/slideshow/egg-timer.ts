import {BehaviorSubject, Subject} from "rxjs";

type EggTimerOptions = {
    precision?: number;
};

export class EggTimer {

    timer: number = 0;
    initialTimer = 0;
    isPlaying$ = new BehaviorSubject(false);
    precision = 100;
    complete$ = new Subject<void>();

    constructor({precision = 100}: EggTimerOptions = {}) {
        this.precision = precision;
    }

    get progress(): number {
        return 1 - this.timer / this.initialTimer;
    }

    reset(time: number) {
        this.timer = time;
        this.initialTimer = time;
    }

    start(time?: number) {
        if ( time ) this.reset(time);

        this.isPlaying$.next(true);

        // Function to increment the egg timer and set a new page when necessary
        // It relies on setTimeout to be sure next increment cannot happen when page is loading
        const incrementEggTimer = async () => {
            if ( !this.isPlaying$.value ) return;
            this.timer -= this.precision / 1000;
            if ( this.timer < 0 ) {
                this.timer = 0;
                this.isPlaying$.next(false);
                this.complete$.next();
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
