import {BehaviorSubject} from "rxjs";

type EggTimerOptions = {
    onTick: () => Promise<any>;
    precision?: number;
};

export class EggTimer {

    timer: number = 0;
    initialTimer = 0;
    isTicking$ = new BehaviorSubject(false);
    precision = 100;
    onTick: () => Promise<any>;

    constructor({onTick, precision = 100}: EggTimerOptions) {
        this.onTick = onTick;
        this.precision = precision;
    }

    get isTicking(): boolean {
        return this.isTicking$.value;
    }

    get progress(): number {
        return 1 - this.timer / this.initialTimer;
    }

    reset(time: number) {
        this.timer = time;
        this.initialTimer = time;
    }


    start() {
        this.isTicking$.next(true);

        // Function to increment the egg timer and set a new page when necessary
        // It relies on setTimeout to be sure next increment cannot happen when page is loading
        const incrementEggTimer = async () => {
            if ( !this.isTicking$.value ) return;
            this.timer -= this.precision / 1000;
            if ( this.timer < 0 ) {
                this.timer = 0;
                return await this.onTick();
            }
            window.setTimeout( incrementEggTimer, this.precision);
        };

        // Bootstrap the first increment
        window.setTimeout( incrementEggTimer );
    }

    pause() {
        this.isTicking$.next(false);
    }
}
