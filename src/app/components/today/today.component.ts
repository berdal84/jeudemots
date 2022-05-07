import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Joke } from '../../models/joke.model';
import { JokeService } from '../../services/joke.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit, OnDestroy {

  private static TimePerJokeIncrementInSeconds  = 1;
  private static TimePerJokeTextCharInSeconds   = 0.15;

  currentJoke: Joke;
  isDiaporamaPlaying = false;

  private timePerJokeInSeconds = 5;
  private currentJokeId = 0;
  private jokes: Joke[] = [];
  private diaporamaTimer: number;
  private timeElapsedOnCurrentJokeInSeconds = 0;
  private subscription: Subscription;

  constructor(private jokeService: JokeService) {
    /* Set a default joke in case service hasn't loaded data before page is displayed */
    this.currentJoke = {
      category: '...',
      text: '...',
      author: '...',
      date: '...'
    };
  }

  ngOnInit() {
    this.subscription = this.jokeService.currentPageSubject.subscribe(
      (page) => {
        if( page.jokes.length )
        {
        this.jokes = page.jokes;
        this.setCurrentJokeWithId(0);
      }
      }
    );

    this.jokeService.refresh();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private setCurrentJokeWithId(id: number): void {
    this.currentJokeId  = id;
    this.currentJoke    = this.jokes[this.currentJokeId];
    this.resetDiaporamaTime();
  }

  hasNext(): boolean {
    return this.currentJokeId < this.jokes.length - 1;
  }

  hasPrevious(): boolean {
    return this.currentJokeId > 0;
  }

  getDiaporamaTimerText(): string {
    const timeLeftInSeconds = this.timePerJokeInSeconds - this.timeElapsedOnCurrentJokeInSeconds;
    const str: string = 'Prochain jeu de mots dans ' + timeLeftInSeconds.toFixed(0) + ' sec.';
    return str;
  }

  private resetDiaporamaTime(): void {
    const jokeLength = this.currentJoke.text.length + this.currentJoke.category.length;
    this.timePerJokeInSeconds = jokeLength * TodayComponent.TimePerJokeTextCharInSeconds;
    this.timeElapsedOnCurrentJokeInSeconds = 0;
  }

  onPlayButtonClicked(): void {

    this.resetDiaporamaTime();

    // set an interval every seconds
    this.diaporamaTimer = window.setInterval( () => {

      // we increment elapsed time at each interval
      this.timeElapsedOnCurrentJokeInSeconds += TodayComponent.TimePerJokeIncrementInSeconds;

      const isTimeElapsed = this.timeElapsedOnCurrentJokeInSeconds >= this.timePerJokeInSeconds;
      if ( isTimeElapsed ) {

        this.onNextButtonClicked();

        // We pause the diaporama if there is no next
        if (!this.hasNext()) {
          this.onPauseButtonClicked();
        }

      }

    },
    TodayComponent.TimePerJokeIncrementInSeconds * 1000 // 1 sec. DO NOT touch !
    );

    this.isDiaporamaPlaying = true;
  }

  onPauseButtonClicked(): void {
    clearInterval(this.diaporamaTimer);
    this.isDiaporamaPlaying = false;
  }

  onPreviousButtonClicked(): void {
    if (this.hasPrevious()) {
      this.setCurrentJokeWithId(this.currentJokeId - 1); // TODO: use the joke service to decrement
    }
  }

  onNextButtonClicked(): void {
    if (this.hasNext()) {
      this.setCurrentJokeWithId(this.currentJokeId + 1); // TODO: use the joke service to increment
    }
  }

}
